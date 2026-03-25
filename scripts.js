let mapa = L.map('mapa').setView([20.070, -97.060], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

let reportes = JSON.parse(localStorage.getItem("reportes")) || [];

const form = document.getElementById("formPerro");
const lista = document.getElementById("lista");
const buscador = document.getElementById("buscador");

function mostrarReportes(filtro=""){
lista.innerHTML="";
mapa.eachLayer(layer=>{
if(layer instanceof L.Marker){
mapa.removeLayer(layer);
}
});

reportes.forEach(r=>{
if(r.nombre.toLowerCase().includes(filtro) || r.ubicacion.toLowerCase().includes(filtro)){

let card = document.createElement("div");
card.className="card";

card.innerHTML = `
<img src="${r.foto}">
<div class="card-body">
<h3>${r.tipo}</h3>
<p><b>${r.nombre}</b></p>
<p>${r.ubicacion}</p>
<p>${r.descripcion}</p>
<p>📞 ${r.contacto}</p>
</div>
`;

lista.appendChild(card);

let marker = L.marker([r.lat, r.lng]).addTo(mapa);
marker.bindPopup(r.tipo);
}
});
}

form.addEventListener("submit", e=>{
e.preventDefault();

let file = document.getElementById("foto").files[0];
let reader = new FileReader();

reader.onload = function(){

navigator.geolocation.getCurrentPosition(pos=>{

let nuevo = {
tipo: tipo.value,
nombre: nombre.value,
ubicacion: ubicacion.value,
descripcion: descripcion.value,
contacto: contacto.value,
foto: reader.result,
lat: pos.coords.latitude,
lng: pos.coords.longitude
};

reportes.push(nuevo);
localStorage.setItem("reportes", JSON.stringify(reportes));

mostrarReportes();
form.reset();

});

};

reader.readAsDataURL(file);

});

buscador.addEventListener("input", ()=>{
mostrarReportes(buscador.value.toLowerCase());
});

mostrarReportes();