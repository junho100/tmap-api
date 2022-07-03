function initTmap() {
  const map = new Tmapv2.Map('map_div', {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    width: '890px',
    height: '350px',
    zoom: 15,
  });
  var center = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
    map: map,
    zoom: 5,
  });
  axios.get('http://localhost:3000/all').then((res) => {
    res.data.forEach((element) => {
      const lat = parseFloat(element.lat);
      const lng = parseFloat(element.lng);
      console.log(lat, lng);
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(lat, lng),
        map: map,
      });
    });
  });
}
function initTmapFilter(distance) {
  const filterDiv = document.getElementById('map_div_filter');
  while (filterDiv.hasChildNodes()) {
    filterDiv.removeChild(filterDiv.firstChild);
  }
  const map = new Tmapv2.Map('map_div_filter', {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    width: '890px',
    height: '350px',
    zoom: 15,
  });
  var center = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
    map: map,
    zoom: 5,
  });
  axios.get(`http://localhost:3000/ped/${distance}`).then((res) => {
    res.data.forEach((element) => {
      const lat = parseFloat(element.lat);
      const lng = parseFloat(element.lng);
      console.log(lat, lng);
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(lat, lng),
        map: map,
      });
    });
  });
}
