import parametrosGlobales from "../parametrosGlobales"
let {axxonOneServer, axxonOnePort, prefix, user,
   password, vEntranceCamera} =  parametrosGlobales

export class RestAPI {
  // Needs dates on UTC0

  async getPeopleIn({initDate, finishDate}){
    try{
      let baseURI = "http://" + axxonOneServer + ":" + axxonOnePort + prefix
      let uriPeopleIn = baseURI + 'archive/events/detectors' + vEntranceCamera + initDate + "/" + finishDate + "?type=PeopleIn&limit=1200"
      console.log(uriPeopleIn)
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
      console.log("here")
      console.log(uriPeopleIn)
      let rawData = await fetch(uriPeopleIn, {headers})
      console.log(rawData.status)
      const jsonData = await rawData.json();
      console.log(jsonData)
      return jsonData
      //return fetch("http://127.0.0.1:82/video-origins", {headers})
    }catch(error){
      console.log("Error en fetch PeopleIn: ", error)
    }
  }

  getPeopleOut({initDate, finishDate}){
    let baseURI = "http://" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriPeopleOut = baseURI + 'archive/events/detectors' + vEntranceCamera + initDate + "/" + finishDate + "?type=PeopleOut&limit=1200"
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
    console.log(uriPeopleOut)
    return fetch(uriPeopleOut, {headers})
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /archive/events/detectors PeopleOut');
        console.log(e)
      })
  }

  getFaces({initDate, finishDate}){
    let baseURI = "http://" + axxonOneServer + ":" + axxonOnePort + prefix
    let uriFaceAppeared = baseURI + 'archive/events/detectors/'+ initDate + "/" + finishDate + "?type=faceAppeared&limit=1200"
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
    return fetch(uriFaceAppeared, {headers})
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: ' + uriFaceAppeared);
        console.log(e)
      })
  }


}