import React from 'react'
import Ajax from 'react-ajax'

import { useEffect, useState } from 'react'
import api from "../components/api";
import { LineChart, Pie, Button} from '../components'

import { FaBox } from "react-icons/fa"
import { BsTrash , BsFillPersonCheckFill, BsFillPersonXFill} from "react-icons/bs"
import { GiMeal } from "react-icons/gi"
import { GoPrimitiveDot } from "react-icons/go"
import { RiGitRepositoryCommitsLine } from 'react-icons/ri';
import { data } from 'autoprefixer';
import { parseString } from 'react-ajax/src/request';



const Home = () => {

  //obter dados para mostrar na dashboard

  const [food, setFood] = useState('');
  const [food1, setFood1] = useState('');


  useEffect( async () => {
    await api.get("daydata/lastDayData/").then(function (response) {
      setFood(response.data);

      api.get("daydata/" + (response.data.id - 1) + "/").then(function (response1) {
        setFood1(response1.data);
      })
    })
  }, []);

  //as percentagens positivas tambem podem ser "más" pois mais desperdicio devera aparecer em vermelho
  
  const goodPercentage = `text-sm text-green-600 ml-2`;
  const badPercentage = `text-sm text-red-600 ml-2`;

  const consumedPerc = ((food?.foodConsumed - food1?.foodConsumed) / food1?.foodConsumed * 100.0).toFixed(2);
  const wastedPerc = ((food?.foodWasted - food1?.foodWasted) / food1?.foodWasted * 100.0).toFixed(2);
  const clientsPerc = ((food?.clients - food1?.clients) / food1?.clients * 100.0).toFixed(2);
  const absencesPerc = ((food?.absences - food1?.absences) / food1?.absences* 100.0).toFixed(2);



  return (
    <div className="mt-12">
    <div className="flex flex-wrap lg:flex-nowrap justify-center ">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-2xl">Dados</p>
            <p className="font-bold">{food?.date}</p>
          </div>
          <button
            type="button"
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
          >
            <FaBox />
          </button>
        </div>
        <div className="mt-6">
          <Button
            color="white"
            bgColor="blue"
            text="Refresh"
            borderRadius="10px"
          />
        </div>
      </div>
      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ color: "green", backgroundColor: "#e5e7eb" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <GiMeal/>
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold"> {food?.foodConsumed}  Kg</span>
              <span className={(consumedPerc > 0 ? goodPercentage : badPercentage)}>
              {consumedPerc}%
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Consumo</p>
          </div>

          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ color: "#D0021B", backgroundColor: "#e5e7eb" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <BsTrash/>
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{food?.foodWasted} Kg</span>
              <span className={(wastedPerc > 0 ? badPercentage : goodPercentage)}>
              {wastedPerc}%
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Desperdicios</p>
          </div>

          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ color: "green", backgroundColor: "#e5e7eb" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <BsFillPersonCheckFill/>
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{food?.clients}</span>
              <span className={(wastedPerc > 0 ? goodPercentage : badPercentage)}>
              {clientsPerc}%
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Utentes</p>
          </div>

          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ color: "#D0021B", backgroundColor: "#e5e7eb" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <BsFillPersonXFill/>
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{food?.absences}</span>
              <span className={(absencesPerc > 0 ? badPercentage : goodPercentage)}>
              {absencesPerc}%
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Ausências</p>
          </div>

      </div>
    </div>

    <div className='flex gap-10 flex-wrap justify-center'>
      <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
        <div className='flex justify-between'>
          <p className="font-semibold text-xl">Consumo/Desperdício</p>
          <div className='flex items-center gap-4'>
          <p className='flex items-center gap-2 text-green-600 hover:drop-shadow-xl'>
              <span><GoPrimitiveDot/></span>
              <span>Confecionado</span>
            </p>
            <p className='flex items-center gap-2 text-red-600 hover:drop-shadow-xl'>
              <span><GoPrimitiveDot/></span>
              <span>Desperdício</span>
            </p>
            

          </div>
          
        </div>
        <div>
          <LineChart/>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Home