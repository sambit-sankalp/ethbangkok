// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;
import {OApp, Origin, MessagingFee} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OptionsBuilder} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";
import  "./ERC7683.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SolverDAO is OApp,ERC7683 {
    constructor(
        address _endpoint,
        address _owner,
        bytes memory Option,
        uint256 minStakeAmount
    ) OApp(_endpoint, _owner) Ownable(_owner) {
        defaultOption = Option;
        minStakeAmountval = minStakeAmount;
    }

    bytes public defaultOption;
    mapping(address => Solver) public solvers;
    mapping(uint256=> bool) solutionState;
    uint256 public intentCount;
    uint256 public minStakeAmountval;

    struct Solver {
        uint256 stakedAmount;
        bool isActive;
        uint256 reputation; // Optional: track solver reputation
    }

    function stake() external payable {
        require(msg.value >= minStakeAmountval, "Insufficient staking amount");
        solvers[msg.sender].stakedAmount += msg.value;
        solvers[msg.sender].isActive = true;
    }

    function postSolution(GaslessCrossChainOrder memory order, address filler,bytes memory solution) public payable{
        if(solvers[msg.sender].isActive == false) revert("First try staking");

        verifySolution(order.nonce,solution);
        order.isVerifyMessage = true;
        bytes memory _payload = abi.encode(order,filler);
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

    //arbitary verification Logic // Opens endless possibilites for verification
    //For hackathon scope returning true
    function verifySolution(uint256 nonce, bytes memory solution) internal returns (bool) {
        solutionState[nonce] =  true;
        return true;
    }

    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address, // Executor address as specified by the OApp.
        bytes calldata // Any extra data or options to trigger on receipt.
    ) internal override {
        // Decode the payload to get the message
        // In this case, type is string, but depends on your encoding!
        
    }

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

        function setPeerWithAddress(uint32 _eid, address _peer) public onlyOwner {
        bytes32 _add = bytes32(uint256(uint160(_peer)));
        _setPeer(_eid, _add);
    }

    function getState(uint256 nonce)public view returns(bool){
        return solutionState[nonce];
    }

    function getStakedStatus(address solver) public view returns(bool){
        return solvers[solver].isActive;
    }
}
