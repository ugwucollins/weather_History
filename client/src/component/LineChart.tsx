import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DateFormat from './../context/DateFormat';


const LineChart = (
    { data }: any
) => {
    const [mins, setMins] = useState<any>([])
    const [maxs, setMaxs] = useState<any>([])
    const [days, setDays] = useState<any>([])
    // const [dates, setDates] = useState<any>([])
    // const [dataAll, setDataAll] = useState<any>([])
    const dataAll: any = []


    useEffect(() => {
        const dates = data.daily.time.map((item: any) => {

            return {
                date: +DateFormat(item).dateName.slice(0, 2),
            }
        })
        setDays(dates)

        const maxData = data.temperature_max.map((item: any) => {

            return {
                max: item,
            }
        })
        setMaxs(maxData)
        const minData = data.temperature_min.map((item: any) => {
            return {
                min: item,
            }
        })
        setMins(minData)
        const arr = {
            temperature_max: maxs, temperature_min: mins, days: days
        }

        dataAll.push(arr)


    }, [data])

    const datas = dataAll?.map((item: any) => {
        const days = item.days.split(',')
        console.log(item);
        return {
            name: days,
            pv: item.temperature_max,
            uv: item.temperature_min,
        }
    })
    console.log(datas);




    return (
        <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                    data={datas}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                    <XAxis dataKey="name" stroke="var(--color-text-3)" />
                    <YAxis width="auto" stroke="var(--color-text-3)" />
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
                        dataKey="pv"
                        stroke="var(--color-chart-1)"
                        dot={{
                            fill: 'var(--color-surface-base)',
                        }}
                        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="var(--color-chart-2)"
                        dot={{
                            fill: 'var(--color-surface-base)',
                        }}
                        activeDot={{ stroke: 'var(--color-surface-base)' }}
                    />
                    <RechartsDevtools />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );

}

export default LineChart



