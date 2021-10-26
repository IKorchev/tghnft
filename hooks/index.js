import { useContractCall, useContractFunction } from "@usedapp/core"
import { abi } from "../abi"
import { utils, BigNumber } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { formatEther } from "@ethersproject/units"
const cInterface = new utils.Interface(abi)
const contractAddress = "0x419ae022948a917bD3B0e79B790434487e308Fe6"
const contract = new Contract(contractAddress, cInterface)

//Gets the total supply of the token
export const useTotalSupply = () => {
  const supply = useContractCall({
    abi: cInterface,
    address: contractAddress,
    method: "totalSupply",
    args: [],
  })
  if (supply) {
    const newNumber = BigNumber.from(supply[0]).toNumber()
    return {
      supply: newNumber,
    }
  }
  return 0
}
// Gets the price of the transaction (excluding gas fees)
export const useContractCost = () => {
  const cost = useContractCall({
    abi: cInterface,
    address: contractAddress,
    method: "cost",
    args: [],
  })
  if (cost) {
    const formatted = formatEther(BigNumber.from(cost[0]).toNumber())
    console.log(formatted)

    return {
      cost: formatted,
    }
  }
  return 0
}

// Calls contract function
export function useContractMethod(methodName) {
  const { state, send } = useContractFunction(contract, methodName, {})
  return { state, send }
}
