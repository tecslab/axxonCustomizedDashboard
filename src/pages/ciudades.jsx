import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";
import { getRandomHexColor } from "../parametrosGlobales"
//import Selector from '../components/selector';

export default function Modelos(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  //const [ciudadesSelec, setCiudadesSelec] = useState(null) // array de objetos
  //const [empresasSelec, setEmpresasSelec] = useState(null)

  const [dataGamaAlta, setDataGamaAlta] = useState(null)
  const [dataGamaMedia, setDataGamaMedia] = useState(null)
  const [dataGamaBaja, setDataGamaBaja] = useState(null)
  const [datasetsCiudades, setDatasetsCiudades] = useState([])

  //const [listaCiudades, setListaCiudades] = useState(null)
  //const [listaEmpresas, setListaEmpresas] = useState(null)

  

}