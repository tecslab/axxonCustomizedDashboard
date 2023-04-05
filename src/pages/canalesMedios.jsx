import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";
import { getRandomHexColor } from "../parametrosGlobales"
import Selector from '../components/selector';

export default function CanalesMedios(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  const [datasetsCanales, setDatasetsCanales] = useState([])
  const [ciudadesSelec, setCiudadesSelec] = useState(null) // array de objetos
  const [empresasSelec, setEmpresasSelec] = useState(null)

  const [listaCiudades, setListaCiudades] = useState(null)
  const [listaEmpresas, setListaEmpresas] = useState(null)

  useEffect(() => {
    let _listaCiudades = [...new Set(registrosVentas.map(item => item.CON_NOM_CIUDAD_ALMACEN))].sort().map((item) => ({ ciudad: item }));
    let _listaEmpresas = [...new Set(registrosVentas.map(item => item.CON_NOM_EMPRESA))].sort().map((item) => ({ empresa: item }));
    setListaCiudades(_listaCiudades)
    setListaEmpresas(_listaEmpresas)
    estructurarData(registrosVentas)
  },[])

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
  
  const estructurarData = (registros) => {
    const listaCanales = [...new Set(registros.map(item => item.CON_NOM_CANAL))];
    const listaMedios = [...new Set(registros.map(item => item.CON_NOM_MEDIO))].sort()

    let arrayCanalesMedios = []
    // {canal, medios: {}}
    for (let i = 0; i < listaCanales.length; i++) {
      let registrosCanal = registros.filter(registro => registro.CON_NOM_CANAL===listaCanales[i])
  
      let mediosXCanal = {};
      for (let j = 0; j < registrosCanal.length; j++) {
        let medio = registrosCanal[j]["CON_NOM_MEDIO"];
        mediosXCanal[medio] = mediosXCanal[medio] ? mediosXCanal[medio] + 1 : 1;
      }
      let objetoCanalMedios = {canal: listaCanales[i], medios: mediosXCanal}
      arrayCanalesMedios.push(objetoCanalMedios)
    }
  
    let arrayDatasetsMedios = [] // Separa las ventas de cada medio en un array distinto. Las columnas serían las ventas por canal
    for (let i = 0; i <listaMedios.length; i++) {
      let arrayMedio = []
      for (let j = 0; j < arrayCanalesMedios.length; j++){
        let ventasMedio = arrayCanalesMedios[j]["medios"][listaMedios[i]] ? arrayCanalesMedios[j]["medios"][listaMedios[i]] : 0
        arrayMedio.push(ventasMedio)
      }
      arrayDatasetsMedios.push(arrayMedio)
    }
  
    let datasetsMedios = []
  
    for (let i = 0; i < listaMedios.length; i++){
      let dataset = {
        label: listaMedios[i],
        backgroundColor: getRandomHexColor(),
        borderColor: "black",
        data: arrayDatasetsMedios[i]
      }
      datasetsMedios.push(dataset)
    }
  
    const dataVentasXCanalStacked = {    
      labels: listaCanales,
      datasets: datasetsMedios
    }

    setDatasetsCanales(dataVentasXCanalStacked)
  }


  const optionsVentasXCanalStacked = {
    indexAxis: 'y',
      maintainAspectRatio: true,
      aspectRatio: 1.8,
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
          <div className="card">
          <Chart type="bar" data={datasetsCanales} options={optionsVentasXCanalStacked} />
          </div>          
        </div>
        <div className="col-6">

          {/* <div className="card">
            <Chart type="bar" data={dataVentasXCanal} options={options2} />
          </div> */}
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