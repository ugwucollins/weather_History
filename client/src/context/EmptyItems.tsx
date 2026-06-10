import { LayoutTemplate } from 'lucide-react'


const EmptyItems = () => {
    return (
        <div className="w-full flex justify-center items-center min-h-[80vh] px-1.5">
            <div className=" w-full max-w-200 h-full min-h-[50vh] bg-bg-color/10  rounded-2xl border border-border-color/20 shadow-2xl drop-shadow-2xl backdrop-blur-2xl flex justify-center items-center shadow-border-color/10  transition-all duration-200 hover:shadow-border-color/25 text-center">
                <div className='flex flex-col gap-y-2 items-center'>
                    <div className=' relative w-auto p-5 rounded-full bg-primary-color/30 shadow-2xl drop-shadow-2xl text-bg-color border border-primary-light-color/20 hover:scale-110 transition-all duration-200 animate-[bounce_2s_infinite]'>
                        <LayoutTemplate />
                    </div>
                    <h1 className='text-2xl font-bold text-bg-color capitalize'>No Current Location</h1>
                    <p className='font-semibold text-lg capitalize text-border-color'>select a location</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyItems