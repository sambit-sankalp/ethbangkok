const ethers = require('ethers');
const postParam = {
    originSettler: ethers.utils.getAddress("0x5f8CA817E4A0964a3CB2FeCc05364eEc01dA3105"), // Address of the origin settler
    user: ethers.utils.getAddress("0x49535e0D37E232F43b1c35541978c562051473D6"), // Address of the user initiating the swap
    nonce: 126, // Replay protection for the order
    originChainId: 40161, // Chain ID of the origin chain
    openDeadline: 20222, // Timestamp by which the order must be opened
    fillDeadline: 2023, // Timestamp by which the order must be filled on the destination chain
    orderDataType: "0x0000000000000000000000000000000000000000000000000000000000000000", // EIP-712 typehash
    destinationChain: ethers.utils.getAddress("0xDC3Cf6F5086BA912522Fb526BEa80EC8742c32C0"), // Address for the destination chain
    SourceToken: ethers.utils.getAddress("0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"), // ERC-20 source token
    DestinationToken: ethers.utils.getAddress("0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"), // ERC-20 destination token
    tokenAmount: ethers.BigNumber.from("10000000000000000"), // Token amount to be bridged/swapped
    destinationTokenAmount:  ethers.BigNumber.from("4000000"), // Destination token amount pre-calculated
    destinationChainId: 40231, // Destination chain ID
    isVerifyMessage: false // Verification status
};

const fillParam = {
    originSettler: ethers.utils.getAddress("0x5f8CA817E4A0964a3CB2FeCc05364eEc01dA3105"), // Address of the origin settler
    user: ethers.utils.getAddress("0x49535e0D37E232F43b1c35541978c562051473D6"), // Address of the user initiating the swap
    nonce: 126, // Replay protection for the order
    originChainId: 40161, // Chain ID of the origin chain
    openDeadline: 20222, // Timestamp by which the order must be opened
    fillDeadline: 2023, // Timestamp by which the order must be filled on the destination chain
    orderDataType: "0x0000000000000000000000000000000000000000000000000000000000000000", // EIP-712 typehash
    destinationChain: ethers.utils.getAddress("0xDC3Cf6F5086BA912522Fb526BEa80EC8742c32C0"), // Address for the destination chain
    SourceToken: ethers.utils.getAddress("0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"), // ERC-20 source token
    DestinationToken: ethers.utils.getAddress("0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"), // ERC-20 destination token
    tokenAmount: ethers.BigNumber.from("10000000000000000"), // Token amount to be bridged/swapped
    destinationTokenAmount:  ethers.BigNumber.from("4000000"), // Destination token amount pre-calculated
    destinationChainId: 40161, // Destination chain ID
    isVerifyMessage: false // Verification status
}
module.exports = {postParam,fillParam}