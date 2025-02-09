const temperatureField = document.querySelector('.temp');
const conditionField = document.querySelector('.weather_condition span');
const timeAndDateField = document.querySelector('.time_location span');
const locationField = document.querySelector('.time_location p');
const conditionIconField = document.querySelector('.weather-icon');
const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

let target = 'Mumbai';

form.addEventListener('submit', searchFn);
themeToggle.addEventListener('click', toggleTheme);

toggleTheme(); // Ensure correct initial theme state

function searchFn(e) {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
}

async function fetchData(target) {
    let endpoint = `http://api.weatherapi.com/v1/current.json?key=35af7ff606db422880d141328231305&q=${target}&aqi=no`;
    const response = await fetch(endpoint);
    const data = await response.json();
    
    let cityName = data.location.name;
    let timeAndDate = data.location.localtime;
    let tempC = data.current.temp_c;
    let condition = data.current.condition.text;
    let conditionIcon = data.current.condition.icon;
    
    updateFields(cityName, timeAndDate, tempC, condition, conditionIcon);
}

function updateFields(location, tandD, temp, condition, conditionIcon) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = location;
    timeAndDateField.innerText = tandD;
    conditionField.innerText = condition;
    conditionIconField.src = conditionIcon;
    updateBackground(condition);
}

function updateBackground(condition) {
    const weatherConditions = {
        "Clear": "url('clear-sky.jpg')",
        "Partly cloudy": "url('cloudy.jpg')",
        "Rain": "url('rain.jpg')",
        "Snow": "url('snow.jpg')"
    };

    // Apply background image for dark mode or light mode
    if (body.classList.contains('light-mode')) {
        document.body.style.backgroundImage = weatherConditions[condition] || "url('default.jpg')";
    } else {
        document.body.style.backgroundImage = weatherConditions[condition] || "url('default-dark.jpg')";
    }
}

function toggleTheme() {
    body.classList.toggle('light-mode');
    themeToggle.innerText = body.classList.contains('light-mode') ? '☀️' : '🌙';
}
