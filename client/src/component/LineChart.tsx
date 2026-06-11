import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DateFormat from './../context/DateFormat';


const LineChart = (
    { data }: any
) => {
    const [days, setDays] = useState<any>([])
    
    const [dataAll,setDataAll] =useState<any>([])

//"Max °C"
    useEffect(() => {
        const dates = data.daily.time.map((item: any,index) => {
            return {
                date: +DateFormat(item).dateName.slice(0,2),
                Max:data.temperature_max[index],
                Min:data.temperature_min[index],

            }
        })
        setDays(dates)
        setDataAll(datas)

        
    }, [data])

    const datas = dataAll?.map((item: any,index) => {
        console.log(item);
        return {
            date: days,
            Max: item.max,
            Min: item.Min,
        }
    })
    console.log(datas);




    return (
        <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                    data={dataAll||datas}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                    <XAxis dataKey="date" stroke="var(--bg-color)" />
                    <YAxis width="auto" stroke="var(--bg-color)" />
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
                        stroke="var(--secondary-color)"
                        dot={{
                            fill: 'var(--secondary-color)',
                        }}
                        activeDot={{ r: 8, stroke: 'var(--secondary-color)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Min"
                        stroke="var(--primary-color)"
                        dot={{
                            fill: 'var(--primary-color)',
                        }}
                        activeDot={{ stroke: 'var(--primary-color)' }}
                    />
                    <RechartsDevtools />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );

}

export default LineChart



