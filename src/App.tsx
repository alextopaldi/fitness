import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Calories } from './components/Calories';
import { MainCalculactor } from './components/MainCalculator';
import { Navigation } from './components/Navigation';
import './index.scss'
import { CalculatorPage } from './pages/CalculatorPage';
import { CaloriesPage } from './pages/CaloriesPage';

function App() {
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path='/' element={<CalculatorPage/>}></Route>
      <Route path='/calories' element={<CaloriesPage/>}></Route>
    </Routes>
    </>
  );
}

export default App;
