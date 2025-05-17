import './combate.css';





export function iniciarCombate(container) {
  container.innerHTML = `
    <section class="Combate-container">
      

      <div class="personaje enemigo">
        <div class="vida">
          <span>Enemigo</span>
          <div class="barra-vida" id="vida-enemigo"><div class="relleno"></div></div>
        </div>
        <img src="https://via.placeholder.com/150x150?text=Enemigo" alt="Enemigo" />
      </div>

      <!-- Jugador -->
      <div class="personaje jugador">
        <div class="vida">
          <span>Jugador</span>
          <div class="barra-vida" id="vida-jugador"><div class="relleno"></div></div>
        </div>
        <img src="https://via.placeholder.com/150x150?text=Jugador" alt="Jugador" />
        
        <!-- Botones -->
        <div class="acciones">
          <button class="accion" data-accion="puño">👊 Puño</button>
          <button class="accion" data-accion="bloqueo">🛡️ Bloqueo</button>
        </div>
      </div>

    </section>
  `;

  // Variables de estado
  let vidaJugador = 50;
  let vidaEnemigo = 50;
  let jugadorBloqueando = false;
  let enemigoBloqueando = false;
  let turnoJugador = true; // true = turno jugador, false = turno enemigo

  // Referencias a barras de vida
  const barraVidaJugador = container.querySelector('#vida-jugador .relleno');
  const barraVidaEnemigo = container.querySelector('#vida-enemigo .relleno');

  // Referencias a botones
  const botonesAccion = container.querySelectorAll('.accion');

  // Actualiza la barra de vida en porcentaje
  function actualizarBarras() {
    barraVidaJugador.style.width = Math.max(0, (vidaJugador / 50) * 100) + '%';
    barraVidaEnemigo.style.width = Math.max(0, (vidaEnemigo / 50) * 100) + '%';
  }

  // Termina el juego mostrando un mensaje
  function terminarJuego(mensaje) {
    alert(mensaje);
    // Reinicia la partida o vuelve al menú (según prefieras)
    // Aquí simplemente reiniciamos la vida y actualizamos barras:
    vidaJugador = 50;
    vidaEnemigo = 50;
    jugadorBloqueando = false;
    enemigoBloqueando = false;
    turnoJugador = true;
    actualizarBarras();
  }

  // Ataque enemigo (simple IA que elige aleatoriamente)
  function turnoDelEnemigo() {
    enemigoBloqueando = false;
    const acciones = ['puño', 'bloqueo'];
    const accion = acciones[Math.floor(Math.random() * acciones.length)];

    if (accion === 'bloqueo') {
      enemigoBloqueando = true;
      alert('El enemigo está bloqueando');
    } else if (accion === 'puño') {
      let danio = 10;
      if (jugadorBloqueando) danio = Math.floor(danio / 2);
      vidaJugador -= danio;
      alert(`El enemigo te golpeó con un puño y causó ${danio} de daño.`);
    }

    jugadorBloqueando = false; // Se resetea bloqueo jugador
    turnoJugador = true;
    actualizarBarras();
    revisarFin();
  }

  // Revisa si hay ganador
  function revisarFin() {
    if (vidaJugador <= 0) {
      terminarJuego('¡Has perdido!');
    } else if (vidaEnemigo <= 0) {
      terminarJuego('¡Has ganado!');
    }
  }

  // Manejador de clic en botones jugador
  botonesAccion.forEach(boton => {
    boton.addEventListener('click', () => {
      if (!turnoJugador) return; // Solo puede jugar si es su turno

      const accion = boton.dataset.accion;

      jugadorBloqueando = false;

      if (accion === 'bloqueo') {
        jugadorBloqueando = true;
        alert('Estás bloqueando');
      } else if (accion === 'puño') {
        let danio = 10;
        if (enemigoBloqueando) danio = Math.floor(danio / 2);
        vidaEnemigo -= danio;
        alert(`Golpeaste al enemigo con un puño y causaste ${danio} de daño.`);
      }

      turnoJugador = false;
      actualizarBarras();
      revisarFin();

      if (!turnoJugador) {
        setTimeout(turnoDelEnemigo, 1000); // Turno enemigo tras 1 segundo
      }
    });
  });

  actualizarBarras();
}
