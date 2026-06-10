import Aos from 'aos';
import { useEffect } from 'react';
import Home from './Home/Home';
import WeatherContext from './context/WeatherContext';

function App() {
    useEffect(() => {
        Aos.init({
            once: true,
            duration: 1000,
            easing: 'ease-in-out',
            delay: 5
        })
    }, [])

    return (
        <WeatherContext>
            <div className='w-full z-1 relative min-h-screen bg-[url(/bg.png)] px-2 py-1 bg-no-repeat bg-cover'>
                <div className='absolute top-0 left-0 w-full h-full shadow-2xl drop-shadow-2xl bg-linear-180 from-text-color/70 to-bg-color/5 via-primary-color/20 backdrop-blur z-0' />
                <Home />
            </div>
        </WeatherContext>
    )
}

export default App