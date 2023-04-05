import React, { useState, useEffect } from 'react'
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const items = [
    {
      label:'Dashboard',
      icon:'pi pi-fw pi-map-marker',
      items:[
        {
          label:'Ventas Por Canal',
          icon:'pi pi-fw pi-filter',
          command: () => {
            navigate("/dashboard/canales");
          }
        },
        {
          label:'Modelos',
          icon:'pi pi-fw pi-palette',
          command: () => {
            navigate("/dashboard/modelos");
          }
        },
        {
          label:'Modelos',
          icon:'pi pi-fw pi-palette',
          command: () => {
            navigate("/dashboard/ciudades");
          }
        },
      ]
    }
  ];

  return (  
    <PanelMenu model={items} />
  );
}

export default Menu