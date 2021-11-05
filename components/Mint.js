import { ChainId, useEthers, useGasPrice } from "@usedapp/core"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import { useTotalSupply, useContractMethod, useContractCost } from "../hooks"

import MaticIcon from "../assets/nfts/matic-coin.svg"
import AccountInfo from "./AccountInfo"
import TransactionAlert from "./TransactionAlert"
const Mint = () => {
  const [value, setValue] = useState(1)
  const { chainId } = useEthers()
  const gas = useGasPrice()
  const { supply } = useTotalSupply()
  const { rawCost, formattedCost } = useContractCost()
  const { state, send } = useContractMethod("mint", {})
  useEffect(() => {
    gas && console.log(gas + 10 ** 8)
  }, [gas])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className='h-full flex flex-col text-center items-center  min-h-full justify-center px-5 py-8 rounded-md shadow-2xl bg-card-gray min-w-[550px]'>
      <h1 className='text-4xl mb-8'>Mint NFT</h1>
      <AccountInfo />
      {/* TODO: Change to Polygon */}
      {chainId !== ChainId.Rinkeby ? (
        <h1 className='text-xl mt-12'>Please change network to Polygon to continue</h1>
      ) : (
        <div className='h-full w-70 text-black'>
          <h1 className='text-primary-yellow text-xl my-12'>
            NFT's minted: {supply || "N/A"} / 1000
          </h1>
          <div className='flex flex-col my-2'>
            <label htmlFor='amount' className='text-white text-center text-lg mb-2'>
              How many would you like to mint? (max 5)
            </label>
            <div className='flex justify-center'>
              <select
                onChange={(e) => {
                  setValue(e.target.value)
                }}
                name='amount'
                id='amount'
                className='h-full flex-grow border-primary-yellow rounded-md py-2  text-center font-semibold text-md'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <span className='text-white px-5 text-xl flex items-center justify-center'>
                {formattedCost * value}
                <img
                  src={MaticIcon.src}
                  className='h-5 w-5  ml-2  mr-4'
                  alt='Polygon logo'
                />
                <small className='flex justify-center text-sm'>(excl. gas fees)</small>
              </span>
            </div>
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault()
              const total = rawCost * value
              try {
                send(value, {
                  value: total.toString(),
                })
              } catch (err) {
                console.error("there was an error" + err)
              }
            }}
            disabled={state.status === "Mining"}
            type='submit'
            className='mt-2 w-full py-2 bg-gray-800 hover:bg-gray-900 transform duration-100 flex-grow text-primary-yellow font-semibold text-xl border border-primary-yellow rounded-md px-5'
            placeholder='Image'>
            {state.status === "Mining" ? (
              <div className='flex justify-center '>
                <ReactLoading type='cubes' color='#FFDF40' height='100%' width='1.8rem' />
              </div>
            ) : (
              "MINT"
            )}
          </button>
        </div>
      )}
      {state.transaction?.hash && <TransactionAlert state={state} />}
    </form>
  )
}

export default Mint
