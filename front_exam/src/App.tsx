
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './containers/home.tsx';

const App = () => {

  return (
    <>
      <h1>NEWS</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
};

export default App
