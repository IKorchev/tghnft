import { ChainId, useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import { useTotalSupply, useContractMethod, useContractCost } from "../hooks"
import MaticIcon from "../assets/nfts/matic-coin.svg"
import AccountInfo from "./AccountInfo"
const Mint = () => {
  const [value, setValue] = useState(1)
  const { chainId } = useEthers()
  const { state, send } = useContractMethod("mint")
  const { supply } = useTotalSupply()
  const { cost } = useContractCost()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className=' flex flex-col text-center items-center mx-auto h-full justify-center border border-primary-yellow px-5 py-8 rounded-md shadow-2xl bg-card-gray min-w-[550px]'>
      <h1 className='text-4xl mb-8'>Mint NFT</h1>
      <AccountInfo />
      {chainId !== ChainId.Polygon ? (
        <h1 className='text-xl mt-12'>Please change network to Polygon to continue</h1>
      ) : (
        <div className='h-full w-70 text-black'>
          <h1 className='text-primary-yellow text-xl my-12'>
            NFT's minted: {supply || "N/A"} / 1000
          </h1>
          <div className='flex flex-col my-2'>
            <label htmlFor='amount' className='text-white text-center text-lg mb-2'>
              How many would you like to mint? {"(max 5)"}
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
                {cost * value}
                <img src={MaticIcon.src} className='h-5 w-5  ml-2  mr-4' alt='' />
                <small className='flex justify-center text-sm'>(gas fees excluded)</small>
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              send(value)
            }}
            disabled={state.status === "Mining"}
            type='submit'
            className='h-full mt-2 w-full py-2 bg-gray-800 hover:bg-gray-900 transform duration-100 flex-grow text-primary-yellow font-semibold text-xl border border-primary-yellow rounded-md px-5'
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

      {state.transaction?.hash && (
        <div className='text-center mt-5 bg-green-500 rounded-lg border-green-900 border p-3 '>
          <p>Thank you for minting!</p>
          <a
            href={`https://polygonscan.com/tx/${state.transaction.hash}`}
            target='_blank'
            rel='noreferrer'
            className='underline hover:opacity-80'>
            Click here
          </a>{" "}
          to see the status of your transaction.
        </div>
      )}
    </form>
  )
}

export default Mint
