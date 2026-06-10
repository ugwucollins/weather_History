import { Droplet, Sun, Thermometer, Wind } from 'lucide-react';
import { useContext } from 'react';
import { GetWeatherTheme } from './../component/GetWeatherTheme ';
import { CreateWeatherContext } from './../context/WeatherContext';
const CardSection = () => {
    const { CurrentWeather, Loading }: any = useContext(CreateWeatherContext)

    console.log(CurrentWeather);

    return (
        <>
            {CurrentWeather ?
                <div className="w-full relative flex flex-row flex-wrap max-md:justify-center justify-evenly items-center gap-4">


                    {/* Humidity */}
                    <div className="px-6 pr-10 max-sm:pr-12 max-sm:py-4 relative w-auto py-5 rounded-2xl shadow drop-shadow-2xl border border-border-color/10 shadow-bg-color/5 hover:shadow-bg-color/40 transition-all duration-200 cursor-pointer hover:shadow-2xl bg-bg-color/10 backdrop-blur-2xl flex flex-col gap-y-1">
                        <div className='py-3 text-primary-color'>
                            <Droplet />
                        </div>
                        <h1 className="text-lg font-semibold text-primary-color">Humidity</h1>
                        <p className='text-base text-bg-color font-bold pb-1'>{CurrentWeather.humidity
                        }%</p>

                        <div className='w-full bg-bg-color/10 h-1 py-0.5 my-1 rounded-full relative'>
                            <div style={{
                                width: `${CurrentWeather.humidity
                                    }%`
                            }}
                                className='bg-primary-color  absolute top-0 left-0 h-full' />
                        </div>
                    </div>

                    {/* Wind */}

                    <div className="px-6 pr-10 max-sm:pr-12 max-sm:py-4 relative w-auto py-5 rounded-2xl shadow drop-shadow-2xl border border-border-color/10 shadow-bg-color/5 hover:shadow-bg-color/40 transition-all duration-200 cursor-pointer hover:shadow-2xl bg-bg-color/10 backdrop-blur-2xl flex flex-col gap-y-1">
                        <div className='py-3 text-primary-color'>
                            <Wind />
                        </div>
                        <h1 className="text-lg font-semibold text-primary-color">Wind</h1>
                        <p className='text-base text-bg-color font-bold pb-1'>{CurrentWeather.wind_speed
                        } <span>mp/h</span></p>

                        <div className='w-full text-left text-sm font-semibold text-primary-color capitalize'>
                            direction: NW
                        </div>
                    </div>

                    <div className="px-6 pr-10 max-sm:pr-12 max-sm:py-4 relative w-auto py-5 rounded-2xl shadow drop-shadow-2xl border border-border-color/10 shadow-bg-color/5 hover:shadow-bg-color/40 transition-all duration-200 cursor-pointer hover:shadow-2xl bg-bg-color/10 backdrop-blur-2xl flex flex-col gap-y-1">
                        <div className='py-3 text-primary-color'>
                            <Sun />
                        </div>
                        <h1 className="text-lg font-semibold text-primary-color uppercase">Uv index</h1>
                        <p className='text-base text-bg-color font-bold pb-1'>{CurrentWeather.weather
                        }</p>

                        <div className='w-auto rounded-full relative uppercase text-[12px] text-center px-0.5 bg-primary-color/10 text-primary-color border border-primary-light-color'>
                            {GetWeatherTheme(+CurrentWeather.weather
                            ).label}
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="px-6 pr-10 max-sm:pr-12 max-sm:py-4 relative w-auto py-5 rounded-2xl shadow drop-shadow-2xl border border-border-color/10 shadow-bg-color/5 hover:shadow-bg-color/40 transition-all duration-200 cursor-pointer hover:shadow-2xl bg-bg-color/10 backdrop-blur-2xl flex flex-col gap-y-1">
                        <div className='py-3 text-primary-color'>
                            <Thermometer />
                        </div>
                        <h1 className="text-lg font-semibold text-primary-color">Temperature</h1>
                        <p className='text-base text-bg-color font-bold pb-1'>{CurrentWeather.temperature
                        } °C</p>

                        <div className='w-full text-sm font-semibold capitalize text-primary-color relative'>
                            clear Horizon
                        </div>
                    </div>
                </div> : Loading ?
                    <div className="w-full relative flex flex-row flex-wrap max-md:justify-center justify-evenly items-center gap-1">
                        {[1, 2, 3, 4].map((_, index: number) => <div key={index} className="px-6 pr-10 max-sm:pr-12 max-sm:py-4 relative py-5 rounded-2xl shadow drop-shadow-2xl animate-pulse border border-border-color/10 shadow-bg-color/5 hover:shadow-bg-color/40 transition-all duration-200 cursor-pointer hover:shadow-2xl bg-bg-color/10 backdrop-blur-2xl flex flex-col gap-y-1 w-38 h-50" />

                        )}

                    </div>
                    : null
            }
        </>
    )
}

export default CardSection