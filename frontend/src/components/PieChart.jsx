import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import MonthGridPortal from './MonthGridPortal';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart() {
  const [chartData, setChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('march'); // default month
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  useEffect(() => {
    fetchPieChartData();
  }, [selectedMonth]);

  const fetchPieChartData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pie-chart?month=${selectedMonth}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  if (!chartData) return <div>Loading...</div>;

  // Prepare labels and data from API
  const labels = chartData.pieChartData.map(item => item.category);
  const counts = chartData.pieChartData.map(item => item.itemCount);

  // Use orange shades for bright colors
  const backgroundColors = [
    'rgba(255, 102, 0, 0.7)',   
    'rgba(255, 0, 0, 0.7)',  
    'rgba(0, 119, 255, 0.7)',   
    'rgba(166, 255, 0, 0.7)'    
  ];
  const borderColors = [
    'rgba(255, 102, 0, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(0, 119, 255, 1)',
    'rgba(166, 255, 0, 1)'
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Item Count',
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    },
    plugins: {
      title: {
        display: true,
        text: `Pie Chart for ${chartData.month.toUpperCase()}`
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="page-component">
      <div className="header">
        <div className="month-selector">
          <div
            className="selected-month"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
          >
            {selectedMonth.toUpperCase()}
          </div>
          {isMonthDropdownOpen && (
            <MonthGridPortal>
              <div className="month-grid">
                {months.map((m) => (
                  <div
                    key={m}
                    className={`month-item ${selectedMonth === m ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedMonth(m);
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

      <div className="pie-chart-box">
        <h2>Pie Chart for {chartData.month.toUpperCase()}</h2>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
