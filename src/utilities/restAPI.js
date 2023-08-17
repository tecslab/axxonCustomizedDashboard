import parametrosGlobales from "../parametrosGlobales"
let {axxonOneServer, axxonOnePort, prefix, user, password} =  parametrosGlobales

export class RestAPI {

  getPeopleIn(initDate, finishDate){
    let baseURI = "http://" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriPeopleIn = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate + "?type=PeopleIn"
    console.log(uriPeopleIn)
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa('root:root'));
    return fetch(uriPeopleIn, {headers})
    //return fetch("http://127.0.0.1:82/video-origins", {headers})
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: ' + uriPeopleIn);
        console.log(e)
      })
  }

  getPeopleOut(initDate, finishDate){
    let baseURI = "http://" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriPeopleOut = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate + "?type=PeopleOut"
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa('root:root'));
    console.log(uriPeopleOut)
    return fetch(uriPeopleOut, {headers})
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /archive/events/detectors PeopleOut');
        console.log(e)
      })
  }
}