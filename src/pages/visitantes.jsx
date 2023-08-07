import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { genDataBarStacked, genDataLine, dateInFormat } from "../parametrosGlobales"

export default function Visitantes(props) {
  const [date1, setDate1] = useState(null);

  const onChangeDate1 = (e) =>{
    setDate1(e.value)
    console.log(dateInFormat(e.value))
  }

  useEffect(() => {
    
  },[])

  
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <div className="card flex justify-content-center">
            <Calendar value={date1} onChange={(e) => onChangeDate1(e)} showIcon />
          </div>
        </div>
          
      </div>
    </>
  )
}