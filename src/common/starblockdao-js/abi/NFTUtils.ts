import { PartialReadonlyContractAbi } from "../types";
export const NFTUtils: PartialReadonlyContractAbi = [
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
            name: "wnftContract",
            type: "address"
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
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endBlock",
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
            internalType: "uint256",
            name: "depositFee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "rewardDevRatio",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "rewardVeToken",
            type: "bool"
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
          }
        ],
        internalType: "struct INFTMasterChef.PoolInfo",
        name: "poolInfo",
        type: "tuple"
      },
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
  },
  {
    inputs: [
      {
        internalType: "contract IWrappedNFT",
        name: "_wnftContract",
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
    name: "ownedWNFTTokens",
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
