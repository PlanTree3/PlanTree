/* eslint-disable react/require-default-props */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './DoughnutChart.css'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  centerText?: string
  chartData: {
    labels?: string[]
    content?: string
    data: number[]
  }
}

const DoughnutChart = ({ centerText, chartData }: DoughnutChartProps) => {
  const textCenter: any = {
    id: 'textCenter',
    beforeDatasetDraw(chart: any) {
      const { ctx } = chart
      ctx.save()
      ctx.font = '25px SeoulHangangM'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.textBaseLine = 'middle'
      ctx.fillText(
        centerText,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      )
    },
  }
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.content,
        data: chartData.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(2, 2, 2, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(2, 2, 2, 0.2)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="chart-box">
      <Doughnut data={data} plugins={centerText ? [textCenter] : []} />
    </div>
  )
}

export default DoughnutChart
