import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register components to Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ inventoryData }) => {
    // Prepare data for the chart
    const data = {
        labels: Object.keys(inventoryData),
        datasets: [
            {
                label: 'Medication Inventory',
                data: Object.values(inventoryData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
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
                text: 'Medication Inventory Distribution',
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default PieChart;