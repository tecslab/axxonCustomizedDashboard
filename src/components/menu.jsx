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
          label:'Leads',
          icon:'pi pi-fw pi-stop',
          command: () => {
            navigate("/dashboard/leads");
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