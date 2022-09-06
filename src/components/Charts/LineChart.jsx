import React from 'react'
import { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries ,Inject, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import api from "../../components/api";

const LineChart = () => {

  const [data, setData] = useState();

  useEffect( async () => {
    await api.get("daydata/").then(function (response) {
      setData(response.data);
      console.log(response.data);
    })
  }, []);

  console.log("ola" + data)
  //const dataGraph = [ ];

  

  return (
    <ChartComponent>
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>

      <SeriesCollectionDirective>

      
      </SeriesCollectionDirective>

    </ChartComponent>
  )
}

export default LineChart