export const certifyMeContractAbi = [
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getAchievement",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_txHash", type: "bytes32" }],
    name: "getAchievementByTxHash",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_achievementType", type: "string" },
      { internalType: "string", name: "_url", type: "string" },
    ],
    name: "setAchievement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
