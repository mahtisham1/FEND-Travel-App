import { remove } from "./removeTrip";

let newDate, differenceInDays;

function handleSubmit(event) {
    event.preventDefault()
    let locate = document.getElementById('location').value;

    let geoNamesApiUrl = `http://api.geonames.org/searchJSON?formatted=true&q=${locate}&username=ahtisham`
    let wheatApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${locate}&key=53a67565269548bd8746e5b4a05ff68f`
    let pixaApiUrl = `https://pixabay.com/api/?&key=30126576-a11259af2a1bfd9bcbac861b8&q=${locate}`;

    getGeoData(geoNamesApiUrl)
    .then(function(data){
        postGeoData('/post',{
        countryName: data.geonames[0].countryName,
        name: data.geonames[0].name
      })
      updateUI1(data)
    })

    getWeatherData(wheatApiUrl)
    .then(function(data){
      postWeatherData('/post',{
        highTemp: data.high_temp,
        lowTemp: data.low_temp,
        description: data.weather.description
    })
    updateUI2(data)
    })

    getPixaData(pixaApiUrl)
    .then(function(data){
        postPixaData('/post',{
          imageUrl: data.hits[0].largeImageURL,
        });
        updateUI3(data)
    })

    remove();
    duration();
}

const duration = ()=>{
  let tripDate = new Date(document.getElementById('date').value);
  newDate = tripDate.getMonth()+1+"/"+ tripDate.getDate()+"/"+ tripDate.getFullYear();
  let d = new Date();
  let differenceInTime = tripDate.getTime() - d.getTime();
  differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
}

  const getGeoData = async (url)=>{
    const res = await fetch(url)

    try {
      const data = await res.json();

      return data;
    } catch(error) {
      console.log("error", error);
    }
  }

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

const updateUI1 = (data) => {
  document.getElementById('days-left').innerHTML = `${data.geonames[0].name}, ${data.geonames[0].countryName} ${differenceInDays} days away`;
  document.getElementById('location-and-date').innerHTML = `My trip to: ${data.geonames[0].name}, ${data.geonames[0].countryName} <br/> Departing: ${newDate}`
}

const getWeatherData = async (url)=>{
  const res = await fetch(url)

  try {
    const data = await res.json();

    return matchDate(data.data);
  } catch(error) {
    console.log("error", error);
  }
}

const matchDate = (data)=>{
  const foundDate = data.filter(obj => obj.valid_date === document.getElementById('date').value)[0]
  return foundDate;
}

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

const updateUI2 = (data) => {
    document.getElementById('weather-forcast').innerHTML = `Typical weather for then is:<br/> High ${data.high_temp}°C, low ${data.low_temp}°C <br/> ${data.weather.description} throughout the day`;
}

const getPixaData = async (url)=>{
  const res = await fetch(url)

  try {
    const data = await res.json();

    return data;
  } catch(error) {
    console.log("error", error);
  }
}

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

const updateUI3 = (data) => {
      document.getElementById('location-image').innerHTML = `<img src=${data.hits[0].largeImageURL} width="500px" height="300px">`;
}

export { handleSubmit };