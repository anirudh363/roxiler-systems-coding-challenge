import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import MonthGridPortal from './MonthGridPortal';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState('march'); // default month
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bar-chart?month=${month}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  if (!chartData) return <div>Loading...</div>;

  // Prepare labels and data
  const labels = chartData.barChartData.map(item => item.priceRange);
  const counts = chartData.barChartData.map(item => item.itemCount);

  // Generate bright alternating colors for the bars.
  const brightColors = labels.map((_, index) =>
    index % 2 === 0
      ? 'rgba(255, 72, 0, 0.8)'   // bright red-pink
      : 'rgba(255, 166, 0, 0.8)'    // bright blue
  );
  const borderColors = labels.map((_, index) =>
    index % 2 === 0
      ? 'rgba(255, 72, 0, 1)'
      : 'rgba(255, 166, 0, 1)'
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Item Count',
        data: counts,
        backgroundColor: brightColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    plugins: {
      title: {
        display: true,
        text: `Bar Chart for ${month.toUpperCase()}`,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="page-component">
      <div className="header">
        <div className="month-selector">
          <div 
            className="selected-month" 
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
          >
            {month.toUpperCase()}
          </div>
          {isMonthDropdownOpen && (
            <MonthGridPortal>
              <div className="month-grid">
                {months.map((m) => (
                  <div
                    key={m}
                    className={`month-item ${month === m ? 'selected' : ''}`}
                    onClick={() => {
                      setMonth(m);
                      setIsMonthDropdownOpen(false);
                    }}
                  >
                    {m.toUpperCase()}
                  </div>
                ))}
              </div>
            </MonthGridPortal>
          )}
        </div>
      </div>

      <div className="bar-chart-box">
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
