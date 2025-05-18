import './style.css';

import { iniciarTresEnRaya } from './juegos/Tres-En-Raya/Tres-En-Raya.js';
import { iniciarMemoria } from './juegos/Memoria/Memoria.js';
import { AdivinaNumero } from './juegos/AdivinaNnumero/AdivinaNumero.js';

const menu = document.getElementById('menu');
const botones = document.querySelectorAll('.Juego');
const contenedor = document.getElementById('game-container');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const juego = boton.dataset.game;
    menu.classList.add('hidden');
    contenedor.classList.remove('hidden');
    contenedor.innerHTML = ''; 

    switch (juego) {
      case 'tresenraya':
        iniciarTresEnRaya(contenedor);
        break;
      case 'memoria':
        iniciarMemoria(contenedor);
        break;
      case 'adivina':
        const juegoAdivina = new AdivinaNumero(contenedor);
        juegoAdivina.start();
        break;
      default:
        contenedor.innerHTML = '<p>Juego no encontrado</p>';
    }
  });
});