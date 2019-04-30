window.addEventListener('load', () => {
  let date = document.getElementsByClassName('date');
  let time = document.getElementsByClassName('time');
  let temperatureDescription = document.getElementsByClassName('temperature-description');
  let temperatureDegree = document.getElementsByClassName('degree');
  let pop = document.querySelector('.pop12h');
  let locationTimezone = document.getElementsByClassName('location-timezone');
  let weatherIcon = document.getElementsByClassName('weather-icon');
  let temperatureSection = document.getElementsByClassName('temperature-section');
  const degreeSpan = document.getElementsByClassName('temperature-section span');

  const api = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-AD3433F6-9C95-4186-9B03-0C72AA5DE397&locationName=%E6%96%87%E5%B1%B1%E5%8D%80,&elementName=Wx,PoP12h,AT,T,WeatherDescription';

  fetch(api)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)

  const { weatherElement } = data.records.locations[0].location[0];
  const { time: pop12h } = weatherElement[0]; //用冒號就可以重新命名成自己想要的名字！
  const { time: pheno } = weatherElement[1];
  const { time: feelTemp } = weatherElement[2];
  const { time: temp } = weatherElement[3];
  const { time:  description} = weatherElement[4];

  let currentPop12h = pop12h[0].elementValue[0].value;
  pop.textContent = currentPop12h + '%';

  //get time
  for(var i = 0; i < time.length; i++){
    datadate = temp[i].dataTime.split(" ")[0];
    datatime = temp[i].dataTime.split(" ")[1];
    date.item(i).textContent = datadate;
    time.item(i).textContent = datatime;
  }
  //get temperature value
  for(var i = 0; i < temperatureDegree.length; i++){
    temperatureDegree.item(i).textContent = temp[i].elementValue[0].value;
  }
  //get description
  for(var i = 0; i < temperatureDescription.length; i++){
    let currentDescription = description[i].elementValue[0].value;
    currentDescription = currentDescription.split("。").slice(0, 4);
    currentDescription.splice(1, 2)
    currentDescription = currentDescription.join('. ')
    temperatureDescription.item(i).textContent = currentDescription;
  }
  // temperatureDegree.textContent = currentTemp;   

//     const {temperature, summary, icon} = data.currently; //pull out the datas you want from currently
//     //Set DOM Elements from the API
//     let temperatureC = Math.round((temperature - 32) * 5/9)
//     temperatureDegree.textContent = temperatureC;
//     temperatureDescription.textContent = summary;
//     locationTimezone.textContent = data.timezone;
//     //Set Icon
//     setIcons(icon, weatherIcon);

//     //Change temperature to Fahremheit
//     temperatureSection.addEventListener('click', () => {
//       if (degreeSpan.textContent === "°C"){
//         temperatureDegree.textContent = temperature;
//         degreeSpan.textContent = "°F";
//       }else {
//         temperatureDegree.textContent = temperatureC;
//         degreeSpan.textContent = "°C";
//       }
//     })
    });
  for(var i = 0; i < weatherIcon.length; i++){
    let skycons = new Skycons({color: "white"});
    skycons.play();
    skycons.set(weatherIcon[i], Skycons.PARTLY_CLOUDY_DAY);
  }
});

  

function setIcons(icon, iconID){
  const skycons = new Skycons({color: "white"});
  // const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}