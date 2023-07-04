import './App.css';
import './input.css';

import Header from './components/Header';

import { Outlet } from 'react-router-dom';

export function App() {
    return (
        <div style={{margin:"0% 10%"}}>
          <Header/>
          <Outlet/>
        </div>
    );
}

export default App;