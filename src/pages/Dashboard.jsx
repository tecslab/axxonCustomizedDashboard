import React, { useState, useEffect } from 'react'
import Menu from '../components/menu';
import { Link, Outlet } from "react-router-dom";
import { RestAPI } from "../utilities/restAPI"

function DashBoard() {
  const restAPI = new RestAPI();

  useEffect(()=>{
    restAPI.getRegistrosVentas()
    .then(data => {
      //console.log(data)
    })
  },[])

  return (
  <div className="container-fluid editor">
    <div className="row">
      <div className="col-2">
        <Menu />
      </div>
      <div className="col-10">
        <Outlet />
      </div>
    </div>
  </div>
);
}

export default DashBoard
