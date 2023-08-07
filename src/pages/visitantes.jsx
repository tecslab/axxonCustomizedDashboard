import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { genDataBarStacked, genDataLine, dateInFormat } from "../parametrosGlobales"
import { RestAPI } from "../utilities/restAPI"

export default function Visitantes(props) {
  const restAPI = new RestAPI();
  const [date1, setDate1] = useState(null);
  const [visitors, setVisitors] = useState(0);

  const onChangeDate1 = (e) =>{
    setDate1(e.value)
    console.log(dateInFormat(e.value))
    let formattedDate = dateInFormat(e.value)
    let initDate = formattedDate
    let finishDate = formattedDate.substring(0, 8) + 'T235959'

    restAPI.getVisitors(initDate, finishDate)
    .then(data => {
      setVisitors(data)
    })
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