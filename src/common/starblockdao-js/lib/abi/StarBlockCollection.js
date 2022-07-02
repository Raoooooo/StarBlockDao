"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarBlockCollectionAbi = void 0;
exports.StarBlockCollectionAbi = [
    {
        inputs: [
            {
                internalType: "address[]",
                name: "addresses",
                type: "address[]"
            }
        ],
        name: "addWhitelists",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "publicMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_name",
                type: "string"
            },
            {
                internalType: "string",
                name: "_symbol",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "_maxSupply",
                type: "uint256"
            },
            {
                internalType: "string",
                name: "_baseTokenURI",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "_amountForArtist",
                type: "uint256"
            },
            {
                internalType: "address payable",
                name: "_feeAddress",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_feeRatio",
                type: "uint256"
            },
            {
                internalType: "address payable",
                name: "_owner",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "artistMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "deleteDefaultRoyalty",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool"
            }
        ],
        name: "ApprovalForAll",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "fromTokenId",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "toTokenId",
                type: "uint256"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "ConsecutiveTransfer",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "addresses",
                type: "address[]"
            }
        ],
        name: "removeWhitelists",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes"
            }
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address"
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool"
            }
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_baseTokenURI",
                type: "string"
            }
        ],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_receiver",
                type: "address"
            },
            {
                internalType: "uint96",
                name: "_feeNumerator",
                type: "uint96"
            }
        ],
        name: "setDefaultRoyalty",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_feeAddress",
                type: "address"
            }
        ],
        name: "setFeeAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxAmountPerAddress",
                        type: "uint256"
                    }
                ],
                internalType: "struct StarBlockCollection.SaleConfig",
                name: "_whitelistSaleConfig",
                type: "tuple"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxAmountPerAddress",
                        type: "uint256"
                    }
                ],
                internalType: "struct StarBlockCollection.SaleConfig",
                name: "_publicSaleConfig",
                type: "tuple"
            }
        ],
        name: "setSaleConfig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "Transfer",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "whitelistMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "withdrawMoney",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "amountForArtist",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "artistMintedAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256"
            }
        ],
        name: "exists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "explicitOwnershipOf",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "addr",
                        type: "address"
                    },
                    {
                        internalType: "uint64",
                        name: "startTimestamp",
                        type: "uint64"
                    },
                    {
                        internalType: "bool",
                        name: "burned",
                        type: "bool"
                    },
                    {
                        internalType: "uint24",
                        name: "extraData",
                        type: "uint24"
                    }
                ],
                internalType: "struct IERC721A.TokenOwnership",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]"
            }
        ],
        name: "explicitOwnershipsOf",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "addr",
                        type: "address"
                    },
                    {
                        internalType: "uint64",
                        name: "startTimestamp",
                        type: "uint64"
                    },
                    {
                        internalType: "bool",
                        name: "burned",
                        type: "bool"
                    },
                    {
                        internalType: "uint24",
                        name: "extraData",
                        type: "uint24"
                    }
                ],
                internalType: "struct IERC721A.TokenOwnership[]",
                name: "",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "feeAddress",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "feeRatio",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "getInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "_maxSupply",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_totalSupply",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_userCanMintAmount",
                type: "uint256"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxAmountPerAddress",
                        type: "uint256"
                    }
                ],
                internalType: "struct StarBlockCollection.SaleConfig",
                name: "_whitelistSaleConfig",
                type: "tuple"
            },
            {
                internalType: "uint256",
                name: "_whitelistSaleStatus",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_whitelistAmount",
                type: "uint256"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "maxAmountPerAddress",
                        type: "uint256"
                    }
                ],
                internalType: "struct StarBlockCollection.SaleConfig",
                name: "_publicSaleConfig",
                type: "tuple"
            },
            {
                internalType: "uint256",
                name: "_publicSaleStatus",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "_inWhitelist",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "_whitelistSaleuserCanMintAmount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_publicSaleuserCanMintAmount",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "operator",
                type: "address"
            }
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "maxSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "publicSaleConfig",
        outputs: [
            {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "maxAmountPerAddress",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "publicSaleMined",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_salePrice",
                type: "uint256"
            }
        ],
        name: "royaltyInfo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "_interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "tokensOfOwner",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "start",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "stop",
                type: "uint256"
            }
        ],
        name: "tokensOfOwnerIn",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "userCanMint",
        outputs: [
            {
                internalType: "bool",
                name: "_whitelistSaleCanMint",
                type: "bool"
            },
            {
                internalType: "string",
                name: "_whitelistSaleMessage",
                type: "string"
            },
            {
                internalType: "bool",
                name: "_publicSaleCanMint",
                type: "bool"
            },
            {
                internalType: "string",
                name: "_publicSaleMessage",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "userCanMintAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "whitelist",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "whitelistAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "whitelistSaleConfig",
        outputs: [
            {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "maxAmountPerAddress",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "whitelistSaleMined",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
