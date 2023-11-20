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

interface TreeBarChart {
  branchNames: string[]
  notYet: number[]
  branchDoneCount: number[]
}

const BarChart: React.FC<TreeBarChart> = ({
  branchNames,
  notYet,
  branchDoneCount,
}) => {
  // if (branchNames.length > 0) {
  //   return <p>아직 생성된 가지가 없습니다.</p>
  // }
  const labels = branchNames
  const data = {
    labels,
    datasets: [
      {
        label: '한거',
        data: branchDoneCount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '안한거',
        data: notYet,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  return <Bar height="300" options={options} data={data} />
}

export default BarChart
