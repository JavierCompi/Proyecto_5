import './style.css';


import { iniciarTresEnRaya } from './juegos/Tres-En-Raya.js';
import { iniciarSnake } from './juegos/snake.js';


menu.classList.add('hidden');
const menu = document.getElementById('menu');
const botones = document.querySelectorAll('.Juego');
const contenedor = document.getElementById('game-container');


botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const juego = boton.dataset.game;

    // Ocultar el menú y mostrar el contenedor del juego
    menu.classList.add('hidden');
    contenedor.classList.remove('hidden');

    switch (juego) {
      case 'combate':
        iniciarCombate(contenedor);
        break;
      case 'tresenraya':
        iniciarTresEnRaya(contenedor);
        break;
      case 'snake':
        iniciarSnake(contenedor);
        break;
      default:
        contenedor.innerHTML = `<p>Juego no encontrado.</p>`;
    }
  });
});
