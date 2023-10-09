import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './component/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invoice from './component/Invoice';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/invoice' element={<Invoice/>} />        
      </Routes>
    </Router>
    
  </React.StrictMode>
);

