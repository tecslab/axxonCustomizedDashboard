import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { genDataBarStacked, genDataLine, dateInFormat } from "../parametrosGlobales"
import { RestAPI } from "../utilities/restAPI"

export default function Visitantes(props) {
  const restAPI = new RestAPI();
  const [date1, setDate1] = useState(null);
  const [dataVisitors, setDataVisitors] = useState([]);

  const onChangeDate1 = (e) =>{
    setDate1(e.value)
    console.log(dateInFormat(e.value))
    let formattedDate = dateInFormat(e.value)
    let initDate = formattedDate.substring(0, 8) + 'T060000'
    let finishDate = formattedDate.substring(0, 8) + 'T180000'

    restAPI.getPeopleIn(initDate, finishDate)
    .then(data => {
      setPeopleIn(data.events)
      let _peopleIn = data.events
      restAPI.getPeopleOut(initDate, finishDate)
        .then(data => {
        setPeopleOut(data.events)
        let _peopleOut = data.events

        let visitorsTimeLine = getVisitors(mergeInTimeLine(_peopleIn, _peopleOut))
        setVisitors(visitorsTimeLine)
      })
    })
  }

  const mergeInTimeLine = (eventsArray1, eventsArray2) =>{
    // merge 2 array of events in one ordered Time line array
    let eventsTimeLine = []
    let indexEvents1 = 0
    let indexEvents2 = 0
    let condition = (indexEvents1<eventsArray1.length) && (indexEvents2<eventsArray2.length)
    if (condition){
      while (condition){
        let nextEvent1 = eventsArray1[indexEvents1]
        let nextEvent2 = eventsArray2[indexEvents2]
        let inLower = isTheFirstTimestampLower(nextEvent1.timestamp, nextEvent2.timestamp)

        if (inLower){
          eventsTimeLine.push(nextEvent1)
          indexEvents1 ++
          if (indexEvents1>=eventsArray1.length){
            condition = false
            eventsTimeLine.push(...eventsArray2.slice(indexEvents2))
          }
        }else{
          eventsTimeLine.push(nextEvent2)
          indexEvents2 ++
          if (indexEvents2>=eventsArray2.length){
            condition = false
            eventsTimeLine.push(...eventsArray1.slice(indexEvents1))
          }
        }
      }
    }else{
      eventsTimeLine = [...eventsArray1, ...eventsArray2]
    }

    return eventsTimeLine
  }
  
  const isTheFirstTimestampLower = (timestamp1, timestamp2) =>{
    // anser if the first of 2 events has the lower timestamp
    const date1 = parseDate(timestamp1);
    const date2 = parseDate(timestamp2);
  
    if (isNaN(date1) || isNaN(date2)) {
      return "Invalid date format";
    } 
    return date1 < date2 ? true : false;
  }

  const getVisitors = (eventsTimeline) => {
    //get the visitors timeline
    let visitorsTimeLine = [{hora: "06", visitors: 0}]
    for (let i=0; i<eventsTimeLine.length; i++){
      let hora = eventsTimeLine[i]["timestamp"].slice(9,11); // para tomar solo la hora
      let currentVisitorsCount = visitorsTimeLine[visitorsTimeLine.length-1]["visitors"] // última cuenta de visitantes
      eventsTimeLine[i].type==="PeopleIn"?visitorsTimeLine.push({hora: hora, visitors: currentVisitorsCount++}):visitorsTimeLine.push({hora: hora, visitors: currentVisitorsCount--})
    }
    return visitorsTimeLine
  }


  const parseDate = (dateString) =>{
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = parseInt(dateString.substring(6, 8), 10);
    const hours = parseInt(dateString.substring(9, 11), 10);
    const minutes = parseInt(dateString.substring(11, 13), 10);
    const seconds = parseInt(dateString.substring(13, 15), 10);
  
    return new Date(year, month, day, hours, minutes, seconds);
  }

  const estructurarData = (registros) => {
    const labelsValueObj = {}
    // {label1: valueLabel1, label2: valueLabel2 ....}
    // Cuenta cuantos eventos han acontecido(eje y) por cada una de las etiquetas(eje x)
    for (let i = 0; i < registros.length; i++) {
      let label = registros[i]["hora"]
      labelsValueObj[label] = labelsValueObj[label] ? labelsValueObj[label] + 1 : 1;
    }

    //Split in 2 array labels and their respective values
    let arrayLabels = []
    let arrayValues = []
    for (const [label, value] of Object.entries(labelsValueObj)) {
      arrayLabels.push(label)
      arrayValues.push(value)
    }

    const data ={
      labels: arrayLabels,
      datasets: [
        {
          label: 'Día1',
          data: arrayValues,
          fill: false,
          borderColor: "blue",
          tension: 0.4
        }
      ]
    }
    return data
  }

  const options = {
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
          color: "black"
        }
      },
      y: {
        ticks: {
          color: "black"
        },
        grid: {
          color: "black"
        }
      }
    }
  };

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
        <div className="col-12">
          <div className="card">
            <Chart type="line" data={estructurarData([])} options={options} />
          </div>
        </div>
          
      </div>
    </>
  )
}