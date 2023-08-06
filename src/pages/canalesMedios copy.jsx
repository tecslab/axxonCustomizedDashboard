import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";
import { genDataBarStacked, genDataLine } from "../parametrosGlobales"
import Selector from '../components/selector';

export default function CanalesMedios(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  const [datasetsCanales, setDatasetsCanales] = useState([])
  const [ciudadesSelec, setCiudadesSelec] = useState(null) // array de objetos
  const [empresasSelec, setEmpresasSelec] = useState(null)

  const [listaCiudades, setListaCiudades] = useState(null)
  const [listaEmpresas, setListaEmpresas] = useState(null)

  const [dataTraficoSala, setDataTraficoSala] = useState(null)
  const [dataBD, setDataBD] = useState(null)
  const [dataLineaT, setDataLineaT] = useState(null)

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
    let dataVentasXCanalStacked = genDataBarStacked(registros, "CON_NOM_CANAL", "CON_NOM_MEDIO")
    setDatasetsCanales(dataVentasXCanalStacked)

    // data para lina telefonica, base de datos y trafico en sala
    let registrosTraficoSala = registros.filter(registro => registro.CON_NOM_CANAL === "TRAFICO EN SALA")
    let _dataTraficoSala = genDataLine(registrosTraficoSala, "CON_MES")
    setDataTraficoSala(_dataTraficoSala)

    let registrosBD = registros.filter(registro => registro.CON_NOM_CANAL === "BASE DE DATOS")
    let _dataBD = genDataLine(registrosBD, "CON_MES")
    setDataBD(_dataBD)

    let registrosLineaT = registros.filter(registro => registro.CON_NOM_CANAL === "LINEA TELEFONICA")
    let _dataLineaT = genDataLine(registrosLineaT, "CON_MES")
    setDataLineaT(_dataLineaT)
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

  const optionsLine = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: "black"
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: "black"
            },
            grid: {
                color: "#0f0d142e"
            }
        },
        y: {
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
        <div className="col-12">
          <h2>Concurrencia de los principales canales</h2>
        </div>
        <div className="col-4">
          <h3>Tráfico en Sala</h3>
          <div className="card">
            <Chart type="line" data={dataTraficoSala} options={optionsLine} />
          </div>
        </div>

        <div className="col-4">
          <h3>Base de datos</h3>
          <div className="card">
            <Chart type="line" data={dataBD} options={optionsLine} />
          </div>
        </div>

        <div className="col-4">
          <h3>Linea Telefónica</h3>
          <div className="card">
            <Chart type="line" data={dataLineaT} options={optionsLine} />
          </div>
        </div>
      </div>
    </>
  )
}