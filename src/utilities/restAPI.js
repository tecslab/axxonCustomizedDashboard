import parametrosGlobales from "../parametrosGlobales"
let {axxonOneServer, axxonOnePort, prefix, user, password} =  parametrosGlobales

export class RestAPI {

  getPeopleIn(initDate, finishDate){
    let baseURI = user + ":" + password + "@" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriPeopleIn = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate + "?type=PeopleIn"
    console.log(uriPeopleIn)
    return fetch(uriPeopleIn)
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /archive/events/detectors PeopleIn');
        console.log(e)
      })
  }

  getPeopleOut(initDate, finishDate){
    let baseURI = user + ":" + password + "@" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriPeopleOut = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate + "?type=PeopleOut"
    console.log(uriPeopleOut)
    return fetch(uriPeopleOut)
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /archive/events/detectors PeopleOut');
        console.log(e)
      })
  }
}