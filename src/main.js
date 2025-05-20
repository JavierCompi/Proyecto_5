// filepath: [main.js](http://_vscodecontentref_/2)
import './style.css';

import { iniciarTresEnRaya } from './juegos/Tres-En-Raya/Tres-En-Raya.js';
import { iniciarMemoria } from './juegos/Memoria/Memoria.js';
import { AdivinaNumero } from './juegos/AdivinaNnumero/AdivinaNumero.js';

const menu = document.getElementById('menu');
const botones = document.querySelectorAll('.Juego');
const contenedor = document.getElementById('game-container');

// Función para volver al menú principal
function volverAlMenu() {
  contenedor.classList.add('hidden');
  menu.classList.remove('hidden');
  contenedor.innerHTML = '';
}

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const juego = boton.dataset.game;
    menu.classList.add('hidden');
    contenedor.classList.remove('hidden');
    contenedor.innerHTML = ''; 

    switch (juego) {
      case 'tresenraya':
        iniciarTresEnRaya(contenedor, volverAlMenu);
        break;
      case 'memoria':
        iniciarMemoria(contenedor, volverAlMenu);
        break;
      case 'adivina':
        const juegoAdivina = new AdivinaNumero(contenedor, volverAlMenu);
        juegoAdivina.start();
        break;
      default:
        contenedor.innerHTML = '<p>Juego no encontrado</p>';
    }
  });
});