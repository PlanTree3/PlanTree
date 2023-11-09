import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
  },
}

const labels = ['월', '화', '수', '목', '금']

const data = {
  labels,
  datasets: [
    {
      label: '한거',
      data: [7, 5, 6, 8, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '안한거',
      data: [2, 1, 3, 5, 0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const BarChart = () => {
  return <Bar height="300" options={options} data={data} />
}

export default BarChart
