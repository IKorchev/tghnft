import Mint from "../components/Mint"
import Image from "../assets/nfts/Group 1.png"
import BGimage from "../assets/nfts/BG.png"
import { DAppProvider } from "@usedapp/core"
const url = process.env.NEXT_PUBLIC_STREAM_URL

const NFT = () => {
  const token = ""
  return (
    <div id='home'>
      <DAppProvider>
        <div className='py-24 grid items-center relative'>
          <div className='container mx-auto px-36 font-poppins  text-white z-10'>
            <div className='flex flex-col justify-center'>
              <h2 className='text-center text-2xl mt-2'>
                1000 unique randomly generated and pixelated NFTs on the Polygon Network
                based on the Original Target Hit Twitch Emote NFT
              </h2>
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
              <div className='flex mt-24'>
                <Mint />
              </div>
            </div>
          </div>
          <div className='mx-auto mt-24 border-primary-yellow border-4 rounded-lg'>
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
      </DAppProvider>
    </div>
  )
}

export default NFT
