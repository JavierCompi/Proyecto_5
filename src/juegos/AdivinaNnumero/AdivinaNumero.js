export class AdivinaNumero {
    constructor(container) {
        this.container = container;
    }

    start() {
        this.container.innerHTML = `
            <h2>¡Adivina el número!</h2>
            <!-- Aquí va el resto de la lógica del juego -->
        `;
        // Aquí puedes añadir más lógica del juego
    }
}