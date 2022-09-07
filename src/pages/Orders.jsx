import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search, Toolbar, Selection} from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import api from '../components/api';
import { Delete } from '@syncfusion/ej2/spreadsheet';

function teste(args){
  let dataChanged = args.data;

  console.log(args)
  //console.log(dataChanged)

  if(args.action === 'edit'){
    api.put("/orders/" + dataChanged.id + '/', dataChanged);
  }else if(args.action === 'add'){
    if(dataChanged.status === 'Caminho'){
      dataChanged.statusBg = '#FEC90F';
    }else if(dataChanged.status === 'Cancelada'){
      dataChanged.statusBg = 'red';
    }else if(dataChanged.status === 'Completa'){
      dataChanged.statusBg = '#8BE78B';
    }
    api.post("/orders/" , dataChanged);
  }else if(args.requestType === 'delete'){
    api.delete("/orders/" + args.data[0].id + '/');
  }

}


const Orders = () => {

  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    api.get("/orders/")
       .then((response) => {
         //response.data.forEach(element => {
         //});
         setApiData(response.data)
      })
      .catch((err) => {
        console.error("Erro : " + err);
      });

  }, []);

  const gridOrderStatus = (props) => (
    <button
      type="button"
      style={{ background: props.statusBg }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.status}
    </button>
  );

  const gridOrderImage = (props) => (
    <div>
      <img
        className="rounded-xl h-20 md:ml-3"
        src={`../assets/${props.image}.png`}
        alt="Imagem"
      />
    </div>
  );

  const ordersGrid = [
    {
      headerText: 'Imagem',
      field:'image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'item',
      headerText: 'Alimento',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    { field: 'suplier',
      headerText: 'Fornecedor',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'ammount',
      headerText: 'Quantidade',
      format: "####.##' Kg'",
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      headerText: 'Estado',
      template: gridOrderStatus,
      field: 'status',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'orderID',
      headerText: 'Código',
      width: '120',
      textAlign: 'Center',
    },
  ];

  const toolbarOptions = ['Delete', 'Add', 'Search'];
  //const selectionsettings = { persistSelection: true };
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true};

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Cantina" title="Encomendas"></Header>

      <GridComponent id="gridcomp"
      dataSource={apidata}
      allowPaging
      pageSettings={{ pageCount: 10 }}
      //selectionSettings={selectionsettings}
      toolbar={toolbarOptions}
      editSettings={editing}
      allowSorting
      actionComplete={(args) => teste(args)}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (<ColumnDirective key={index} {...item} />))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Orders