import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";
import { genDataBarStacked, genDataLine } from "../parametrosGlobales"
import Selector from '../components/selector';

export default function Visitantes(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  

  useEffect(() => {
    
  },[])

  
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
        </div>
          
      </div>
    </>
  )
}