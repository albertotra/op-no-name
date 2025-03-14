const output = document.getElementById("output");
const input = document.getElementById("input");
const correctPassword = "jsoc";

const commands = [
    "Iniziando scansione della rete...",
    "Connettendo al server 192.168.1.1...",
    "Richiesta di handshake... Attesa risposta...",
    "01001110: Accesso ai dati in corso...",
    "Firewall bypass in corso...",
    "Decodifica pacchetti TCP/IP...",
    "11010100... Pacchetti in transito rilevati...",
    "Verifica vulnerabilità CVE-2023-0001...",
    "Rilevato bug di overflow nel sistema...",
    "11001001: Criptando dati sensibili...",
    "Estrazione credenziali utente...",
    "Accesso amministrativo ottenuto con successo!",
    "11000101: Trasmissione dati protetta attivata...",
    "Aggiramento delle protezioni antivirus...",
    "01100110: Flusso dati crittografato intercettato...",
    "Dumping database MySQL...",
    "Controllo hash SHA-256...",
    "11000011: Codifica hash completata...",
    "Avvio scansione porte aperte su 192.168.1.100...",
    "Porta 22 (SSH) aperta. Tentativo di connessione...",
    "01110111: Chiave di accesso SSH verificata...",
    "Installazione backdoor remota...",
    "Cifratura RSA 2048 attivata...",
    "11011001: Comunicazione sicura stabilita...",
    "Esecuzione exploit buffer overflow...",
    "Estrazione del file di configurazione del server...",
    "Download del registro di sistema in corso...",
    "00011110: File dump completato!",
    "Avvio della cancellazione sicura dei log...",
    "Accesso ai file criptati di rete...",
    "Connection established!",
    "Insert team name:"
];


let commandIndex = 0;
function executeCommand() {
    if (commandIndex < commands.length) {
        writeOutput(commands[commandIndex]);
        commandIndex++;
        setTimeout(executeCommand, 300); // Delay between commands
    } else {
        // Tutti i comandi sono stati mostrati, abilita l'input e imposta il focus
        input.disabled = false;
        input.focus();
    }
}

input.disabled = true;
// Unified writeOutput function
function writeOutput(text) {
    output.innerHTML += text + "\n";
    output.scrollTop = output.scrollHeight; // Scroll down
}



// Show simulated commands when the page loads
window.onload = () => {
    executeCommand();
};

// Modifica questa parte della funzione per gestire l'input dell'utente
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const userInput = input.value.trim();

        writeOutput("> " + userInput);

        // Check if input matches the password
        if (userInput === correctPassword) {
            writeOutput("> Accesso consentito!");

            // Aspetta un secondo prima di passare al video player
            setTimeout(() => {
                // Nascondi il terminal
                document.getElementById('draggable-terminal').style.display = 'none';

                // Mostra il video player
                const videoTerminal = document.getElementById('video-terminal');
                videoTerminal.style.display = 'block';

                // Avvia il video automaticamente
                const player = document.getElementById('player');
                player.play();

                // Aggiungi la funzionalità di trascinamento anche al video player
                setupDraggable(
                    document.getElementById('video-terminal'),
                    document.getElementById('video-title-bar')
                );
            }, 1000);
        } else {
            writeOutput("> Accesso non consentito!");
        }

        input.value = ""; // Clear input field after checking
    }
});

// Funzione per configurare qualsiasi elemento come trascinabile
function setupDraggable(element, handle) {
    let isDragging = false;
    let offsetX, offsetY;

    // Event listener for mouse down (starting the drag)
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;

        // Get the mouse offset relative to the element's position
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        // Change cursor to grabbing
        handle.style.cursor = 'grabbing';

        // Prevent text selection and other default actions
        e.preventDefault();
    });

    // Event listener for mouse move (dragging the element)
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            // Update the position of the element based on mouse movement
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Event listener for mouse up (ending the drag)
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            handle.style.cursor = 'move';
        }
    });
}

// Configura il terminal iniziale come trascinabile
window.onload = () => {
    executeCommand();
    setupDraggable(
        document.getElementById('draggable-terminal'),
        document.getElementById('title-bar')
    );
};