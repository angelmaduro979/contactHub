import React from 'react';
import ReactDOM from 'react-dom/client';
import { Username, Contacts } from './index';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';





ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Username />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  </BrowserRouter>,
)
