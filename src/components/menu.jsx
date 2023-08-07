import React from 'react'
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
          label:'Visitantes',
          icon:'pi pi-fw pi-filter',
          command: () => {
            navigate("/dashboard/visitantes");
          }
        }
      ]
    }
  ];

  return (  
    <PanelMenu model={items} />
  );
}

export default Menu