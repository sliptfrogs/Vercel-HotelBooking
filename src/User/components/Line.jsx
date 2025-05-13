// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Sample data for the line graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
    datasets: [
      {
        label: 'Sales Over Time', // Line label
        data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data points
        fill: false, // Do not fill the area under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.1, // Smoothness of the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true, // Make the chart responsive to window size
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales', // Title of the chart
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
