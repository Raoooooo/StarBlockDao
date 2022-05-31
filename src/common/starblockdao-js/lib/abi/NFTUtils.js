"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTUtils = void 0;
exports.NFTUtils = [
    {
        inputs: [
            {
                internalType: "contract INFTMasterChef",
                name: "_nftMasterchef",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_maxTokenId",
                type: "uint256"
            }
        ],
        name: "getNFTMasterChefInfos",
        outputs: [
            {
                components: [
                    {
                        internalType: "contract IWrappedNFT",
                        name: "wnft",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "startBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardIndex",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "currentRewardEndBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "lastRewardBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "accTokenPerShare",
                        type: "uint256"
                    },
                    {
                        internalType: "contract IERC20",
                        name: "dividendToken",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "accDividendPerShare",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "depositFee",
                        type: "uint256"
                    }
                ],
                internalType: "struct INFTMasterChef.PoolInfo",
                name: "poolInfo",
                type: "tuple"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "rewardBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "rewardForEachBlock",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "rewardPerNFTForEachBlock",
                        type: "uint256"
                    }
                ],
                internalType: "struct INFTMasterChef.RewardInfo",
                name: "rewardInfo",
                type: "tuple"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "mining",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "dividend",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "nftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "wnftQuantity",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "isNFTApproved",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "isWNFTApproved",
                        type: "bool"
                    }
                ],
                internalType: "struct UserInfo",
                name: "userInfo",
                type: "tuple"
            },
            {
                internalType: "uint256",
                name: "currentRewardIndex",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endBlock",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "nft",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Metadata",
                name: "_nft",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_maxTokenId",
                type: "uint256"
            }
        ],
        name: "ownedNFTTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "totalTokens",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC721Enumerable",
                name: "_nftContract",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "ownedTokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "totalTokens",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
// main
// export const NFTUtils: PartialReadonlyContractAbi = [
//   {
//     inputs: [
//       {
//         internalType: "contract IERC721Enumerable",
//         name: "_nftEnumerable",
//         type: "address"
//       },
//       {
//         internalType: "address",
//         name: "_owner",
//         type: "address"
//       }
//     ],
//     name: "ownedNFTEnumerableTokenIds",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "_totalTokenIds",
//         type: "uint256[]"
//       }
//     ],
//     stateMutability: "view",
//     type: "function"
//   },
//   {
//     inputs: [
//       {
//         internalType: "contract IERC721",
//         name: "_nft",
//         type: "address"
//       },
//       {
//         internalType: "address",
//         name: "_owner",
//         type: "address"
//       },
//       {
//         internalType: "uint256",
//         name: "_maxTokenId",
//         type: "uint256"
//       }
//     ],
//     name: "ownedNFTNotEnumerableTokenIds",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "_totalTokenIds",
//         type: "uint256[]"
//       }
//     ],
//     stateMutability: "view",
//     type: "function"
//   },
//   {
//     inputs: [
//       {
//         internalType: "contract IERC721",
//         name: "_nft",
//         type: "address"
//       },
//       {
//         internalType: "address",
//         name: "_owner",
//         type: "address"
//       },
//       {
//         internalType: "uint256",
//         name: "_maxTokenId",
//         type: "uint256"
//       }
//     ],
//     name: "ownedNFTTokenIds",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "_totalTokenIds",
//         type: "uint256[]"
//       }
//     ],
//     stateMutability: "view",
//     type: "function"
//   }
// ];
