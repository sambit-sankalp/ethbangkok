// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;
//Inspired by Uniswap + accross' ERC7683 Draft standard
contract ERC7683  {
   /// @title GaslessCrossChainOrder CrossChainOrder type
/// @notice Standard order struct to be signed by users, disseminated to fillers, and submitted to origin settler contracts
struct GaslessCrossChainOrder {
	/// @dev The contract address that the order is meant to be settled by.
	/// Fillers send this order to this contract address on the origin chain
	address originSettler;
	/// @dev The address of the user who is initiating the swap,
	/// whose input tokens will be taken and escrowed

	address user;
	/// @dev Nonce to be used as replay protection for the order
	uint256 nonce;
	/// @dev The chainId of the origin chain
	uint256 originChainId;
	/// @dev The timestamp by which the order must be opened
	uint32 openDeadline;
	/// @dev The timestamp by which the order must be filled on the destination chain
	uint32 fillDeadline;
	/// @dev Type identifier for the order data. This is an EIP-712 typehash.
	uint256 orderDataType;
	/// @dev Arbitrary implementation-specific data
	/// Can be used to define tokens, amounts, destination chains, fees, settlement parameters,
	/// or any other order-type specific information
    //CUSTOM TWEAKS FOR HACKATHON
   
    address destinationChain;
    // @dev Source ERC-20 token using for swap
    address SourceToken;
    //@dev destination ERC-20 token using for swap
    address DestinationToken;
    //@dev origin token Amount to be bridged/swapped
    uint256 tokenAmount;
    //@dev Destination token Amount to be recieved based on pre-calc
    uint256 destinationTokenAmount;
    //@dev Destination chainId
    uint32 destinationChainId;
    //@dev logic for verification solution
    bool isVerifyMessage;



}

/// @title OnchainCrossChainOrder CrossChainOrder type
/// @notice Standard order struct for user-opened orders, where the user is the msg.sender.
struct OnchainCrossChainOrder {
	/// @dev The timestamp by which the order must be filled on the destination chain
	uint32 fillDeadline;
	/// @dev Type identifier for the order data. This is an EIP-712 typehash.
	bytes32 orderDataType;
	/// @dev Arbitrary implementation-specific data
	/// Can be used to define tokens, amounts, destination chains, fees, settlement parameters,
	/// or any other order-type specific information
	bytes orderData;
}
    /// @notice Tokens that must be receive for a valid order fulfillment
    struct Output {
        /// @dev The address of the ERC20 token on the destination chain
        /// @dev address(0) used as a sentinel for the native token
        address token;
        /// @dev The amount of the token to be sent
        uint256 amount;
        /// @dev The address to receive the output tokens
        bytes32 recipient;
        /// @dev The destination chain for this output
        uint256 chainId;
    }

    /// @title FillInstruction type
    /// @notice Instructions to parameterize each leg of the fill
    /// @dev Provides all the origin-generated information required to produce a valid fill leg
    struct FillInstruction {
        /// @dev The contract address that the order is meant to be settled by
        uint64 destinationChainId;
        /// @dev The contract address that the order is meant to be filled on
        bytes32 destinationSettler;
        /// @dev The data generated on the origin chain needed by the destinationSettler to process the fill
        bytes originData;
    }

    /// @notice Initiates the settlement of a cross-chain order
	/// @dev To be called by the filler
	/// @param order The CrossChainOrder definition
	/// @param fillerData Any filler-defined data required by the settler
	function initiate(GaslessCrossChainOrder memory order, bytes memory fillerData) external  pure virtual{}
    

    /// @notice Fills a single leg of a particular order on the destination chain
	/// @param orderId Unique order identifier for this order
	/// @param originData Data emitted on the origin to parameterize the fill
	/// @param fillerData Data provided by the filler to inform the fill or express their preferences
	function fill(bytes32 orderId, bytes calldata originData, bytes calldata fillerData)external pure virtual  {}

}
