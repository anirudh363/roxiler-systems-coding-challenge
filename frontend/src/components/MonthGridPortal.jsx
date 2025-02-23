import React from 'react';
import ReactDOM from 'react-dom';

export default function MonthGridPortal({ children }) {
  return ReactDOM.createPortal(children, document.body);
}
