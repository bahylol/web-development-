// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=dfe9d1624c789db20304ac090778b308&units=imperial';
//website base address
const baseAddress = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Global Variables */
//variables to be updated with new data
let dateHolder = document.querySelector('#date');
let tempHolder = document.querySelector('#temp');
let contentHolder = document.querySelector('#content');
//generate button which takes parameter from zipholder
let generateButton = document.querySelector('#generate');
let zipHolder = document.querySelector('#zip');

//adding the event listener which will call other functions to fetch data then post to server then update the gui
generateButton.addEventListener('click', () => {
    fetchWeather(zipHolder.value).then(
            (data) => {
                postDataToServer('http://localhost:88/add', {
                    date: newDate,
                    temp: data.main.temp,
                    content: document.querySelector('#feelings').value
                })
            })
        .then(function() {
            updateGUI('http://localhost:88/all');
        });
});

//function to get the data from the api
const fetchWeather = async (zip) => {
    const res = await fetch(baseAddress + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error' + error);
    }
};

//function to post data to the server
const postDataToServer = async (url = '', data = {}) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    });
};

//function to update the gui of the user
const updateGUI = async (url='') => {
    const res = await fetch(url);
    try {
        const newData = await res.json();
        console.log(newData);
        dateHolder.innerHTML = "Date : " + newData.date;
        tempHolder.innerHTML = "Tempreature : " + Math.round(newData.temp);
        contentHolder.innerHTML = "Feeling : " + newData.content;
    } catch (error) {
        console.log('error' + error)
    }
};