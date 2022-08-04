import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend,CategoryScale, LinearScale,PointElement} from 'chart.js'
ChartJS.register(
  Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale,PointElement
)
export default function LineChart() {
  return (
    <div>
        <Line
            data={{
                labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                datasets:[{
                    label:'Sale History'
                }]
            }}
            options={{
                maintainAspectRatio:true,
                scales: {
                    x: {
                        grid: {
                          display: false
                        }
                      },
                    y: {
                        grid: {
                          display: false
                        },
                        max: 5,
                        min: 0,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }}
            height={40}
            width={100}
        />
    </div>
  )
}
