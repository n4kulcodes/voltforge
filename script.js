const colorCodes = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
};

const multiplierValues = {
  black: 1,
  brown: 10,
  red: 100,
  orange: 1000,
  yellow: 10000,
  green: 100000,
  blue: 1000000,
  gold: 0.1,
  silver: 0.01
};

const toleranceValues = {
  brown: '±1%',
  red: '±2%',
  gold: '±5%',
  silver: '±10%'
};

const digitColors = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

const multiplierColors = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'gold',
  'silver'
];

const toleranceColors = [
  'brown',
  'red',
  'gold',
  'silver'
];

function populateDropdown(id, colors) {
  const select = document.getElementById(id);

  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent =
      color.charAt(0).toUpperCase() + color.slice(1);

    select.appendChild(option);
  });
}

populateDropdown('band1', digitColors);
populateDropdown('band2', digitColors);
populateDropdown('band3', multiplierColors);
populateDropdown('band4', toleranceColors);

function updateResistorVisual() {
  document.getElementById('band1Visual').style.background =
    document.getElementById('band1').value;

  document.getElementById('band2Visual').style.background =
    document.getElementById('band2').value;

  document.getElementById('band3Visual').style.background =
    document.getElementById('band3').value;

  document.getElementById('band4Visual').style.background =
    document.getElementById('band4').value;
}

function calculateResistor() {
  const band1 = document.getElementById('band1').value;
  const band2 = document.getElementById('band2').value;
  const band3 = document.getElementById('band3').value;
  const band4 = document.getElementById('band4').value;

  updateResistorVisual();

  const firstDigit = colorCodes[band1];
  const secondDigit = colorCodes[band2];
  const multiplier = multiplierValues[band3];
  const tolerance = toleranceValues[band4];

  const resistance =
    ((firstDigit * 10) + secondDigit) * multiplier;

  let formattedResistance;

  if (resistance >= 1000000) {
    formattedResistance =
      (resistance / 1000000) + ' MΩ';
  }

  else if (resistance >= 1000) {
    formattedResistance =
      (resistance / 1000) + ' kΩ';
  }

  else {
    formattedResistance =
      resistance + ' Ω';
  }

  document.getElementById('resistorResult').innerHTML = `
    Resistance = <strong>${formattedResistance}</strong><br>
    Tolerance = <strong>${tolerance}</strong>
  `;
}

updateResistorVisual();

document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', updateResistorVisual);
});
