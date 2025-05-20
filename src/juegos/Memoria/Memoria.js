import './memoria.css';

export function iniciarMemoria(container, volverAlMenu) {
  const nombresImagenes = [
    "Goku.png",
    "Vegeta.jpg",
    "Frezzer.jpg",
    "Gohan.jpg",
    "Krillin.jpg",
    "Majin-bo.jpg",
    "Picolo.png",
    "Trunks.jpg"
  ];

  const totalCartas = 16; // 8 pares
  let cartas = [];
  let cartasSeleccionadas = [];
  let cartasSeleccionadasId = [];

  container.innerHTML = `
    <button id="volver-menu" style="margin-bottom: 1em;">Volver al menú</button>
    <h2 style="text-align:center;">Juego de Memoria</h2>
    <div id="juego" class="memoria-tablero"></div>
  `;

  document.getElementById('volver-menu').onclick = volverAlMenu;

  const juego = container.querySelector("#juego");

  function generarPares() {
    const valores = [];
    for (let i = 0; i < nombresImagenes.length; i++) {
      valores.push(nombresImagenes[i]);
      valores.push(nombresImagenes[i]);
    }
    return valores.sort(() => Math.random() - 0.5);
  }

  function crearCartas() {
    const valores = generarPares();

    for (let i = 0; i < totalCartas; i++) {
      const carta = document.createElement("div");
      carta.classList.add("carta");
      carta.setAttribute("data-id", i);
      carta.setAttribute("data-valor", valores[i]);

      const img = document.createElement("img");
      img.src = `/Imagenes-Memori/${valores[i]}`; // Ruta desde public
      img.alt = `Carta ${valores[i].split('.')[0]}`;
      img.classList.add("cara");

      carta.appendChild(img);
      carta.addEventListener("click", voltearCarta);

      juego.appendChild(carta);
      cartas.push(carta);
    }
  }

  function voltearCarta(e) {
    const carta = e.currentTarget;
    const id = carta.getAttribute("data-id");

    if (cartasSeleccionadasId.includes(id) || carta.classList.contains("emparejada") || carta.classList.contains("flip")) return;

    carta.classList.add("flip");
    cartasSeleccionadas.push(carta);
    cartasSeleccionadasId.push(id);

    if (cartasSeleccionadas.length === 2) {
      setTimeout(verificarPareja, 1000);
    }
  }

  function verificarPareja() {
    const [carta1, carta2] = cartasSeleccionadas;
    const valor1 = carta1.getAttribute("data-valor");
    const valor2 = carta2.getAttribute("data-valor");

    if (valor1 === valor2) {
      carta1.classList.add("emparejada");
      carta2.classList.add("emparejada");
    } else {
      carta1.classList.remove("flip");
      carta2.classList.remove("flip");
    }

    cartasSeleccionadas = [];
    cartasSeleccionadasId = [];
  }

  crearCartas();
}