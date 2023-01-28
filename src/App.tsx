import React from 'react';
import './App.scss';
import { Calories } from './components/Calories';
import { MainCalculactor } from './components/MainCalculator';
import './index.scss'

function App() {
  return (
    <div className='container'>
      <Calories/>
      {/* <MainCalculactor/> */}
    </div>
  );
}

export default App;
