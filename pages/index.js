import Mint from "../components/Mint"
import ExampleGIF from "../assets/nfts/example-gif.gif"
import { DAppProvider } from "@usedapp/core"
import Footer from "../components/Footer"
const NFT = () => {
  const token = process.env.TOKEN_ADDRESS
  return (
    <div id='home'>
      <DAppProvider>
        <div className='py-24 relative'>
          <div className='container mx-auto lg:px-36 font-poppins  text-white z-10'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-center text-2xl mt-2 max-w-[600px]'>
                1000 unique randomly generated NFTs on the Polygon Network based on the
                Original Target Hit Twitch Emote NFT
              </h1>

              <h3 className='text-center text-primary-yellow mt-2'>
                <a
                  className='underline  hover:opacity-80 mx-5'
                  href={`https://polygonscan.com/token/${token}`}>
                  Contract
                </a>
                <a
                  className='underline hover:opacity-80  mx-5'
                  href='https://targethit.com/'>
                  Target Hit
                </a>
              </h3>
              <div className='flex mt-24 flex-col lg:flex-row items-center'>
                <img
                  src={ExampleGIF.src}
                  className='rounded-full border-dashed w-96 h-96 mx-12 shadow-2xl mb-5 lg:mb-0 border-4 border-primary-yellow'
                />
                <Mint />
              </div>
            </div>
          </div>
          <h1 className='text-primary-yellow text-center px-12 mt-24 text-5xl font-bold'>
            Watch Target Hit live
          </h1>
          <div className='mx-auto mt-24 max-w-[1290px] max-h-[730px] border-primary-yellow border-4 rounded-lg'>
            <iframe
              width='1280'
              height='720'
              src={process.env.NEXT_PUBLIC_STREAM_URL}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          </div>
        </div>
        <Footer />
      </DAppProvider>
    </div>
  )
}

export default NFT
