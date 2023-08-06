import parametrosGlobales from "../parametrosGlobales"
let {axxonOneServer, axxonOnePort, prefix, user, password} =  parametrosGlobales

export class RestAPI {

  getVisitors(initDate, finishDate){
    let baseURI = user + ":" + password + "@" + axxonOneServer + ":" + axxonOnePort + prefix
    let uri = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate
    console.log(uri)
    return fetch(uri)
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /archive/events/detectors');
        console.log(e)
      })
  }
  //http://127.0.0.1:82/archive/events/detectors/20230101T000000/20230801T000001
}