import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart';
import { useOutletContext } from "react-router-dom";


function getRandomHexColor() {
  const baseColor = 40; // 240 is a bright shade of grey, which gives a clear color
  const randomColor1 = Math.floor(Math.random() * 16).toString(16);
  const randomColor2 = Math.floor(Math.random() * 16).toString(16);
  const randomColor3 = Math.floor(Math.random() * 16).toString(16);
  const randomColor4 = Math.floor(Math.random() * 16).toString(16);
  return '#' + randomColor1 + randomColor2 + randomColor3 + baseColor.toString(16) + randomColor4;
}

export default function CanalesMedios(props) {
  const [registrosVentas, setRegistrosVentas] = useOutletContext();
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  const listaCanales = [...new Set(registrosVentas.map(item => item.CON_NOM_CANAL))];
  const listaMedios = [...new Set(registrosVentas.map(item => item.CON_NOM_MEDIO))]

  let arrayCanalesMedios = []
  // {canal, medios: {}}
  for (let i = 0; i < listaCanales.length; i++) {
    let registrosCanal = registrosVentas.filter(registro => registro.CON_NOM_CANAL===listaCanales[i])

    let mediosXCanal = {};
    for (let j = 0; j < registrosCanal.length; j++) {
      let medio = registrosCanal[j]["CON_NOM_MEDIO"];
      mediosXCanal[medio] = mediosXCanal[medio] ? mediosXCanal[medio] + 1 : 1;
    }
    let objetoCanalMedios = {canal: listaCanales[i], medios: mediosXCanal}
    arrayCanalesMedios.push(objetoCanalMedios)
  }

  let arrayDatasetsMedios = [] // Separa las ventas de cada medio en un array distinto. Las columnas serían las ventas por canal
  for (let i = 0; i <listaMedios.length; i++) {
    let arrayMedio = []
    for (let j = 0; j < arrayCanalesMedios.length; j++){
      let ventasMedio = arrayCanalesMedios[j]["medios"][listaMedios[i]] ? arrayCanalesMedios[j]["medios"][listaMedios[i]] : 0
      arrayMedio.push(ventasMedio)
    }
    arrayDatasetsMedios.push(arrayMedio)
  }

  let datasetsMedios = []

  for (let i = 0; i < listaMedios.length; i++){
    let dataset = {
      label: listaMedios[i],
      backgroundColor: getRandomHexColor(),
      borderColor: documentStyle.getPropertyValue('--blue-500'),
      data: arrayDatasetsMedios[i]
    }
    datasetsMedios.push(dataset)
  }

  const dataVentasXCanalStacked = {    
    labels: listaCanales,
    datasets: datasetsMedios
  }

  const optionsVentasXCanalStacked = {
    indexAxis: 'y',
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
              color: "black"
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "black"
          },
          grid: {
            color: "black"
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: "black"
          },
          grid: {
            color: "black"
          }
        }
      }
  };

  
  ////////////////////////////
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0, // de 0 a 1
        borderColor: documentStyle.getPropertyValue('--blue-500')
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderDash: [10, 10],
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue('--teal-500')
      },
      {
        label: 'Third Dataset',
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: documentStyle.getPropertyValue('--orange-500'),
        tension: 0.4,
        backgroundColor: 'rgba(255,167,38,0.2)'
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    plugins: {
      legend: {
        labels: {
          color: "black"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "black"
        },
        grid: {
          color: "black"
        }
      },
      y: {
        ticks: {
          color: "black"
        },
        grid: {
          color: "black"
        }
      }
    }
  };

  const options2 = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                fontColor: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary,
                font: {
                    weight: 500
                }
            },
            grid: {
                display: false,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
    }
  };
  ////////////////////////////







  




  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
          <Chart type="bar" data={dataVentasXCanalStacked} options={optionsVentasXCanalStacked} />
          </div>          
        </div>
        <div className="col-6">

          {/* <div className="card">
            <Chart type="bar" data={dataVentasXCanal} options={options2} />
          </div> */}
          <div className="card">
            <Chart type="line" data={data} options={options} />
          </div>
          {/* <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div> */}
        </div>
      </div>
    </>
  )
}