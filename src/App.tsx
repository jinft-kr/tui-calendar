import './App.css';
import './input.css';

import React from 'react';

import Calender from "./pages/calender";

export function App() {
    return (
        <>
            <Calender view={"month"}/>
        </>
    );
}

export default App;