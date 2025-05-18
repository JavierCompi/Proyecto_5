export function iniciarTresEnRaya(container) {
  let turno = 0;
  const tabla = Array(9).fill(null);

  container.innerHTML = `
    <h2>Tres en Raya</h2>
    <div id="tablero" style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; margin-bottom: 10px;">
      ${Array(9).fill(0).map((_, i) => `<button class="btn" data-pos="${i}" style="width:60px; height:60px; font-size:2em;"></button>`).join('')}
    </div>
    <p id="mensaje"></p>
  `;

  const mensaje = container.querySelector('#mensaje');

  const hayGanador = () => {
    const ganadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of ganadoras) {
      if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
        return true;
      }
    }
    return false;
  };

  const btnPulsado = (e) => {
    const btn = e.target;
    const pos = parseInt(btn.getAttribute("data-pos"));

    if (tabla[pos] !== null) return;

    turno++;
    const color = turno % 2 === 0 ? "green" : "blue";
    btn.style.backgroundColor = color;
    btn.disabled = true;
    tabla[pos] = color;

    if (hayGanador()) {
      mensaje.textContent = `Enorabuena ${color} ha ganado.`;S
      document.querySelectorAll(".btn").forEach((obj) => {
        obj.removeEventListener("click", btnPulsado);
        obj.disabled = true;
      });
    } else if (turno === 9) {
      mensaje.textContent = "¡Empate!";
    }
  };

  container.querySelectorAll(".btn").forEach((obj) => {
    obj.addEventListener("click", btnPulsado);
  });
}
