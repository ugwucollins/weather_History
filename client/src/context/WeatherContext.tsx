import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from './Api';


export const CreateWeatherContext = createContext({})
const WeatherContext = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState('')
    const [Loading, setLoading] = useState<boolean>(false)
    const [CurrentWeather, setCurrentWeather] = useState(null)
    const [weather, setWeather] = useState<[] | null>(null)



    async function getSummaryWeather() {
        setLoading(true)
        if (!search.trim()) {
            console.log('');

        }
        try {
            const res = await api.get('/summary/' + search)
            const data = await res.data
            console.log(data);

            if (data.success) {
                setCurrentWeather(data.data)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    async function getWeather() {
        setLoading(true)
        if (!search.trim()) {
            console.log('');

        }
        try {

            const res = await api.get('/weather/' + search)
            const data = await res.data
            console.log(data);

            if (data.success) {
                setWeather(data.data)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (search.trim()) {
            getSummaryWeather()
            getWeather()
        }
    }, [search])

    const values = {
        search, setSearch, Loading, setLoading, CurrentWeather, weather, setWeather
    }
    return (
        <CreateWeatherContext.Provider value={values}>{children}</CreateWeatherContext.Provider>
    )
}

export default WeatherContext


export function UseWeather() {
    return useContext(CreateWeatherContext)
}