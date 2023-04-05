export const getRandomHexColor = () => {
  const baseColor = 40; // 240 is a bright shade of grey, which gives a clear color
  return '#' + randomHexColor() + randomHexColor() + randomHexColor() + baseColor.toString(16) + randomHexColor();
}

function randomHexColor() {
  const randomColor = Math.floor(Math.random() * 16).toString(16);
  return randomColor
}

let parametrosGlobales = {
  urlBack: "http://localhost:3000"
}

export default parametrosGlobales