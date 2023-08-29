import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { genDataBarStacked, genDataLine, dateInFormat,
    UTCTransform, parseDate } from "../parametrosGlobales"
let {detectionStartTime, detectionFinishTime} = parametrosGlobales
import parametrosGlobales from "../parametrosGlobales"
import { RestAPI } from "../utilities/restAPI"

export default function Visitantes(props) {
  const restAPI = new RestAPI();
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [day1FacesCount, setDay1FacesCount] = useState(null)
  const [day2FacesCount, setDay2FacesCount] = useState(null)
  const [currentVisitors, setCurrentVisitors] = useState(0)
  const [visitorsEvents1, setVisitorsEvents1] = useState({peopleIn:[], peopleOut:[]})
  const [visitorsEvents2, setVisitorsEvents2] = useState({peopleIn:[], peopleOut:[]})
  const [dataLineChartVisitors, setDataLineChartVisitors] = useState({
    labels: ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"],
    datasets: []
  });

  const getIntervalDate = (date) =>{
    // date processing adapt to the server format and utc
    let initDate = new Date(date)
    initDate.setHours(detectionStartTime.substring(0, 2))
    initDate.setMinutes(detectionStartTime.substring(2, 4))
    let formattedInitDate = dateInFormat(UTCTransform({type: "toUTC0", date: initDate}))

    let finishDate = new Date(date)
    finishDate.setHours(detectionFinishTime.substring(0, 2))
    finishDate.setMinutes(detectionFinishTime.substring(2, 4))
    let formattedFinishDate = dateInFormat(UTCTransform({type: "toUTC0", date: finishDate}))

    return {formattedInitDate, formattedFinishDate}
  }

  const onChangeDate1 = (e) =>{
    setDate1(e.value)
    const intervalDate = getIntervalDate(e.value)
    const initDate = intervalDate.formattedInitDate
    const finishDate = intervalDate.formattedFinishDate

    restAPI.getPeopleIn({initDate, finishDate})
    .then(data => {
      let peopleIn = dataToStdFormat(data.events)
      restAPI.getPeopleOut({initDate, finishDate})
        .then(data => {
        let peopleOut = dataToStdFormat(data.events)
        setVisitorsEvents1({peopleIn, peopleOut})
        let visitorsTimeLine = getVisitors(mergeInTimeLine(peopleIn, peopleOut))
        setDataLineChartVisitors(estructurarData(visitorsTimeLine, 1))
      })
    })

    restAPI.getFaces({initDate, finishDate})
    .then(data=>{
      let facesEvents = dataToStdFormat(data.events)
      let facesMap = getFacesCount(facesEvents)      
      setDay1FacesCount(facesMap.size)
    })
  }

  const onChangeDate2 = (e) =>{
    setDate2(e.value)
    const intervalDate = getIntervalDate(e.value)
    const initDate = intervalDate.formattedInitDate
    const finishDate = intervalDate.formattedFinishDate

    restAPI.getPeopleIn({initDate, finishDate})
    .then(data => {
      let peopleIn = dataToStdFormat(data.events)
      restAPI.getPeopleOut({initDate, finishDate})
        .then(data => {
        let peopleOut = dataToStdFormat(data.events)
        setVisitorsEvents2({peopleIn, peopleOut})
        let visitorsTimeLine = getVisitors(mergeInTimeLine(peopleIn, peopleOut))
        setDataLineChartVisitors(estructurarData(visitorsTimeLine, 2))
      })
    })

    restAPI.getFaces({initDate, finishDate})
    .then(data=>{
      let facesEvents = dataToStdFormat(data.events)
      let facesMap = getFacesCount(facesEvents)      
      setDay2FacesCount(facesMap.size)
    })
  }

  useEffect(() => {
    let today = new Date()
    setDate1(today)
    const intervalDate = getIntervalDate(today)
    const initDate = intervalDate.formattedInitDate
    const finishDate = intervalDate.formattedFinishDate

    restAPI.getPeopleIn({initDate, finishDate})
    .then(data => {
      console.log(data)
      let peopleIn = dataToStdFormat(data.events)
      restAPI.getPeopleOut({initDate, finishDate})
        .then(data => {
        console.log(data)
        let peopleOut = dataToStdFormat(data.events)
        setVisitorsEvents1({peopleIn, peopleOut})
        let visitorsTimeLine = getVisitors(mergeInTimeLine(peopleIn, peopleOut))
        setCurrentVisitors(visitorsTimeLine[visitorsTimeLine.length-1]["visitors"])
        setDataLineChartVisitors(estructurarData(visitorsTimeLine, 1))
      })
    })

    restAPI.getFaces({initDate, finishDate})
    .then(data=>{
      console.log(data)
      let facesEvents = dataToStdFormat(data.events)
      let facesMap = getFacesCount(facesEvents)      
      setDay1FacesCount(facesMap.size)
    })
  },[])

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
        let inLower = nextEvent1.timestamp < nextEvent2.timestamp ? true : false;

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

  const dataToStdFormat = (eventsArray) =>{
    // transform the events array data to standar format (date)
    eventsArray.forEach(_event=>{
      _event.timestamp = UTCTransform({type: "toCurrentUTC", date: parseDate(_event.timestamp)})      
    })
    return eventsArray
  }

  const getVisitors = (eventsTimeline) => {
    //get the visitors timeline
    let visitorsTimeLine = [{hora: detectionStartTime.substring(0, 2), visitors: 0}]
    for (let i=0; i<eventsTimeline.length; i++){
      let hora = eventsTimeline[i]["timestamp"].getHours().toString().padStart(2, '0'); // para tomar solo la hora
      let currentVisitorsCount = visitorsTimeLine[visitorsTimeLine.length-1]["visitors"] // última cuenta de visitantes
      eventsTimeline[i].type==="PeopleIn"?currentVisitorsCount++:currentVisitorsCount--
      visitorsTimeLine.push({hora: hora, visitors: currentVisitorsCount})
    }
    return visitorsTimeLine
  }

  const estructurarData = (visitorsTimeLine, dateIndex) => {
    // dateIndex gives information about what date source was changed
    // out: Max visitors registered in an interval. If there are no registers in some interval it keeps the last register.
    // [{interval: "06", visitors: 1}, {interval: "07", visitors: 3}, ... ]
    const intervals = ['09H00', '10H00', '11H00', '12H00', '13H00', '14H00', '15H00', '16H00', '17H00', '18H00', '19H00', '20H00', '21H00']
    // {label1: valueLabel1, label2: valueLabel2 ....}
    let lastVisitors = visitorsTimeLine[0].visitors // it is needed to give the count of visitors when there are not registers from this interval
    let intervalVisitorsData = []
    for (let interval of intervals){
      // filter all register in each interval
      //let maxVisitorsObject = null;
      let maxVisitorsValue = 0
      let registrosIntervalo = visitorsTimeLine.filter(registro => registro.hora === interval.substring(0, 2))
      
      if (registrosIntervalo.length === 0) {
        //maxVisitorsObject = { interval: interval, visitors: lastVisitors }
        maxVisitorsValue = lastVisitors
      }else{
        lastVisitors = registrosIntervalo[registrosIntervalo.length-1].visitors
        let maxVisitors = -Infinity;
        
        for (const registro of registrosIntervalo) {
          const visitors = registro.visitors;
          if (visitors > maxVisitors) {
            maxVisitors = visitors;
          }
        }
        // maxVisitorsObject = { interval: interval, visitors: maxVisitors };
        maxVisitorsValue = maxVisitors
      }
      //intervalVisitorsData.push(maxVisitorsObject)
      intervalVisitorsData.push(maxVisitorsValue)
    }

    let { datasets } = dataLineChartVisitors
    datasets[dateIndex-1]= {
      label: 'Día ' + dateIndex.toString(),
      data: intervalVisitorsData,
      fill: false,
      borderColor: dateIndex-1===0?"blue":"red",
      tension: 0.4
    }

    const data ={
      labels: intervals,
      datasets: datasets
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

  const getFacesCount = (facesEvents) =>{
    let facesMap = new Map()
    facesEvents.forEach(faceEvent =>{
      let faceId = faceEvent.rectangles[0]["index"]
      let existingFace = facesMap.get(faceId)
      if (existingFace){
        let newCount = existingFace.seenCounter++
        facesMap.set(faceId, {seenCounter: newCount})
      }else{
        let faceObj = {seenCounter: 0}
        facesMap.set(faceId, faceObj)
      }
    })
    return (facesMap)
  }

  const getDateString = (date) =>{
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const dateString = `${day}/${month}/${year}`;
    return dateString;
  }
  
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <div className="card flex justify-content-center">
            <h1>Visitantes máximos por hora</h1>
          </div>
        </div>
        <div className="col-6">
          <div className="card flex justify-content-center">
            <Calendar value={date1} onChange={(e) => onChangeDate1(e)} showIcon />
          </div>
        </div>
        <div className="col-6">
          <div className="card flex justify-content-center">
            <Calendar value={date2} onChange={(e) => onChangeDate2(e)} showIcon />
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <Chart type="line" data={dataLineChartVisitors} options={options} />
          </div>
        </div>

        <div className="col-12">
          <span>Visitantes Actuales: </span>
          <span>{currentVisitors}</span>
        </div>

        <div className="col-6">
          <div className="card flex justify-content-center">
            <h2>{date1?getDateString(date1):"Día 1"}</h2>
            <span>Cantidad de rostros: </span>
            <span>{day1FacesCount}</span>
            <br/>
            <span>Eventos In: </span>
            <span>{visitorsEvents1.peopleIn.length}</span>
            <br/>
            <span>Eventos Out: </span>
            <span>{visitorsEvents1.peopleOut.length}</span>
          </div>
        </div>

        <div className="col-6">
          <div className="card flex justify-content-center">
            <h2>{date2?getDateString(date2):"Día 2"}</h2>
            <span>Cantidad de rostros: </span>
            <span>{day2FacesCount}</span>
            <br/>
            <span>Eventos In: </span>
            <span>{visitorsEvents2.peopleIn.length}</span>
            <br/>
            <span>Eventos Out: </span>
            <span>{visitorsEvents2.peopleOut.length}</span>
          </div>
        </div>
          
      </div>
    </>
  )
}