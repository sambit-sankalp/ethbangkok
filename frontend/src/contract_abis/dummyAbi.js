export const Settlement = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_endpoint",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "Option",
				"type": "bytes"
			},
			{
				"internalType": "uint32",
				"name": "solverDaoEid",
				"type": "uint32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidDelegate",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidEndpointCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LzTokenUnavailable",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			}
		],
		"name": "NoPeer",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "msgValue",
				"type": "uint256"
			}
		],
		"name": "NotEnoughNative",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "OnlyEndpoint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "sender",
				"type": "bytes32"
			}
		],
		"name": "OnlyPeer",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "peer",
				"type": "bytes32"
			}
		],
		"name": "PeerSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "SolverDAOdsteID",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "origin",
				"type": "tuple"
			}
		],
		"name": "allowInitializePath",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "data",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultOption",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endpoint",
		"outputs": [
			{
				"internalType": "contract ILayerZeroEndpointV2",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "orderId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "originData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "fillerData",
				"type": "bytes"
			}
		],
		"name": "fill",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "originSettler",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "originChainId",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "openDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "fillDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "orderDataType",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "destinationChain",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "SourceToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "DestinationToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "destinationTokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "destinationChainId",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "isVerifyMessage",
						"type": "bool"
					}
				],
				"internalType": "struct ERC7683.GaslessCrossChainOrder",
				"name": "order",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "fillerData",
				"type": "bytes"
			}
		],
		"name": "fill",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "getOrderStatus",
		"outputs": [
			{
				"internalType": "enum Settlement.OrderStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "originSettler",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "originChainId",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "openDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "fillDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "orderDataType",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "destinationChain",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "SourceToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "DestinationToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "destinationTokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "destinationChainId",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "isVerifyMessage",
						"type": "bool"
					}
				],
				"internalType": "struct ERC7683.GaslessCrossChainOrder",
				"name": "order",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "fillerData",
				"type": "bytes"
			}
		],
		"name": "initiated",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "originSettler",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "originChainId",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "openDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "fillDeadline",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "orderDataType",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "destinationChain",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "SourceToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "DestinationToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "destinationTokenAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "destinationChainId",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "isVerifyMessage",
						"type": "bool"
					}
				],
				"internalType": "struct ERC7683.GaslessCrossChainOrder",
				"name": "order",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "fillerData",
				"type": "bytes"
			}
		],
		"name": "initiate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "isComposeMsgSender",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "srcEid",
						"type": "uint32"
					},
					{
						"internalType": "bytes32",
						"name": "sender",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "nonce",
						"type": "uint64"
					}
				],
				"internalType": "struct Origin",
				"name": "_origin",
				"type": "tuple"
			},
			{
				"internalType": "bytes32",
				"name": "_guid",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "_message",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "_executor",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "lzReceive",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "nextNonce",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "nonce",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oAppVersion",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "senderVersion",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "receiverVersion",
				"type": "uint64"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "eid",
				"type": "uint32"
			}
		],
		"name": "peers",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "peer",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_dstEid",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_payInLzToken",
				"type": "bool"
			}
		],
		"name": "quote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "nativeFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lzTokenFee",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_dstEid",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_message",
				"type": "uint256"
			}
		],
		"name": "send",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_delegate",
				"type": "address"
			}
		],
		"name": "setDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_eid",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "_peer",
				"type": "bytes32"
			}
		],
		"name": "setPeer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_eid",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_peer",
				"type": "address"
			}
		],
		"name": "setPeerWithAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]