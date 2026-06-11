import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DateFormat from './../context/DateFormat';


const LineChart = (
    { data }: any
) => {

    const [days, setDays] = useState<any>([])
    const [dataAll, setdataAll] = useState<any>([])

//"Max °C"
    useEffect(() => {
        const dates = data.daily.time.map((item: any, index: number) => {
            return {
                date: +DateFormat(item).dateName.slice(0, 2),
                Max: data.temperature_max[index],
                Min: data.temperature_min[index],
            }
        })
        setDays(dates)
        setdataAll(dates)

    }, [data])

    const datas = dataAll?.map((item: any) => {
        return {
            date: days,
            Max: item.Max,
            Min: item.Min,
        }
    })




    return (
        <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }} className='py-2 my-5 px-4 bg-bg-color/5 rounded-2xl shadow-2xl drop-shadow-2xl border cursor-pointer border-border-color/20 backdrop-blur-2xl hover:shadow-bg-color/30 transition-all duration-150'>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                    data={dataAll || datas}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                    <XAxis dataKey="date" stroke="var(--bg)" />
                    <YAxis width="auto" stroke="var(--bg)" />
                    <Tooltip
                        cursor={{
                            stroke: 'var(--color-border-2)',
                        }}
                        contentStyle={{
                            backgroundColor: 'var(--color-surface-raised)',
                            borderColor: 'var(--color-border-2)',
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="Max"
                        stroke="var(--primary)"
                        dot={{
                            fill: 'var(--primary)',
                        }}
                        activeDot={{ r: 8, stroke: 'var(--primary)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Min"
                        stroke="var(--accent)"
                        dot={{
                            fill: 'var(--accent)',
                        }}
                        activeDot={{ stroke: 'var(--accent)' }}
                    />
                    <RechartsDevtools />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );

}

export default LineChart



