import React from 'react'
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const items = [
    {
      label:'Dashboard',
      icon:'pi pi-fw pi-chart-bar',
      items:[
        {
          label:'Visitantes',
          icon:'pi pi-fw pi-users',
          command: () => {
            navigate("/dashboard/visitantes");
          }
        }
      ]
    },
    /* {
      label:'Reportes Excel',
      icon:'pi pi-fw pi-file-export',
      items:[
        {
          label:'Visitantes',
          icon:'pi pi-fw pi-users',
          command: () => {
            navigate("/dashboard/visitantes");
          }
        }
      ]
    } */

  ];

  return (  
    <PanelMenu model={items} />
  );
}

export default Menu