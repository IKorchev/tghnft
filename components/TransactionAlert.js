const TransactionAlert = ({ state }) => {
  return (
    <>
      {state.status === "Success" ? (
        <div className='text-center text-xs mt-5 bg-yellow-200 rounded-lg text-black border-yellow-600 border-2 p-3 '>
          <p>Thank you for minting! Your transaction is currently being mined.</p>
          
          <a
            href={`https://polygonscan.com/tx/${state.transaction.hash}`}
            target='_blank'
            rel='noreferrer'
            className='underline hover:opacity-80'>
            Click here
          </a>{" "}
          to see it on polyscan.
        </div>
      ) : (
        state.status === "Success" && (
          <div className='text-center text-xs mt-5 bg-green-200 rounded-lg text-black border-green-600 border-2 p-3 '>
            <p>Your transaction has been mined.</p>
            <a
              href={`https://polygonscan.com/tx/${state.transaction.hash}`}
              target='_blank'
              rel='noreferrer'
              className='underline hover:opacity-80'>
              Click here
            </a>{" "}
            to see it on polyscan.
          </div>
        )
      )}
    </>
  )
}

export default TransactionAlert
