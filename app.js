document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-destino");
    const listaDestinos = document.getElementById("lista-destinos");
    const infoButton = document.querySelector("#info button");
    const infoContent = document.getElementById("info-content");
  

    const cargarDestinos = () => {
      const destinos = JSON.parse(localStorage.getItem("destinos")) || [];
      destinos.forEach(destino => agregarDestinoALista(destino));
    };
  

    const guardarDestinos = destinos => {
      localStorage.setItem("destinos", JSON.stringify(destinos));
    };
  

    const agregarDestinoALista = destino => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <h5>${destino.nombre}</h5>
          <p>Fecha: ${destino.fecha}</p>
          <p>Actividades: ${destino.actividades}</p>
        </div>
        <div>
          <button class="btn btn-warning btn-sm mr-2">Modificar</button>
          <button class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      `;
      listaDestinos.appendChild(li);
  
      li.querySelector(".btn-danger").addEventListener("click", () => {
        eliminarDestino(destino);
        li.remove();
      });
  
    };
  
   
    const eliminarDestino = destino => {
      const destinos = JSON.parse(localStorage.getItem("destinos")) || [];
      const nuevosDestinos = destinos.filter(d => d.nombre !== destino.nombre);
      guardarDestinos(nuevosDestinos);
    };
  

    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const fecha = document.getElementById("fecha").value;
      const actividades = document.getElementById("actividades").value;
      const destino = { nombre, fecha, actividades };
  
      agregarDestinoALista(destino);
  
      const destinos = JSON.parse(localStorage.getItem("destinos")) || [];
      destinos.push(destino);
      guardarDestinos(destinos);
  
      form.reset();
    });
  

    infoButton.addEventListener("click", () => {
      infoContent.classList.toggle("d-none");
    });
  
    cargarDestinos();
  });
  