import React, { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';
import { $TotalPriceList } from "@/utils/api/income";

interface ChartProps {
    data: number[];
}

const Income: React.FC<ChartProps> = ({data}) => {
    const [totalPriceList, setTotalPriceList] = useState([])
    
    const chartRef = useRef<HTMLDivElement>(null);

    const initEcharts = (x:number[], y:number[]) => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            const option = {
                title: {
                    text: '区域收入'
                },
                grid: {
                    // width: '500px',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                },
                xAxis: {
                    type: 'category',
                    data: x,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '销售额',
                        type: 'bar',
                        data: y
                    }
                ],
            };
            chart.setOption(option);
        }
    }
    const loadTotalPriceList = async () => {
        $TotalPriceList().then(res=> {
            let {totalPriceList} = res.data
            console.log(totalPriceList);
            // let areaTypeName =totalPriceList.map((r:any) => {
            //     console.log(r);
                
            //     // return(
            //     //     r: r.areaTypeName
            //     // )
            // })
            // console.log(areaTypeName);
            let areaTypeName =totalPriceList.map((r:any) => r.areaTypeName)
            let totalPrice =totalPriceList.map((r:any) => r.totalPrice)
            initEcharts(areaTypeName,totalPrice)
        })
    }
    useEffect(()=>{
        loadTotalPriceList()
    },[data])
    return(
        <>
            <div style={{width: '1000px',height:'800px'}} className="charts" ref={chartRef}></div>
        </>
    )
}

export default Income;