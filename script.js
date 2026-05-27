<script>
function calculateOhmsLaw() {
  const V = parseFloat(document.getElementById('voltage').value);
  const I = parseFloat(document.getElementById('current').value);
  const R = parseFloat(document.getElementById('resistance').value);

  const result = document.getElementById('ohmResult');
  const filled = [V, I, R].filter(value => !isNaN(value)).length;

  if (filled !== 2) {
    result.innerHTML = 'Please fill exactly TWO values.';
    return;
  }

  if (isNaN(V)) {
    result.innerHTML = `Voltage = <strong>${(I * R).toFixed(2)} V</strong>`;
  } else if (isNaN(I)) {
    result.innerHTML = `Current = <strong>${(V / R).toFixed(2)} A</strong>`;
  } else {
    result.innerHTML = `Resistance = <strong>${(V / I).toFixed(2)} Ω</strong>`;
  }
}

function calculatePower() {
  const voltage = parseFloat(document.getElementById('powerVoltage').value);
  const current = parseFloat(document.getElementById('powerCurrent').value);

  const result = document.getElementById('powerResult');

  if (isNaN(voltage) || isNaN(current)) {
    result.innerHTML = 'Please enter valid values.';
    return;
  }

  result.innerHTML = `Power = <strong>${(voltage * current).toFixed(2)} W</strong>`;
}

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

const digitColors = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
const multiplierColors = ['black','brown','red','orange','yellow','green','blue','gold','silver'];
const toleranceColors = ['brown','red','gold','silver'];

function populateDropdown(id, colors) {
  const select = document.getElementById(id);

  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    select.appendChild(option);
  });
}

populateDropdown('band1', digitColors);
populateDropdown('band2', digitColors);
populateDropdown('band3', multiplierColors);
populateDropdown('band4', toleranceColors);

function updateResistorVisual() {
  document.getElementById('band1Visual').style.background = document.getElementById('band1').value;
  document.getElementById('band2Visual').style.background = document.getElementById('band2').value;
  document.getElementById('band3Visual').style.background = document.getElementById('band3').value;
  document.getElementById('band4Visual').style.background = document.getElementById('band4').value;
}

function calculateResistor() {
  const band1 = document.getElementById('band1').value;
  const band2 = document.getElementById('band2').value;
  const band3 = document.getElementById('band3').value;
  const band4 = document.getElementById('band4').value;

  updateResistorVisual();

  const resistance = ((colorCodes[band1] * 10) + colorCodes[band2]) * multiplierValues[band3];
  const tolerance = toleranceValues[band4];

  let formattedResistance;

  if (resistance >= 1000000) {
    formattedResistance = (resistance / 1000000) + ' MΩ';
  } else if (resistance >= 1000) {
    formattedResistance = (resistance / 1000) + ' kΩ';
  } else {
    formattedResistance = resistance + ' Ω';
  }

  document.getElementById('resistorResult').innerHTML =
    `Resistance = <strong>${formattedResistance}</strong><br>Tolerance = <strong>${tolerance}</strong>`;
}

updateResistorVisual();

document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', updateResistorVisual);
});
</script>