async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");
    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");
    const weatherIcon = document.getElementById("weatherIcon");
    const temperature = document.getElementById("temperature");
    const weatherDescription = document.getElementById("weatherDescription");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const feelsLike = document.getElementById("feelsLike");

    const cityName = cityInput.value.trim();

    if (cityName === "") {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    loading.style.display = "block";
    errorMessage.style.display = "none";
    weatherResult.style.display = "none";

    try {
        const apiKey = '030f5151a83286edfc3cf59716cd0698'; // API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found. Please enter a valid city name.');
        }

        const data = await response.json();

        weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIcon.style.display = "block";

        temperature.textContent = `Temperature: ${data.main.temp} ℃`;
        weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like} ℃`;

        loading.style.display = "none";
        weatherResult.style.display = "block";
    } catch (error) {
        loading.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent = error.message;
        weatherResult.style.display = "none";
    }
}
