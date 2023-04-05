import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";
import { getRandomHexColor } from "../parametrosGlobales"
import Selector from '../components/selector';

export default function Modelos(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  const [ciudadesSelec, setCiudadesSelec] = useState(null) // array de objetos
  const [empresasSelec, setEmpresasSelec] = useState(null)

  const [dataGamaAlta, setDataGamaAlta] = useState(null)
  const [dataGamaMedia, setDataGamaMedia] = useState(null)
  const [dataGamaBaja, setDataGamaBaja] = useState(null)

  const [listaCiudades, setListaCiudades] = useState(null)
  const [listaEmpresas, setListaEmpresas] = useState(null)
  
  useEffect(() => {
    let _listaCiudades = [...new Set(registrosVentas.map(item => item.CON_NOM_CIUDAD_ALMACEN))].sort().map((item) => ({ ciudad: item }));
    let _listaEmpresas = [...new Set(registrosVentas.map(item => item.CON_NOM_EMPRESA))].sort().map((item) => ({ empresa: item }));
    setListaCiudades(_listaCiudades)
    setListaEmpresas(_listaEmpresas)
    estructurarData(registrosVentas)
  }, [])

  const onChangeEmpresas = (e) =>{
    setEmpresasSelec(e.value)
    let newRegistros = registrosVentas.filter(registro => registroIsOnArrayObj(registro, e.value, "empresa", "CON_NOM_EMPRESA"))
    ciudadesSelec? newRegistros = newRegistros.filter(registro => registroIsOnArrayObj(registro, ciudadesSelec, "ciudad", "CON_NOM_CIUDAD_ALMACEN")) : null
    estructurarData(newRegistros)
  }
  
  const onChangeCiudades = (e) =>{
    setCiudadesSelec(e.value)
    let newRegistros = registrosVentas.filter(registro => registroIsOnArrayObj(registro, e.value, "ciudad", "CON_NOM_CIUDAD_ALMACEN"))
    empresasSelec? newRegistros = newRegistros.filter(registro => registroIsOnArrayObj(registro, empresasSelec, "empresa", "CON_NOM_EMPRESA")):null
    estructurarData(newRegistros)
  }
  
  const registroIsOnArrayObj = (registro, arrayObj, fieldItem, fieldArray) => {
    let result = arrayObj.findIndex(item => item[fieldItem] === registro[fieldArray]) === -1 ? false : true
    return result
  }

  const gamaAlta = ["PALISADE", "TUCSON NX4", "EX10", "STARIA", "KONA"]
  const gamaMedia = ["VENUE", "HD78", "IONIQ HEV", "HD65", "GRAND METRO TAXI", "HB20", "HB20S"]
  const gamaBaja = ["HB20S EDICION ACCENT", "HB20 EDICION GETZ"]


  const estructurarData = (registros) => {
    let modelosGamaAlta = {}
    let modelosGamaMedia = {}
    let modelosGamaBaja = {}
    // ventas por modelo separados en gamas
    for (let i = 0; i < registros.length; i++) {
      let modeloRegistro = registros[i]["CON_NOM_MODELO"];
      if (gamaAlta.includes(modeloRegistro)){
        modelosGamaAlta[modeloRegistro] = modelosGamaAlta[modeloRegistro] ? modelosGamaAlta[modeloRegistro] + 1 : 1;
      }else if(gamaMedia.includes(modeloRegistro)){
        modelosGamaMedia[modeloRegistro] = modelosGamaMedia[modeloRegistro] ? modelosGamaMedia[modeloRegistro] + 1 : 1;
      }else{
        modelosGamaBaja[modeloRegistro] = modelosGamaBaja[modeloRegistro] ? modelosGamaBaja[modeloRegistro] + 1 : 1;
      }
    }
  
    let arrayModelosGamaAlta = [] 
    let arrayVentasGamaAlta = []
    for (const [modelo, ventas] of Object.entries(modelosGamaAlta)) {
      arrayModelosGamaAlta.push(modelo)
      arrayVentasGamaAlta.push(ventas)
    }
  
    let arrayModelosGamaMedia = [] 
    let arrayVentasGamaMedia = []
    for (const [modelo, ventas] of Object.entries(modelosGamaMedia)) {
      arrayModelosGamaMedia.push(modelo)
      arrayVentasGamaMedia.push(ventas)
    }
  
    let arrayModelosGamaBaja = [] 
    let arrayVentasGamaBaja = []
    for (const [modelo, ventas] of Object.entries(modelosGamaBaja)) {
      arrayModelosGamaBaja.push(modelo)
      arrayVentasGamaBaja.push(ventas)
    }
  
    const _dataGamaAlta = {
      labels: arrayModelosGamaAlta,
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: getRandomHexColor(),
          data: arrayVentasGamaAlta
        }
      ]
    };
  
    const _dataGamaMedia = {
      labels: arrayModelosGamaMedia,
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: getRandomHexColor(),
          data: arrayVentasGamaMedia
        }
      ]
    };
  
    const _dataGamaBaja = {
      labels: arrayModelosGamaBaja,
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor:  getRandomHexColor(),
          data: arrayVentasGamaBaja
        }
      ]
    };

    setDataGamaAlta(_dataGamaAlta)
    setDataGamaMedia(_dataGamaMedia)
    setDataGamaBaja(_dataGamaBaja)
  }
  

  const optionsBarChart = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: "black"
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "black"
        },
        grid: {
          color: "#0f0d142e"
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: "black"
        },
        grid: {
          color: "#0f0d142e"
        }
      }
    }
  };



  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <div className="card flex justify-content-center">
            <Selector
              ciudadesSelec={ciudadesSelec}
              listaCiudades={listaCiudades} 
              onChangeCiudades={onChangeCiudades}
              empresasSelec={empresasSelec}
              listaEmpresas={listaEmpresas}
              onChangeEmpresas={onChangeEmpresas}/>
          </div>
        </div>
        <div className="col-6">

          <h3>Gama Alta</h3>
          <div className="card">
            <Chart type="bar" data={dataGamaAlta} options={optionsBarChart} />
          </div>
          <h3>Gama Baja</h3>
          <div className="card">
            <Chart type="bar" data={dataGamaBaja} options={optionsBarChart} />
          </div> 
        </div>
        <div className="col-6">
          <h3>Gama Media</h3>
          <div className="card">
            <Chart type="bar" data={dataGamaMedia} options={optionsBarChart} />
          </div>
          {/* <div className="card">
            <Chart type="line" data={data} options={options} />
          </div> */}
          {/* <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div> */}
        </div>
      </div>
    </>
  )
}