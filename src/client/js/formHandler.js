import { remove } from "./removeTrip";

//global scope variable which will store depart date and no. of days when form is submitted
let newDate, differenceInDays;

//main function for handeling get request, post request and updating data on UI
function handleSubmit(event) {
    event.preventDefault()
    let locate = document.getElementById('location').value;
//APIs
    let geoNamesApiUrl = `http://api.geonames.org/searchJSON?formatted=true&q=${locate}&username=ahtisham`
    let wheatApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${locate}&key=53a67565269548bd8746e5b4a05ff68f`
    let pixaApiUrl = `https://pixabay.com/api/?&key=30126576-a11259af2a1bfd9bcbac861b8&q=${locate}`;

//Get, post and update UI for city and country name from geonames API
    getGeoData(geoNamesApiUrl)
    .then(function(data){
        postGeoData('/post',{
        countryName: data.geonames[0].countryName,
        name: data.geonames[0].name
      })
      updateUI1(data)
    })

 //Get, post and update UI for highTemp, lowTemp and weather description from weatherbit API
    getWeatherData(wheatApiUrl)
    .then(function(data){
      postWeatherData('/post',{
        highTemp: data.high_temp,
        lowTemp: data.low_temp,
        description: data.weather.description
    })
    updateUI2(data)
    })

 //Get, post and update UI for city image from pixabay API
    getPixaData(pixaApiUrl)
    .then(function(data){
        postPixaData('/post',{
          imageUrl: data.hits[0].largeImageURL,
        });
        updateUI3(data)
    })

 //callback function to remove trip
    remove();
 //callback function to display depart date and days
    duration();
}

//function responsible for depart date and days which will return values of depart date and no. of days when form is submitted
const duration = ()=>{
  // get input date
  let tripDate = new Date(document.getElementById('date').value);
    
  //correct the date format to display
  newDate = tripDate.getMonth()+1+"/"+ tripDate.getDate()+"/"+ tripDate.getFullYear();
    
  //variables for current date
  let d = new Date();
    
  //get time difference between to dates
  let differenceInTime = tripDate.getTime() - d.getTime();
    
  //use time to get the days
  differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
}

//async function to fetch geonames API's data
  const getGeoData = async (url)=>{
    const res = await fetch(url)

    try {
      const data = await res.json();

      return data;
    } catch(error) {
      console.log("error", error);
    }
  }

 //async function to store geonames API's data in our app and then post it to the server
  const postGeoData = async (url = '', data = {}) =>{
    const res = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
}

//function responsible for updating depart date, days left, city name and courty to update on UI
const updateUI1 = (data) => {
  document.getElementById('days-left').innerHTML = `${data.geonames[0].name}, ${data.geonames[0].countryName} ${differenceInDays} days away`;
  document.getElementById('location-and-date').innerHTML = `My trip to: ${data.geonames[0].name}, ${data.geonames[0].countryName} <br/> Departing: ${newDate}`
}

//async function to fetch weatherbit API's data
const getWeatherData = async (url)=>{
  const res = await fetch(url)

  try {
    const data = await res.json();

//callback function to compare input date with API's data array' date to return the specific array
    return matchDate(data.data);
  } catch(error) {
    console.log("error", error);
  }
}

const matchDate = (data)=>{
  const foundDate = data.filter(obj => obj.valid_date === document.getElementById('date').value)[0]
  return foundDate;
}

 //async function to store weatherbit API's data in our app and then post it to the server
const postWeatherData = async (url = '', data = {}) =>{
  const res = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

//function responsible for weather data to update on UI
const updateUI2 = (data) => {
    document.getElementById('weather-forcast').innerHTML = `Typical weather for then is:<br/> High ${data.high_temp}°C, low ${data.low_temp}°C <br/> ${data.weather.description} throughout the day`;
}

//async function to fetch pixabay API's data
const getPixaData = async (url)=>{
  const res = await fetch(url)

  try {
    const data = await res.json();

    return data;
  } catch(error) {
    console.log("error", error);
  }
}

 //async function to store pixabay API's data in our app and then post it to the server
const postPixaData = async (url = '', data = {}) =>{
  const res = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

//function responsible for city image to update on UI
const updateUI3 = (data) => {
      document.getElementById('location-image').innerHTML = `<img src=${data.hits[0].largeImageURL} width="500px" height="300px">`;
}

export { handleSubmit };
