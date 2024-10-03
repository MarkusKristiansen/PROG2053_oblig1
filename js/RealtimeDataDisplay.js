const locations = [
    { name: "Raufoss, Norway", latitude: 60.729, longitude: 10.585 },
    { name: "Oslo, Norway", latitude: 59.913, longitude: 10.752 },
    { name: "New York, USA", latitude: 40.712, longitude: -74.005 },
    { name: "Paris, France", latitude: 48.856, longitude: 2.352 },
    { name: "London, UK", latitude: 51.509, longitude: -0.118 },
    { name: "Pyongyang, North Korea", latitude: 39.019, longitude: 125.738 },
    { name: "Moscow, Russia", latitude: 55.751, longitude: 37.618 },
    { name: "Tokyo, Japan", latitude: 35.652, longitude: 139.839 },
    { name: "Athens, Greece", latitude: 37.983, longitude: 23.727 },
    { name: "Lisbon, Portugal", latitude: 38.736, longitude: -9.142 },
    { name: "Cairo, Egypt", latitude: 30.033, longitude: 31.233 },
    { name: "Bejing, China", latitude: 30.033, longitude: 31.233 }
];

function fetchWeatherData() {
    const weatherContainer = document.getElementById("main-container");

    // Clear existing weather data
    weatherContainer.innerHTML = '';

    // Fetching weather data
    locations.forEach(location => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error with the status: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const content = document.createElement("article");
                content.innerHTML = `
                    <h1>${location.name}</h1>
                    <p>Temperature: ${data.current_weather.temperature} ${data.current_weather_units.temperature}</p>
                    <p>Wind Speed: ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}</p>
                `;
                weatherContainer.appendChild(content);
            })
            .catch(error => console.error("Error fetching weather data:", error));
    });
}

fetchWeatherData();

// 1 min = 60000 ms
setInterval(fetchWeatherData, 60000);