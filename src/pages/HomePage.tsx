import landingImage from '../assets/landing.png'
import appDownloadImage from '../assets/appDownload.png'

export default function HomePage() {
  return (
    <div className='flex flex-col gap-12'>
        <div className='bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
            <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
                Order your favorite meal from a Restaraunt near you
            </h1>
            <span className="text-xl">
                Food is just a click away!
            </span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImage} alt='Landing' />
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
                <span className='font-bold text-3xl tracking-tighter'>Order takeaway even Faster</span>
                <span className='text-sm font-bold'>Download the ChapChapEats App for faster ordering and personalised recommendations</span>
                <img src={appDownloadImage} alt='App Download' />
            </div>
        </div>
    </div>
  )
};