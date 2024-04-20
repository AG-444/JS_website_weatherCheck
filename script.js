const body = document.body;
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const weather_body = document.querySelector('.weather-body');

const location_not_found = document.querySelector('.location-not-found');

async function checkWeather(city) {
    const api_key = "d0974b449d4bb43401574e515cba7d4a"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if (weather_data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    else {

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${(weather_data.main.temp - 273.15).toFixed(1)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`

        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${weather_data.wind.speed} Km/h`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                body.style.backgroundImage = "url('cloudyskyimg.jpg')";
                weather_img.src = "cloud.png";
                break;
            case 'Clear':
                body.style.backgroundImage = "url('clear_skycropped.png')";
                weather_img.src = "clear.png";
                break;
            case 'Rain':
                body.style.backgroundImage = "url('1840402.jpg')";
                weather_img.src = "rain.png";
                break;
            case 'Mist':
                body.style.backgroundImage = "url('Mist_city.jpg')";
                weather_img.src = "mist.png";
                break;
            case 'Snow':
                body.style.backgroundImage = "url('Snow_img.jpg')";
                weather_img.src = "thunder.png";
                break;
            case 'Haze':
                body.style.backgroundImage = "url('Hazecity.jpg')";
                weather_img.src = "Haze.png"
                break;
        }
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})