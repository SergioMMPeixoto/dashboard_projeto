import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries ,Inject, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import api from "../../components/api";






const LineChart = () => {

  const [apidata, setApiData] = useState([]);
  const [waste, setWaste] = useState([]);
  const [date, setDate] = useState([]);
  const [consumption, setConsumption] = useState([]);

  //Ia fazer um for each mas nao vale a pena porquue o grafico vai sempre mostrar 7 dias, nem que os iniciais sejam 0 o que se pode fazer é mesmo verificar se esse numero é != 0 para nao arrebentar

  
  useEffect(() => {
    api.get("/daydata/")
       .then((response) => {
         console.log(response.data);
         for (let i = 0; i < 7; i++){
          setWaste(waste => [...waste, response.data[i].foodWasted])
          setDate(date => [...date, response.data[i].date])
          setConsumption(consumption => [...consumption, response.data[i].foodConsumed])
         }
         setApiData(response.data)
      })
      .catch((err) => {
        console.error("Erro : " + err);
      });
  }, []);

  

  
  
  const chartData = [[
    {x: new Date(date[6]), y: waste[6]},
    {x: new Date(date[5]), y: waste[5]},
    {x: new Date(date[4]), y: waste[4]},
    {x: new Date(date[3]), y: waste[3]},
    {x: new Date(date[2]), y: waste[2]},
    {x: new Date(date[1]), y: waste[1]},
    {x: new Date(date[0]), y: waste[0]},
  ],
  [
    {x: new Date(date[6]), y: consumption[6]},
    {x: new Date(date[5]), y: consumption[5]},
    {x: new Date(date[4]), y: consumption[4]},
    {x: new Date(date[3]), y: consumption[3]},
    {x: new Date(date[2]), y: consumption[2]},
    {x: new Date(date[1]), y: consumption[1]},
    {x: new Date(date[0]), y: consumption[0]},
  ],
];

const customSeries = [
  { dataSource: chartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Desperdício',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },
  { dataSource: chartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Consumo',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },
];

  const xAxis = {
    valueType: 'DateTime',
    labelFormat: 'd',
    intervalType: 'Days',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    background: 'white',
  }

  const yAxis = {
    labelFormat: '{value}Kg',
    rangePadding: 'None',
    minimum: 0,
    interval: 50,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  return (
    <ChartComponent
    id = "line-chart"
    primaryXAxis={xAxis}
    primaryYAxis={yAxis}
    chartArea={{ border: {width: 0}}}
    tooltip={{enable:true}}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]}/>

      <SeriesCollectionDirective> 
        {customSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>

    </ChartComponent>
  )
}

export default LineChart