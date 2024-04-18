// Get the current user data from local storage
const currentUser = JSON.parse(localStorage.getItem('user'));

// Get the last carbon footprint information of the current user
const lastCarbonFootInfo = currentUser.carbonFootInfos[currentUser.carbonFootInfos.length - 1];

// Display the last carbon footprint information
console.log(lastCarbonFootInfo);

// Calculate the carbon footprint related to home
let home =
  (lastCarbonFootInfo.coalConsumption * 0.025 +
    lastCarbonFootInfo.woodConsumption * 0.015 +
    lastCarbonFootInfo.electricityHousehold * 0.019 +
    lastCarbonFootInfo.publicTransportDistance * 0.06) /
  1000;

  // Calculate the carbon footprint related to lifestyle
let lifeStyle = (lastCarbonFootInfo.meatConsumption * 27) / 1000;

// Initialize transport carbon footprint
let transport = 0;

// Calculate the carbon footprint related to transport based on fuel type
switch (lastCarbonFootInfo.fuelType) {
  case 'petrol':
    transport = (lastCarbonFootInfo.travelledKilometers * 2.31) / 1000;
    break;
  case 'diesel':
    transport = (lastCarbonFootInfo.travelledKilometers * 2.68) / 1000;
    break;
  case 'electricity':
    transport = (lastCarbonFootInfo.travelledKilometers * 0.4) / 1000;
    break;

  default:
    break;
}
// Display the calculated carbon footprints on the webpage
document.getElementById('home').innerHTML = home;
document.getElementById('transport').innerHTML = transport;
document.getElementById('lifeStyle').innerHTML = lifeStyle;
document.getElementById('total').innerHTML = home + transport + lifeStyle;

//Get the canvas element to draw the chart.js
const ctx = document.getElementById('myChart');

// Create a pie chart using Chart.js library
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Home', 'Transport', 'Life Style'],
    datasets: [
      {
        label: '# of Votes',
        data: [home, transport, lifeStyle],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
