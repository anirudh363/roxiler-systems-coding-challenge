import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import MonthGridPortal from './MonthGridPortal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faX } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('march'); // default month
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, search, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions?month=${selectedMonth}&search=${search}&page=${currentPage}&perPage=4`
      );
      const data = await response.json();
      setTransactions(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
    setIsMonthDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const openTransactionModal = (txn) => {
    setSelectedTransaction(txn);
  };

  const closeTransactionModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="page-component">
      <div className="header">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <div className="month-selector">
          <div
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="selected-month"
          >
            {selectedMonth.toUpperCase()}
          </div>
          {isMonthDropdownOpen && (
            <MonthGridPortal>
              <div className="month-grid">
                {months.map((month) => (
                  <div
                    key={month}
                    className={`month-item ${selectedMonth === month ? 'selected' : ''}`}
                    onClick={() => handleMonthClick(month)}
                  >
                    {month.toUpperCase()}
                  </div>
                ))}
              </div>
            </MonthGridPortal>
          )}
        </div>
      </div>

      <div className="transactions-grid">
        {transactions.map((txn) => (
          <div
            key={txn._id}
            className="transaction-card"
            onClick={() => openTransactionModal(txn)}
          >
            <p>
              <img src={txn.image} alt={txn.title} />
            </p>
            <h3>{txn.title}</h3>
            <p>
              <strong>Category:</strong> {txn.category}
            </p>
            <p>
              <strong>Price:</strong> ${txn.price}
            </p>
            <p>
              <strong>Status:</strong> {txn.sold ? 'Sold' : 'Unsold'}
            </p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {selectedTransaction && (
        <Modal
          isOpen={!!selectedTransaction}
          onRequestClose={closeTransactionModal}
          className="transaction-modal"
          overlayClassName="modal-overlay"
        >
          <h2>{selectedTransaction.title}</h2>
          <img
            src={selectedTransaction.image}
            alt={selectedTransaction.title}
            className="modal-image"
          />
          <p>
            <strong>Description:</strong> {selectedTransaction.description}
          </p>
          <p>
            <strong>Category:</strong> {selectedTransaction.category}
          </p>
          <p>
            <strong>Price:</strong> ${selectedTransaction.price}
          </p>
          <p>
            <strong>Status:</strong> {selectedTransaction.sold ? 'Sold' : 'Unsold'}
          </p>
          <p>
            <strong>Date of Sale:</strong>{' '}
            {new Date(selectedTransaction.dateOfSale).toLocaleDateString()}
          </p>
          <button className='modal-close' onClick={closeTransactionModal}><FontAwesomeIcon icon={faX} /></button>
        </Modal>
      )}
    </div>
  );
}
