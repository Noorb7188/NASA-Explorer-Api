var startDValue = document.getElementById('startD');
var endDValue = document.getElementById('endD');
var searchButton = document.getElementById('search');
var span = document.getElementById('picContainer');
var titleData = document.createElement('h3');
var infoData = document.getElementsByClassName('tooltiptext')[0];
var astroData = document.getElementById('astroData');
var titleSection = document.createElement('h3');

searchButton.addEventListener('click', function (e) {
  var start = startDValue.value;
  var end = endDValue.value;
  e.preventDefault();
  fetchData(start, end);
})


function fetchData(str1, str2) {
  fetch('/search?start_date='+str1+'&end_date='+str2)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    console.log("my first obj values", data[Object.keys(data)[0]]);
    // the title for each section is the date
    // make a for each to let it loop over my data.value
    // and take the data from each value
    var titleForEach = document.createTextNode('');
    Object.keys(data).forEach(function(element) {
      document.createTextNode(elemnt);
    })

  })
  .catch(function(err) {
    console.log(err);
  })
};

function fetchPicture() {
  fetch('/picdata')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const info = data.explanation;
    const title = data.title;
    const imgUrl = data.url;
    textForTitle = document.createTextNode(title);
    titleData.appendChild(textForTitle);
    span.appendChild(titleData);
    infoData.textContent = info;
    if (data.media_type !== "image") {
    document.body.style.backgroundImage = "url("+imgUrl+")";
  } else {
    document.body.style.backgroundImage = 'url("http://www.adwonline.ae/wp-content/uploads/2017/04/space-005.jpg")';
 }
  })
  .catch(function(error) {
    console.log(error);
  })
};

fetchPicture();
