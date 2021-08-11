function requestAPI(){
  event.preventDefault();
  getIP();
}
function getIP(){
  const id=document.querySelector("#main__input").value
  let URL
  if(isNaN(id))
  URL=`https://api.ipdata.co/${id}?api-key=756dbdefb81e224736d0ccd9387271dc7a1ef3d2f51cf9e054518bde`
  else
  URL=`https://api.ipdata.co/${id}?api-key=756dbdefb81e224736d0ccd9387271dc7a1ef3d2f51cf9e054518bde`

  fetch(URL)
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res);
     document.querySelector("#main__detail").innerHTML=`
     <div class="detail__item">
       <p class="main__subtitle">IP ADDRESS</p>
       <p class="main__text">${res.ip}</p>
     </div>
     <div class="detail__item">
       <p class="main__subtitle">LOCATION</p>
       <p class="main__text">${res.city},${res.region} ${res.postal}</p>
     </div>
     <div class="detail__item">
       <p class="main__subtitle">TIMEZONE</p>
       <p class="main__text">${res.time_zone.current_time}</p>
     </div>
     <div class="detail__item">
       <p class="main__subtitle">ISP</p>
       <p class="main__text">${res.asn.name}</p>
     </div>

     `
   buildMap(res.latitude,res.longitude)
  })
}
function buildMap(lat,lng){
  document.querySelector("#map").innerHTML="<div id='mapid'></div>"
  var mymap = L.map('mapid').setView([lat, lng], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoieXV1Y29kZSIsImEiOiJja2V2ZGgzaGIwNDByMnlwOWRsejN6empkIn0.izeMg6hbEjL89TFnW5ZarA",
    }
  ).addTo(mymap);

  let icon = L.icon({
    iconUrl: "./images/icon-location.svg",
  });

  let marker = L.marker([lat, lng], { icon: icon }).addTo(mymap);
}
getIP()
