function selectores(){
    paises()
    tiendas()
    ciudades()
}
function tiendas() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/tiendas", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();        
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<option value="' + data[i].store_id + '">' + data[i].address + '</option>';
        }        
    document.getElementById('tiendas').innerHTML=out;
}

function paises() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/paises", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();        
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<option value="' + data[i].country_id + '">' + data[i].country + '</option>';
        }        
    document.getElementById('paises').innerHTML=out;
}


function alta() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/alta", false);
    xhttp.send();
    var ele = document.getElementById("location").innerHTML=xhttp.responseText;
}

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
document.getElementById("location").value = "POINT(" + position.coords.latitude + 
"," + position.coords.longitude+")";
}

function ciudades() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/ciudades", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"country_id":document.getElementById('paises').value}));         
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<option value="' + data[i].city_id + '">' + data[i].city + '</option>';
        }        
    document.getElementById('ciudades').innerHTML=out;
}