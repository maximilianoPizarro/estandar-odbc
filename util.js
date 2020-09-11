function selectores(){
    paises()
    tiendas()
    ciudades()
}
var tupla= {"latitud":0, "longitud":0};
//select
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

//ubicación
function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
tupla={"latitud" : position.coords.latitude , "longitud": position.coords.longitude};    
document.getElementById("location").value = "(" + position.coords.latitude + 
"," + position.coords.longitude+")";
}



//alta cliente
function alta() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/alta", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(serialize())
    xhttp.send(JSON.stringify(serialize()));
    var ele = document.getElementById("location").innerHTML=xhttp.responseText;
}


function serialize(){
    return {
        "store_id":
    document.getElementById('tiendas').value,
    "last_name":
    document.getElementById('last_name').value,
    "first_name":
    document.getElementById('first_name').value,
    "email":
    document.getElementById('email').value,
    "address":
    document.getElementById('address').value,
    "address2":
    document.getElementById('address2').value,
    "district":
    document.getElementById('district').value,
    "country_id":
    document.getElementById('paises').value,
    "city_id":
    document.getElementById('ciudades').value,
    "postal_code":
    document.getElementById('postal_code').value,
    "phone":
    document.getElementById('phone').value,
    "active":
    document.getElementById('active').value,
    "latitud":
    tupla.latitud,
    "logintud":
    tupla.longitud
}

}

