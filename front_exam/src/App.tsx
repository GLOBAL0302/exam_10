
import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './containers/home';
import NewsItem from './features/NewsItem/NewsItem.tsx';


const App = () => {

  return (
    <>
      <NavLink to="/" >
        <h1 className="text-black">NEWS</h1>
      </NavLink>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="news/:id" element={<NewsItem/>}/>
      </Routes>
    </>
  )
};

export default App
