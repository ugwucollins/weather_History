import Aos from 'aos';
import { Dot, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { GetWeatherTheme } from './../component/GetWeatherTheme ';
import DateFormat from './../context/DateFormat';
import EmptyItems from './../context/EmptyItems';
import { UseWeather } from './../context/WeatherContext';

const HomeCard = () => {
    const { CurrentWeather, search }: any = UseWeather()

    useEffect(() => {
        Aos.init({
            once: true,
            duration: 1000,
            easing: "ease-in-out",
            delay: 5,
        });
    }, []);

    return (
        <>
            {CurrentWeather ?
                <div className="my-10 p-8 gap-4 max-sm:px-5 py-5 w-full bg-bg-color/20 rounded-2xl shadow-2xl drop-shadow-2xl backdrop-blur-2xl h-full min-h-[50vh] border border-border-color/20">

                    <div className="w-full flex items-center justify-between flex-row flex-wrap max-[700px]:justify-center">
                        <div data-aos='zoom-in' className='py-3 w-full max-w-80 px-14 max-[400px]:w-full'>
                            <div className='flex flex-row items-center relative w-auto px-3 py-2 rounded-full  bg-primary-light-color/20 shadow drop-shadow-2xl text-primary-color text-[12px] font-bold capitalize border border-border-color/10 shadow-primary-color/20 my-2'>
                                <Dot />
                                <span>current Weather</span>
                            </div>

                            <div className='py-4'>
                                <h1 className='text-3xl font-bold capitalize text-bg-color'>{DateFormat(CurrentWeather.date
                                ).day}</h1>
                                <span className=' font-semibold text-border-color text-base'>{DateFormat(CurrentWeather.date).dateName}</span>
                            </div>
                            <div className='w-full py-5'>
                                <h1 className='text-6xl font-semibold text-bg-color'>{CurrentWeather.temperature
                                }°C</h1>
                                <div className='py-4 flex gap-1.5 flex-row flex-wrap text-base font-semibold text-border-color'>
                                    <p>High: {CurrentWeather.temperature
                                    }</p>/
                                    <p>low: {CurrentWeather.temperature

                                    }</p>
                                </div>
                            </div>

                        </div>

                        <div data-aos="fade-up" className='max-[400px]:w-full py-3 px-10 w-full max-w-70 justify-center  text-left '>
                            <div className='flex flex-row items-center relative w-auto px-3 py-2 rounded-full gap-1 bg-secondary-color/50 shadow drop-shadow-2xl text-bg-color text-[12px] font-bold capitalize border border-border-color/10 shadow-secondary-color/20 my-2'>
                                <MapPin size={20} />
                                <span>{search}</span>
                            </div>
                            <div className='py-6 w-full justify-center items-center flex text-white'>
                                {GetWeatherTheme(+CurrentWeather.weather
                                ).icon}

                            </div>

                            <div>
                                <h1 className='font-bold text-2xl text-bg-color'>
                                    {GetWeatherTheme(+CurrentWeather.weather
                                    ).label}
                                </h1>
                                <p className='text-base font-bold text-border-color'>forecast like {CurrentWeather.temperature
                                }</p>
                            </div>

                        </div>
                    </div>
                </div> :
                <EmptyItems />
            }
        </>
    )
}

export default HomeCard