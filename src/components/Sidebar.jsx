import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {SiFranprix, SiShutterstock} from 'react-icons/si';
import {MdOutlineCancel} from 'react-icons/md';
import {GiBuyCard} from 'react-icons/gi'
import {BsFillPersonFill, BsPersonBadge} from 'react-icons/bs';
import {AiOutlineCalendar} from 'react-icons/ai';
import {CgMenuBoxed} from 'react-icons/cg'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';


const Sidebar = () => {
  const {activeMenu, setActiveMenu, screenSize} = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize < 900) {
      setActiveMenu(false);
    }
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-200 text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (<>
      <div className='flex justify-between items-center'>
        <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <SiFranprix/> <span>Dashboard Cantina</span>
        </Link>
        <TooltipComponent content="Menu" position='BottomCenter'>
          <button type="button"
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block sd:hidden">
            <MdOutlineCancel/>
          </button>
        </TooltipComponent>
      </div>
      <div className='mt-10'>
        <div>
          <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'> Armazém </p>
          <NavLink
            to="/teste"
            key="01"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <SiShutterstock/>
              <span className='capitalize'> Inventário </span>
            </NavLink>

            <NavLink
            to="/orders"
            key="02"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <GiBuyCard/>
              <span className='capitalize'> Encomendas </span>
            </NavLink>
        </div>
        <div>
          <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'> Pessoal </p>
          <NavLink
            to="/students"
            key="03"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <BsFillPersonFill/>
              <span className='capitalize'> Alunos </span>
            </NavLink>

            <NavLink
            to="/employees"
            key="04"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <BsPersonBadge/>
              <span className='capitalize'> Staff </span>
            </NavLink>
        </div>
        <div>
          <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'> Outros </p>
          <NavLink
            to="/calendar"
            key="05"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <AiOutlineCalendar/>
              <span className='capitalize'> Calendário </span>
            </NavLink>
            <NavLink
            to="/import"
            key="06"
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <CgMenuBoxed/>
              <span className='capitalize'> Importar Ementas </span>
            </NavLink>
        </div>
      </div>
      </>)}
    </div>
  )
}

export default Sidebar