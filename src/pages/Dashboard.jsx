import React, { useState, useEffect } from 'react'
import Menu from '../components/menu';
import { Link, Outlet } from "react-router-dom";
import { RestAPI } from "../utilities/restAPI"
import Loader from '../components/loader';

function DashBoard() {
  const restAPI = new RestAPI();
  const [registrosVentas, setRegistrosVentas] = useState(null)

  useEffect(()=>{
    restAPI.getRegistrosVentas()
    .then(data => {
      setRegistrosVentas(data)
    })
  },[])

  return (
  <div className="container-fluid editor">
    <div className="row">
      <div className="col-2">
        <Menu />
      </div>
      <div className="col-10">
        {registrosVentas?
          <Outlet context={[registrosVentas, setRegistrosVentas]}/>
          :
          <Loader />
        }
      </div>
    </div>
  </div>
);
}

export default DashBoard
