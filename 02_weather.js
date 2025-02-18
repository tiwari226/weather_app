// You can only grab input element once the DOM is loaded 
document.addEventListener('DOMContentLoaded', () =>{
     
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempDisplay = document.getElementById("temperature");
    const descriptionDisplay= document.getElementById("description");
    const errorMessage= document.getElementById("error-msg");
    const dt1 = document.getElementById("jai");
    const feel_like = document.getElementById("feellike");
    const sea_level= document.getElementById("sealevel");
    const press = document.getElementById("pressure");
    // const API_KEY = process.env.API_OPENWEATHER; 
    const API_KEY = 'e7d0bbf2aa25582133afc8367e47cabd';

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        // It may throw an error
        // Server/db is always in another continent
        // ie try to wrap it in a safe zone

        try{
            const weatherData = await fetchWeatherData(city)   // Now as it gonna take timme  
            displayWeatherData(weatherData);
        }catch (error){
            showError();
        }

    });
    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url);

        // console.log(response.main.temp);
        // console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City not Found !! ");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(weatherData){
        let val = setInterval(showtime, 1);
        console.log(weatherData);

        const {name, main, weather} = weatherData; 
        cityNameDisplay.innerHTML = name;
        tempDisplay.innerHTML = `Temperature : ${main.temp} °C`;
        feel_like.innerHTML = `FeelLike : ${main.feels_like} °C`;
        descriptionDisplay.innerHTML = `Description : ${weather[0].description}`;
        sea_level.innerHTML = `Sea_level : ${main.sea_level}`;
        press.innerHTML = `Pressure : ${main.pressure}`;



        // Unlock Display
        // Show weather info and hide error message if elements are found
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }

    function showtime(){
        const dt = new Date();
        dt1.innerHTML = dt.toString();
    }
    function showError(){
        // errorMessage.textContent = errorMsg || "An error occurred. Please try again later.";
        weatherInfo.classList.remove("hidden");
        // errorMessage.classList.add("hidden");
       
    }
});


