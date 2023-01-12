import React from 'react'
import logo from './logo.svg';
import './App.css';
import './Chatbot/scss/index.scss'
// import ChatbotRoutes from "../src/route/routes"s
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chatbot from './Chatbot/chatbot';
import Dashboard from './Dashboard/dashboard';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Chatbot />}></Route>
          <Route path='/dashboard' exact element={<Dashboard />}></Route>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
