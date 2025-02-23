import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import MonthGridPortal from './MonthGridPortal';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('march'); // default month
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  if (!statistics) return <div>Loading...</div>;

  // Prepare data for the doughnut chart: sold vs. unsold items.
  const chartData = {
    labels: ['Sold Items', 'Not Sold Items'],
    datasets: [
      {
        label: 'Item Count',
        data: [statistics.soldItems, statistics.notSoldItems],
        backgroundColor: ['rgba(0,128,0,0.7)', 'rgba(255,0,0,0.7)'],
        borderColor: ['rgba(0,128,0,1)', 'rgba(255,0,0,1)'],
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
        text: `Sold vs. Unsold for ${statistics.month.toUpperCase()}`
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="page-component">
      {/* Header with Month Selector */}
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

      {/* Chart Box */}
      <div className="chart-box">
        <h2>Statistics for {statistics.month.toUpperCase()}</h2>
        <div className="statistics-data">
          <p><strong>Total Sale Amount:</strong> ${statistics.totalSaleAmount}</p>
          <p><strong>Total Sold Items:</strong> {statistics.soldItems}</p>
            <p><strong>Total Unsold Items:</strong> {statistics.notSoldItems}</p>
        </div>
        <div className="chart-container">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
