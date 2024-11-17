// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {OApp, Origin, MessagingFee} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OptionsBuilder} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";
import {ERC7683} from "./ERC7683.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Settlement is OApp, ERC7683 {
    using SafeERC20 for IERC20;

    constructor(
        address _endpoint,
        address _owner,
        bytes memory Option,
        uint32 solverDaoEid
    ) OApp(_endpoint, _owner) Ownable(_owner) {
        defaultOption = Option;
        SolverDAOdsteID = solverDaoEid;
    }

    // Some arbitrary data you want to deliver to the destination chain!
    string public data;
    bytes public defaultOption;

    mapping(uint256 => GaslessCrossChainOrder) orders;
    mapping(uint256 => string) orderStore;
    mapping(uint256 => OrderStatus) orderStatuses;

    uint32 public SolverDAOdsteID;

    enum OrderStatus {
        INITIATED,
        PENDING,
        VERIFIED,
        FILLED,
        CANCELLED
    }

    /**
     * @notice Sends a message from the source to destination chain.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _message The message to send.
     */
    function send(uint32 _dstEid, uint256 _message) external payable {
        // Encodes the message before invoking _lzSend.
        // Replace with whatever data you want to send!
        bytes memory _payload = abi.encode(_message);
        _lzSend(
            _dstEid,
            _payload,
            defaultOption,
            // Fee in native gas and ZRO token.
            MessagingFee(msg.value, 0),
            // Refund address in case of failed source message.
            payable(msg.sender)
        );
    }

    function setPeerWithAddress(uint32 _eid, address _peer) public onlyOwner {
        bytes32 _add = bytes32(uint256(uint160(_peer)));
        _setPeer(_eid, _add);
    }

    /**
     * @dev Called when data is received from the protocol. It overrides the equivalent function in the parent contract.
     * Protocol messages are defined as packets, comprised of the following parameters.
     * @param _origin A struct containing information about where the packet came from.
     * @param _guid A global unique identifier for tracking the packet.
     * @param payload Encoded message.
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address, // Executor address as specified by the OApp.
        bytes calldata // Any extra data or options to trigger on receipt.
    ) internal override {
        // Decode the payload to get the message
        // In this case, type is string, but depends on your encoding!

        (GaslessCrossChainOrder memory order, address filler) = abi.decode(
            payload,
            (GaslessCrossChainOrder, address)
        );
        if (order.isVerifyMessage == true) {
            orderStatuses[order.nonce] = OrderStatus.VERIFIED;
        }
        //transfer Source token to the filler
        else {
            orderStatuses[order.nonce] = OrderStatus.FILLED;

            IERC20(order.SourceToken).transferFrom(
                order.originSettler,
                filler,
                order.tokenAmount
            );
        }

        // _lzSend(
        //     SolverDAOdsteID,
        //     payload,
        //     defaultOption,
        //     // Fee in native gas and ZRO token.
        //     MessagingFee(msg.value, 0),
        //     // Refund address in case of failed source message.
        //     payable(msg.sender)
        // );
    }

    function initiate(
        GaslessCrossChainOrder calldata order,
        bytes calldata signature,
        bytes calldata fillerData
    ) external {
        //verify Signature Logic

        orderStatuses[order.nonce] = OrderStatus.INITIATED;

        //ERC20 transfer and lock begins
        verifySettlement(order);
        IERC20(order.SourceToken).safeTransferFrom(
            order.user,
            address(this),
            order.tokenAmount
        );
    }

    function verifySettlement(GaslessCrossChainOrder calldata order) private {
        orderStatuses[order.nonce] = OrderStatus.PENDING;
    }

    function fill(
        GaslessCrossChainOrder calldata order,
        bytes calldata fillerData
    ) external payable {
        if (orderStatuses[order.nonce] == OrderStatus.FILLED)
            revert("AlreadyFilled");
        if(orderStatuses[order.nonce]!= OrderStatus.VERIFIED) revert("Wait till your Solution is verified");

        (address filler, uint256 fee) = abi.decode(
            fillerData,
            (address, uint256)
        );

        //transfer Destinationtoken to user/swapper
        IERC20(order.DestinationToken).transferFrom(
            filler,
            order.user,
            order.destinationTokenAmount - fee
        );

        // Encodes the message before invoking _lzSend.
        // Replace with whatever data you want to send!
        bytes memory _payload = abi.encode(order, filler);
        _lzSend(
            order.destinationChainId,
            _payload,
            defaultOption,
            // Fee in native gas and ZRO token.
            MessagingFee(msg.value, 0),
            // Refund address in case of failed source message.
            payable(msg.sender)
        );
    }

    /* @dev Quotes the gas needed to pay for the full omnichain transaction.
     * @return nativeFee Estimated gas fee in native gas.
     * @return lzTokenFee Estimated gas fee in ZRO token.
     */
    function quote(
        uint32 _dstEid, // Destination chain's endpoint ID.
        string memory _message, // The message to send.
        bool _payInLzToken // boolean for which token to return fee in
    ) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
        bytes memory _payload = abi.encode(_message);
        MessagingFee memory fee = _quote(
            _dstEid,
            _payload,
            defaultOption,
            _payInLzToken
        );
        return (fee.nativeFee, fee.lzTokenFee);
    }

    function getOrderStatus(uint256 nonce)
        public
        view
        returns (OrderStatus status)
    {
        return orderStatuses[nonce];
    }

    function withdraw(address token) public {
        IERC20(token).transfer(
            msg.sender,
            IERC20(token).balanceOf(address(this))
        );
    }
}
