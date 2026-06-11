
import { Sun, Thermometer } from 'lucide-react';
import { useContext } from 'react';
import AreaChartExample from './../component/AreaChart';
import LineChart from './../component/LineChart';
import { CreateWeatherContext } from './../context/WeatherContext';
import CardSection from './CardSection';
import HomeCard from './HomeCard';


const HomeBanner = () => {
    const { weather }: any = useContext(CreateWeatherContext)

    return (
        <div className='w-full flex justify-center flex-col items-center '>
            <div className='w-full flex flex-col justify-center items-center gap-y-3 max-w-200 py-3 relative'>
                <Header />
                <HomeCard />
                <CardSection />
                {weather &&
                    <>
                        <LineChart data={weather}
                        />
                        <AreaChartExample data={weather} />
                    </>

                }
            </div>
        </div>
    )
}

export default HomeBanner

const Header = () => {
    const locations = ['select Location', 'lagos', 'kano', 'ibadan']
    const { search, setSearch, CurrentWeather }: any = useContext(CreateWeatherContext)





    return (
        <div className='flex sticky top-0 max-[400px]:flex-col justify-between py-2.5 rounded-full items-center bg-bg-color/20 px-4 shadow-2xl drop-shadow-2xl backdrop-blur-2xl shadow-shadow-color/50 border border-border-color/55 w-full z-20'>
            <div className='text-xl font-bold text-primary-color'>
                <h1>Weather History</h1>
            </div>
            <div>
                <select value={CurrentWeather ? CurrentWeather.location : search} className='py-2.5 px-4 rounded-full bg-bg-color/10 w-75 max-sm:w-full border outline-none focus:border-primary-light-color border-primary-color/20 shadow hover:shadow-xl cursor-pointer transition-all duration-200 drop-shadow-2xl focus:border-none capitalize placeholder:text-base focus-within:border-primary-light-color font-semibold text-primary-color' name="location" onChange={(e) => setSearch(e.target.value)} id="location">
                    {locations.map((location, index: number) =>
                        <option value={location} className="capitalize font-semibold text-base" key={index}>{location}</option>
                    )}
                </select>
            </div>
            <div className='flex max-sm:hidden relative w-auto px-4 py-2 rounded-full bg-bg-color/10 shadow drop-shadow-2xl hover:shadow-2xl text-primary-color  transition-all duration-200 hover:shadow-secondary-light-color'>
                <Thermometer />
                <Sun />
            </div>
        </div>
    )
}

