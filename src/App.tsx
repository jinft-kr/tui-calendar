import './App.css';
import './input.css';

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export function App() {
    return (
        <div style={{margin:"0% 10%"}}>
          <Header/>
          <Outlet/>
        </div>
    );
}

export default App;