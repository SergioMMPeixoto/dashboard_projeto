import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import { Home, Orders, Calendar, Employees, Students, Stock, ColorMapping} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css'

const App = () => {
  const {activeMenu} = useStateContext();

  return (
    <div>
      <BrowserRouter>
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{zIndex: '1000'}}>
          <TooltipComponent content="Definições" position='Top'>
            <button type="button" className='text-3x1 p-3 hover:drop-shadow-x1 hover:bg-light-gray text-white'
            style={{background: 'blue', borderRadius: '50%'}}>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
            < Sidebar />
          </div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div className={
          `dark:bg-main-bg bg-main-bg main-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
          }>
          
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar/>
          </div>
        <Routes>
          {/*  Dashboard principal  */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Paginas */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/students" element={<Students />} />
          {/* <Route path="/importar" element="Importar" />*/}

          {/* Apps */}
          <Route path="/calendar" element={<Calendar />} />

          {/* Grafos para depois, ainda nao ha fonte de dados em condiçoes por isso pode esperar
          <Route path="/desperdicio" element="Desperdicio" />
          <Route path="/consumo" element="Consumo" />
          */}
          
        </Routes>
      </div>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App