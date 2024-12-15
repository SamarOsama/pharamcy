import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components to Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart = ({ medications }) => {
    // Calculate the count of odd and even IDs
    console.log(medications)
    const counts = medications?.reduce(
        (acc, medication) => {
            if (medication.id % 2 === 0) {
                acc.even += 1;
            } else {
                acc.odd += 1;
            }
            return acc;
        },
        { even: 0, odd: 0 }
    );

    // Data for the chart
    const data = {
        labels: ['Odd IDs', 'Even IDs'],
        datasets: [
            {
                label: 'Count of Medications',
                data: [counts.odd, counts.even],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Count of Medications by ID Status',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;