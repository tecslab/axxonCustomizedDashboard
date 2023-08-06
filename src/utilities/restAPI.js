import parametrosGlobales from "../parametrosGlobales"
let urlBack =  parametrosGlobales.urlBack;

export class RestAPI {

  postRegistrosVentas(registro) {
    
    return fetch(urlBack + '/registrosVentas',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registro)
    }).then(res => res.json())
    .catch(e => {
      console.log('Error fetch en la ruta post: /registrosVentas');
      console.log(e)
    })
  }

  patchRegistrosVentas(registro, id){
    return fetch(urlBack + '/registrosVentas/' + id,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registro)
    }).then(res => res.json())
    .catch(e => {
      console.log('Error fetch en la ruta patch: /registrosVentas');
      console.log(e)
    })
  }

  deleteRegistrosVentas(id){
    return fetch(urlBack + '/registrosVentas/' + id,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(e => {
      console.log('Error fetch en la ruta delete: /registrosVentas');
      console.log(e)
    })
  }

  getRegistrosVentas() {
    return fetch(urlBack + '/registrosVentas')
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /registrosVentas');
        console.log(e)
      })
  }

  getRegistroVentas(id){ 
    return fetch(urlBack + '/registrosVentas/'+ id)
      .then(res => res.json())
      .catch(e => {
        console.log('Error fetch en la ruta: /registrosVentas');
        console.log(e)
      })
  }
}