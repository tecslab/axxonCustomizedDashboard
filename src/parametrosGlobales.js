let parametrosGlobales = {
  //urlBack: "http://localhost:3000",
  axxonOneServer: "127.0.0.1",
  axxonOnePort: "82",
  prefix:"/",
  user: "root",
  password: "root"
}


// Common Functions
// This function get a random color with some restrictions
export const getRandomHexColor = () => {
  const baseColor = 40; // 240 is a bright shade of grey, which gives a clear color
  return '#' + randomHexColor() + randomHexColor() + randomHexColor() + baseColor.toString(16) + randomHexColor();
}

function randomHexColor() {
  const randomColor = Math.floor(Math.random() * 16).toString(16);
  return randomColor
}

export const genDataBarStacked = (registros, nombreColLabels, nombreColDS) => {
  // Función para generar data para graficas de chart stacked
  const listaLabels = [...new Set(registros.map(item => item[nombreColLabels]))].sort();
  const listaDatasSets = [...new Set(registros.map(item => item[nombreColDS]))].sort()

  let arrayLabelsDSs = []
  // {label, datasets: {}}
  for (let i = 0; i < listaLabels.length; i++) {
    let registrosLabel = registros.filter(registro => registro[nombreColLabels]===listaLabels[i])

    let DSxLabel = {};
    for (let j = 0; j < registrosLabel.length; j++) {
      let dataset = registrosLabel[j][nombreColDS];
      DSxLabel[dataset] = DSxLabel[dataset] ? DSxLabel[dataset] + 1 : 1;
    }
    let objetoLabelDS = {label: listaLabels[i], datasets: DSxLabel}
    arrayLabelsDSs.push(objetoLabelDS)
  }

  let arrayDatasets = [] // Separa cada dataset en un array que está dentro de otro array
  for (let i = 0; i <listaDatasSets.length; i++) {
    let arrayDS = []
    for (let j = 0; j < arrayLabelsDSs.length; j++){
      let ocurrenciasDS = arrayLabelsDSs[j]["datasets"][listaDatasSets[i]] ? arrayLabelsDSs[j]["datasets"][listaDatasSets[i]] : 0
      arrayDS.push(ocurrenciasDS)
    }
    arrayDatasets.push(arrayDS)
  }

  let datasets = []

  for (let i = 0; i < listaDatasSets.length; i++){
    let dataset = {
      label: listaDatasSets[i],
      backgroundColor: getRandomHexColor(),
      borderColor: "black",
      data: arrayDatasets[i]
    }
    datasets.push(dataset)
  }

  const dataBarStacked = {    
    labels: listaLabels,
    datasets: datasets
  }

  return dataBarStacked
}

export const genDataBar = (registros, nombreColLabels) => {
  const labelsValueObj = {}
  // {label1: valueLabel1, label2: valueLabel2 ....}
  for (let i = 0; i < registros.length; i++) {
    let label = registros[i][nombreColLabels];
    labelsValueObj[label] = labelsValueObj[label] ? labelsValueObj[label] + 1 : 1;
  }

  let arrayLabels = [] 
  let arrayValues= []
  for (const [label, value] of Object.entries(labelsValueObj)) {
    arrayLabels.push(label)
    arrayValues.push(value)
  }

  const dataBarChart = {
    labels: arrayLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Ventas',
        backgroundColor: getRandomHexColor(),
        data: arrayValues
      }
    ]
  };

  return dataBarChart
}

export const genDataLine = (registros, nombreColLabels) => {
  const labelsValueObj = {}
  // {label1: valueLabel1, label2: valueLabel2 ....}
  for (let i = 0; i < registros.length; i++) {
    let label = registros[i][nombreColLabels];
    labelsValueObj[label] = labelsValueObj[label] ? labelsValueObj[label] + 1 : 1;
  }

  let arrayLabels = [] 
  let arrayValues= []
  for (const [label, value] of Object.entries(labelsValueObj)) {
    arrayLabels.push(label)
    arrayValues.push(value)
  }

  const dataLineChart = {
    labels: arrayLabels.length===3?["Enero", "Febrero", "Marzo"]:arrayLabels,
    datasets: [
      {
        label: 'Ventas',
        data: arrayValues,
        fill: false,
        tension: 0.4,
        borderColor: getRandomHexColor()
      }
    ]
  };

  return dataLineChart
}

export const optionsBarChart = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
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
        color: "#0f0d142e"
      }
    },
    y: {
      stacked: true,
      ticks: {
        color: "black"
      },
      grid: {
        color: "#0f0d142e"
      }
    }
  }
};


export default parametrosGlobales