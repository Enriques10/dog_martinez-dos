// ===== MAPA =====
var mapa = L.map('mapa').setView([20.070, -97.060], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

// ===== DATOS =====
let reportes = [];

// ===== FORM =====
document.getElementById("formPerro").addEventListener("submit", function(e){
e.preventDefault();

let tipo = document.getElementById("tipo").value;
let nombre = document.getElementById("nombre").value;
let ubicacion = document.getElementById("ubicacion").value;
let descripcion = document.getElementById("descripcion").value;
let contacto = document.getElementById("contacto").value;
let foto = document.getElementById("foto").files[0];

if(!foto){
alert("Sube una imagen");
return;
}

// imagen local
let urlImagen = URL.createObjectURL(foto);

// coordenadas aleatorias (simulación)
let lat = 20.070 + (Math.random() - 0.5) * 0.02;
let lng = -97.060 + (Math.random() - 0.5) * 0.02;

let reporte = {
tipo, nombre, ubicacion, descripcion, contacto, foto: urlImagen, lat, lng
};

reportes.push(reporte);

mostrarReportes();
agregarMarcador(reporte);

this.reset();
});

// ===== MOSTRAR =====
function mostrarReportes(){

let lista = document.getElementById("lista");
lista.innerHTML = "";

reportes.forEach(r => {

let card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${r.foto}">
<div class="card-body">
<h3>${r.nombre}</h3>
<p>${r.tipo}</p>
<p>${r.ubicacion}</p>
<p>${r.descripcion}</p>
<p>📞 ${r.contacto}</p>
</div>
`;

lista.appendChild(card);

});
}

// ===== MAPA =====
function agregarMarcador(r){
L.marker([r.lat, r.lng])
.addTo(mapa)
.bindPopup(`<b>${r.nombre}</b><br>${r.tipo}`);
}

// ===== BUSCADOR =====
document.getElementById("buscador").addEventListener("input", function(){

let texto = this.value.toLowerCase();

let filtrados = reportes.filter(r =>
r.nombre.toLowerCase().includes(texto) ||
r.ubicacion.toLowerCase().includes(texto)
);

let lista = document.getElementById("lista");
lista.innerHTML = "";

filtrados.forEach(r => {

let card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${r.foto}">
<div class="card-body">
<h3>${r.nombre}</h3>
<p>${r.tipo}</p>
<p>${r.ubicacion}</p>
</div>
`;

lista.appendChild(card);

});
});

setTimeout(() => {
mapa.invalidateSize();
}, 500);
