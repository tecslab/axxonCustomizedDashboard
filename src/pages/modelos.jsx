import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";

export default function Modelos(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();

  const gamaAlta = ["PALISADE", "TUCSON NX4", "EX10", "STARIA", "KONA"]
  const gamaMedia = ["VENUE", "HD78", "IONIQ HEV", "HD65", "GRAND METRO TAXI", "HB20", "HB20S"]
  const gamaBaja = ["HB20S EDICION ACCENT", "HB20 EDICION GETZ"]

  let modelos = {}
  for (let i = 0; i < registrosVentas.length; i++) {
    let modeloRegistro = registrosVentas[i]["CON_NOM_MODELO"];
    modelos[modeloRegistro] = modelos[modeloRegistro] ? modelos[modeloRegistro] + 1 : 1;
  }


  let modelosGamaAlta = {}
  let modelosGamaMedia = {}
  let modelosGamaBaja = {}
  for (const [modelo, ventas] of Object.entries(modelos)) {
    if (gamaAlta.includes(modelo)){
      modelosGamaAlta[modelo] = ventas
    }else if(gamaMedia.includes(modelo)){
      modelosGamaMedia[modelo] = ventas
    }else{
      modelosGamaBaja[modelo] = ventas
    }
  }

  console.log(modelosGamaAlta)
  console.log(modelosGamaMedia)
  console.log(modelosGamaBaja)


  let arrayModelos = []
  let arrayVentas = []

  for (const [modelo, ventas] of Object.entries(modelos)) {
    arrayModelos.push(modelo)
    arrayVentas.push(ventas)
  }

  //console.log(arrayModelos)
  //console.log(arrayVentas)

  return (
    <>
      <div className="row">
        <div className="col-6">
          {/* <div className="card">
            <Chart type="bar" data={dataVentasXCanalStacked} options={optionsVentasXCanalStacked} />
          </div>   */}        
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