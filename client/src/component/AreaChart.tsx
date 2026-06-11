import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import DateFormat from './../context/DateFormat';

// #region Sample data
// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];
type AreaChartPropS = {
    isAnimationActive?: boolean,
    data: any,
}
// #endregion
const AreaChartExample = ({ isAnimationActive = true, data }: AreaChartPropS) => {
    const [days, setDays] = useState<any>([])
    const [dataAll, setdataAll] = useState<any>([])


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
        <div className='py-2 cursor-pointer my-5 px-4 bg-bg-color/5 rounded-2xl shadow-2xl drop-shadow-2xl border border-border-color/20 backdrop-blur-2xl hover:shadow-bg-color/30 transition-all duration-150'>
            <AreaChart
                style={{ width: '100%', maxWidth: '900px', maxHeight: '60vh', aspectRatio: 1.618 }}
                responsive
                data={dataAll || datas}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"
                            stopColor="#fbbf24"
                            //  stopColor="#8884d8"
                            stopOpacity={0.8} />
                        <stop offset="95%"
                            stopColor="#fbbf24"
                            // stopColor="#8884d8"
                            stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"
                            stopColor="#aa3bff"
                            // stopColor="#82ca9d"
                            stopOpacity={0.8} />
                        <stop offset="95%"
                            stopColor="#aa3bff"
                            // stopColor="#82ca9d"
                            stopOpacity={0} />
                    </linearGradient>
                </defs>
                {/* <CartesianGrid strokeDasharray="4 " /> */}
                <XAxis dataKey="date" />
                <YAxis width="auto" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="Max"
                    stroke="#fbbf24"
                    // stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    isAnimationActive={isAnimationActive}
                />
                <Area
                    type="monotone"
                    dataKey="Min"
                    stroke="#aa3bff"
                    // stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    isAnimationActive={isAnimationActive}
                />
                <RechartsDevtools />
            </AreaChart>
        </div>
    );
}


export default AreaChartExample;
