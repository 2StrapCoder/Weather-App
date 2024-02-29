document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city) { // Ensure city input is not empty
        await fetchWeather(city);
        await fetchForecast(city);
        updateSearchHistory(city);
    }
});

async function fetchWeather(city) {
    const apiKey = 'bb966a13af602227cb66e5540564223a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Failed to fetch weather data', error);
    }
}

async function fetchForecast(city) {
    const apiKey = 'bb966a13af602227cb66e5540564223a';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Failed to fetch forecast data', error);
    }
}

function displayCurrentWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; 

    const weatherDiv = document.getElementById('current-weather');
    weatherDiv.innerHTML = `
        <h2>Current Weather: ${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon"> 
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast-weather');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { 
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; 
            
            forecastDiv.innerHTML += `
                <div class="forecast-item">
                    <p>Date: ${forecast.dt_txt.split(' ')[0]}</p>
                    <img src="${iconUrl}" alt="Weather icon" />
                    <p>Temp: ${forecast.main.temp}°F</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                </div>
            `;
        }
    });
}

function updateSearchHistory(city) {
    const historyUl = document.getElementById('search-history');
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', function() {
        fetchWeather(city);
        fetchForecast(city);
    });
    historyUl.prepend(li); 
}