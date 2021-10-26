import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import { useTotalSupply, useContractMethod, useContractCost } from "../hooks"
import MaticIcon from "../assets/nfts/matic-coin.svg"
import AccountInfo from "./AccountInfo"
const Mint = () => {
  const [value, setValue] = useState(1)
  const [alert, setAlert] = useState(false)
  const { chainId } = useEthers()
  const { state, send } = useContractMethod("mint")
  const { supply } = useTotalSupply()
  const { cost } = useContractCost()
  const [totalTokensMintedSoFar, setTotalTokensMintedSoFar] = useState()

  useEffect(() => {
    if (supply) {
      setTotalTokensMintedSoFar(supply)
    }
  }, [supply, state])

  const handleAlert = () => {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 5000)
    return clearTimeout()
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className=' flex flex-col  items-center mx-auto h-full justify-center border border-primary-yellow px-5 py-8 rounded-md shadow-2xl bg-card-gray max-w-[500px]'>
      <h1 className='text-2xl mb-5'>Mint one for yourself</h1>
      <AccountInfo />

      {/* {chainId === ChainId.Polygon ? ( */}
      <div className='h-full  w-70 text-black'>
        <h1 className='text-primary-yellow text-xl my-12'>
          NFT's minted: {totalTokensMintedSoFar} / 1000
        </h1>
        <div className='flex flex-col my-2'>
          <label htmlFor='amount' className='text-white text-center text-lg mb-2'>
            How many would you like to mint?
          </label>
          <div className='flex'>
            <select
              onChange={(e) => {
                setValue(e.target.value)
              }}
              name='amount'
              id='amount'
              className='h-full flex-grow border-primary-yellow rounded-md text-center font-semibold text-md'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
            <span className='text-white px-5 text-xl flex items-center'>
              {cost} <img src={MaticIcon.src} className='h-4 w-4 ml-1 mr-4' alt='' /> EACH
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            //   if (formatEther(etherBalance) > nftPrice * value) {
            send(value)

            //   } else {
            //     handleAlert()
            //   }
          }}
          disabled={state.status === "Mining" ? true : false}
          type='submit'
          className='h-full w-full py-2 bg-gray-800 hover:bg-gray-900 transform duration-100 flex-grow text-primary-yellow font-semibold text-xl border border-primary-yellow rounded-md px-5'
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
      {/* ) : (
        <h1 className='text-xl mt-12'>Please change network to Polygon to continue</h1>
      )} */}
      {alert && (
        <h1 className='w-[300px] text-negative-red text-sm whitespace-normal mt-5 text-center rounded-lg p-3 border-2 border-negative-red'>
          Please make sure you have enough MATIC in your balance
        </h1>
      )}
      <div className='text-center'>
        <p>Thank you for minting! Your transaction hash is: </p>
        {state.status !== "None" && state.transaction.hash}
      </div>
    </form>
  )
}

export default Mint
