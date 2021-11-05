import { shortenAddress } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import { useEtherBalance, useEthers } from "@usedapp/core"

const AccountInfo = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      {!account ? (
        <button
          onClick={activateBrowserWallet}
          className='whitespace-nowrap bg-gray-800 py-3 hover:bg-gray-900 transform duration-100 text-yellow-500 font-semibold text-xl border border-yellow-500 rounded-md px-5'
          placeholder='Image'>
          Connect metamask
        </button>
      ) : (
        <div className='flex h-10 divide-x divide-yellow-500 justify-center items-center overflow-hidden border-yellow-500 border-4 rounded-lg'>
          {etherBalance && (
            <span
              className='whitespace-nowrap flex items-center h-full bg-gray-800  transform duration-100
             text-yellow-500 font-semibold text-sm  py-1 rounded-l-md px-5'>
              {parseFloat(formatEther(etherBalance)).toFixed(3)}
            </span>
          )}
          <span
            className='whitespace-nowrap h-full flex items-center bg-gray-800 transform duration-100 
          text-yellow-500 font-semibold text-sm py-1 px-5'>
            {shortenAddress(account)}
          </span>
        </div>
      )}
    </div>
  )
}

export default AccountInfo
