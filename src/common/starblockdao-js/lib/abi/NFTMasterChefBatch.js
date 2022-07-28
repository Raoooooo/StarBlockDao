"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMasterChefBatch = void 0;
exports.NFTMasterChefBatch = [
    {
        "inputs": [
            {
                "internalType": "contract ICollectionUtils",
                "name": "_collectionUtils",
                "type": "address"
            },
            {
                "internalType": "contract INFTPool",
                "name": "_nftPool",
                "type": "address"
            },
            {
                "internalType": "contract ITokenPriceUtils",
                "name": "_tokenPriceUtils",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_weth",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_dividends",
                "type": "uint256[]"
            }
        ],
        "name": "addPoolDividends",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "collectionUtils",
        "outputs": [
            {
                "internalType": "contract ICollectionUtils",
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
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_canDeposite",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "_deposited",
                "type": "bool"
            }
        ],
        "name": "getAllPoolInfos",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "name": "getPoolDepositedNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "deposited",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mining",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dividend",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "withdrawedInWNFT",
                        "type": "bool"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.NFTDepositInfo[]",
                "name": "_nftInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo",
                "name": "_wrappedPoolInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721Metadata",
                "name": "_poolNFTorWNFT",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfoByNFT",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo",
                "name": "_wrappedPoolInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721Metadata[]",
                "name": "_poolNFTorWNFTs",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfosByNFTorWNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfosByPids",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfosUserCanDeposit",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getPoolInfosUserDeposited",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "name": "getPoolRewards",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "rewardBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardForEachBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardPerNFTForEachBlock",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct INFTMasterChef.RewardInfo[]",
                "name": "_rewards",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withPoolInfo",
                "type": "bool"
            }
        ],
        "name": "getPoolSta",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalPoolAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalNFTAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalRewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalRewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.PoolSta",
                "name": "_poolSta",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "ethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mining",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dividend",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wnftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isWNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedNFTTokenIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedWNFTTokenIds",
                        "type": "uint256[]"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.UserInfo",
                "name": "_userInfo",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "pid",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "contract IWrappedNFT",
                                "name": "wnft",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardIndex",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentRewardEndBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lastRewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accTokenPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IERC20",
                                "name": "dividendToken",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "accDividendPerShare",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "depositFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.PoolInfo",
                        "name": "poolInfo",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo",
                        "name": "currentReward",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "ethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wethBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenBalance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "mining",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "dividend",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "wnftQuantity",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "isWNFTApproved",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedNFTTokenIds",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "ownedWNFTTokenIds",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct NFTMasterChefBatch.UserInfo",
                        "name": "userInfo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRewardEndBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IERC721Metadata",
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "rewardBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardForEachBlock",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "rewardPerNFTForEachBlock",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct INFTMasterChef.RewardInfo[]",
                        "name": "rewards",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardedDividend",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.WrappedPoolInfo[]",
                "name": "_wrappedPoolInfos",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            }
        ],
        "name": "getPoolsDepositedNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "deposited",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mining",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dividend",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "withdrawedInWNFT",
                        "type": "bool"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.NFTDepositInfo[][]",
                "name": "_nftInfos",
                "type": "tuple[][]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            }
        ],
        "name": "getPoolsRewards",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "rewardBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardForEachBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardPerNFTForEachBlock",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct INFTMasterChef.RewardInfo[][]",
                "name": "_rewards",
                "type": "tuple[][]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTokenPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_withOwnedTokenIds",
                "type": "bool"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "ethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mining",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dividend",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wnftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isWNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedNFTTokenIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedWNFTTokenIds",
                        "type": "uint256[]"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.UserInfo",
                "name": "_userInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_forUser",
                "type": "address"
            }
        ],
        "name": "harvestAll",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_forUser",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[][]",
                "name": "_poolWNFTTokenIds",
                "type": "uint256[][]"
            }
        ],
        "name": "harvestAllByWNFTTokenIds",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nftMasterChef",
        "outputs": [
            {
                "internalType": "contract INFTMasterChef",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nftPool",
        "outputs": [
            {
                "internalType": "contract INFTPool",
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
                "internalType": "contract IERC721Metadata",
                "name": "_poolNFTorWNFT",
                "type": "address"
            }
        ],
        "name": "nftPoolExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "_poolExists",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721Metadata",
                "name": "_poolNFTorWNFT",
                "type": "address"
            }
        ],
        "name": "nftPoolId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721",
                "name": "_nft",
                "type": "address"
            }
        ],
        "name": "nftShouldSetMaxTokenId",
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
                "internalType": "contract IERC721",
                "name": "_nft",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "ownedNFTTokenIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "_ownedTokenIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "ownedNFTsTokenIdsByPids",
        "outputs": [
            {
                "internalType": "uint256[][]",
                "name": "_ownedTokenIds",
                "type": "uint256[][]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "ownedWNFTsTokenIdsByPids",
        "outputs": [
            {
                "internalType": "uint256[][]",
                "name": "_ownedTokenIds",
                "type": "uint256[][]"
            }
        ],
        "stateMutability": "view",
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
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_wnftTokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "pending",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_forUser",
                "type": "address"
            }
        ],
        "name": "pendingAll",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "ethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wethBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mining",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dividend",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wnftQuantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isWNFTApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedNFTTokenIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ownedWNFTTokenIds",
                        "type": "uint256[]"
                    }
                ],
                "internalType": "struct NFTMasterChefBatch.UserInfo",
                "name": "_userInfo",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "_blockNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_blockTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721Metadata",
                "name": "_poolNFTorWNFT",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_poolWNFTTokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "pendingByNFTorWNFT",
        "outputs": [
            {
                "internalType": "bool",
                "name": "_poolExists",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "name": "poolPending",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_wnftTokenIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            }
        ],
        "name": "poolRewarded",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_mining",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_dividend",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolsShouldSetMaxTokenId",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "_pids",
                "type": "uint256[]"
            },
            {
                "internalType": "contract IERC721[]",
                "name": "_nfts",
                "type": "address[]"
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
                "internalType": "contract ICollectionUtils",
                "name": "_collectionUtils",
                "type": "address"
            }
        ],
        "name": "setCollectionUtils",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ITokenPriceUtils",
                "name": "_tokenPriceUtils",
                "type": "address"
            }
        ],
        "name": "setTokenPriceUtils",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenPriceUtils",
        "outputs": [
            {
                "internalType": "contract ITokenPriceUtils",
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
        "inputs": [],
        "name": "weth",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
