var estado = 0;

function inicio(){
    blanquearForm()
    clientes() 
    paises()
    tiendas()
    ciudadesById()
    ciudades()
}
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

function ciudadesById() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/ciudadesById", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"country_id":document.getElementById('paises').value}));         
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<option value="' + data[i].city_id + '">' + data[i].city + '</option>';
        }        
    document.getElementById('ciudades').innerHTML=out;
}
function ciudades() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/ciudades", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();         
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<option value="' + data[i].city_id + '">' + data[i].city + '</option>';
        }        
    document.getElementById('sciudades').innerHTML=out;
}

function clientes() {
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/clientes", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();         
    var data = JSON.parse(xhttp.responseText)
    for (let i = 0; i < data.length; i++) {
        out += '<tr><th scope="row">"' + data[i].customer_id + '"</th><td>' + data[i].first_name +'</td><td>'+ data[i].last_name +'</td><td><button class="btn btn-outline-secondary" type="button" id="button-addon2"  onclick="verCliente(' + data[i].customer_id + ')" >Ver</button></td></tr>';
        }        
    document.getElementById('clientes-body').innerHTML=out;
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
document.getElementById("location").value = "POINT(" + position.coords.latitude + 
" " + position.coords.longitude+")";
}


function alta() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/alta", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(serialize()))
    xhttp.send(JSON.stringify(serialize()));
    document.getElementById("mensaje").style.display = "block";
    var ele = document.getElementById("mensaje").innerHTML=xhttp.responseText;
    inicio()
}

function modificacion() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/modificacion", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(serialize()))
    xhttp.send(JSON.stringify(serialize()));
    document.getElementById("mensaje").style.display = "block";
    var ele = document.getElementById("mensaje").innerHTML=xhttp.responseText;
    inicio()
}

function baja() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/baja", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(serialize()))
    xhttp.send(JSON.stringify(serialize()));
    document.getElementById("mensaje").style.display = "block";
    var ele = document.getElementById("mensaje").innerHTML=xhttp.responseText;
    inicio()
}

function serialize(){
    return {
        "customer_id":
        parseInt(document.getElementById('customer_id').value),
        "store_id":
        parseInt(document.getElementById('tiendas').value),
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
        parseInt(document.getElementById('paises').value),
        "city_id":
        parseInt(document.getElementById('ciudades').value),
        "postal_code":
        document.getElementById('postal_code').value,
        "phone":
        document.getElementById('phone').value,
        "active":
        document.getElementById('active').value,
        "location":
        document.getElementById('location').value,
        "address_id":
        parseInt(document.getElementById('address_id').value)
    };

}

function deserialize(json){
    document.getElementById('customer_id').value=parseInt(json.customer_id);
    document.getElementById('tiendas').value=parseInt(json.store_id);
    document.getElementById('last_name').value=json.last_name;
    document.getElementById('first_name').value=json.first_name;
    document.getElementById('email').value=json.email;
    document.getElementById('address_id').value=json.address_id;
    document.getElementById('address').value=json.address;
    document.getElementById('address2').value=json.address2;
    document.getElementById('district').value=json.district;
    document.getElementById('paises').selectedIndex=json.country_id-1;
    ciudadesById();    
    document.getElementById('postal_code').value=json.postal_code;    
    document.getElementById('phone').value=json.phone;  
    if(json.active==0)document.getElementById('inactivo').checked=true
    getLocation();     
}

document.getElementById('mensaje').onload = function(){
    document.getElementById('mensaje').style.display = "none";
}

document.getElementById('activo').onclick = function (){
    document.getElementById('active').value=document.getElementById('activo').value
}

document.getElementById('inactivo').onclick = function (){
    document.getElementById('active').value=document.getElementById('inactivo').value
}

function verCliente(idcliente){
    var out = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/clientesById", false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"customer_id":idcliente}));         
    var data = JSON.parse(xhttp.responseText)
    console.log(data)
    deserialize(data[0])
}

function blanquearForm()
{
    document.getElementById('customer_id').value=0;
    document.getElementById('tiendas').value=1;
    document.getElementById('last_name').value='';
    document.getElementById('first_name').value='';
    document.getElementById('email').value='';
    document.getElementById('address_id').value='';
    document.getElementById('address').value='';
    document.getElementById('address2').value='';
    document.getElementById('district').value='';
    document.getElementById('postal_code').value='';    
    document.getElementById('phone').value='';  
}

