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
    "Insert password:"
];

let commandIndex = 0;
function executeCommand() {
    if (commandIndex < commands.length) {
        writeOutput(commands[commandIndex]);
        commandIndex++;
        setTimeout(executeCommand, 10); // Delay between commands
    } else {
        // Tutti i comandi sono stati mostrati, abilita l'input e imposta il focus
        input.disabled = false;
        input.focus();
    }
}

function writeOutput(text) {
    output.innerHTML += text + "\n";
    output.scrollTop = output.scrollHeight; // Scroll down
}

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

// Funzione per richiedere la modalità a schermo intero
function requestFullScreen() {
    var element = document.documentElement;
    
    var requestMethod = element.requestFullscreen || 
                        element.webkitRequestFullscreen || 
                        element.mozRequestFullScreen || 
                        element.msRequestFullscreen;
    
    if (requestMethod) {
        requestMethod.call(element);
    }
}

// Variabile globale per tracciare lo stato di apertura delle cartelle
const folderOpenState = {
    "PROJECT_ALPHA": false,
    "OPERATION_NEXUS": false,
    "CLASSIFIED_DATA": false,
    "SECURITY_PROTOCOLS": false,
    "MISSION_LOGS": false,
    "PERSONNEL_FILES": false
};

document.addEventListener('DOMContentLoaded', function() {
    // Impedisci comportamenti predefiniti di refresh/navigazione
    preventDefaultBrowserBehaviors();
    
    // Nascondi il terminale all'inizio
    const terminal = document.getElementById('draggable-terminal');
    if (terminal) {
        terminal.style.display = 'none';
    }
    
    // Gestione fullscreen iniziale
    setupFullscreenPrompt();
    
    // Gestione fine video
    document.getElementById('player').addEventListener('ended', function() {
        document.getElementById('video-terminal').style.display = 'none';
        createFolders();
    });
});

function preventDefaultBrowserBehaviors() {
    // Previeni il refresh da tastiera (F5, Ctrl+R)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Previeni il refresh dal menu contestuale del browser
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Previeni il refresh tramite swipe su dispositivi touch
    document.addEventListener('touchstart', function(e) {
        const touchStartY = e.touches[0].clientY;
        
        document.addEventListener('touchmove', function handleMove(e) {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchStartY;
            
            if (touchDiff > 10) {
                e.preventDefault();
            }
        });
    }, { passive: false });

    // Previeni il comportamento standard di navigazione del browser
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    });

    // Blocca la storia del browser
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
}

function setupFullscreenPrompt() {
    // Crea un overlay per il bottone fullscreen
    var overlay = document.createElement('div');
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "10000";
    
    // Crea il bottone fullscreen
    var fullscreenButton = document.createElement('button');
    fullscreenButton.innerHTML = "LOGIN";
    fullscreenButton.style.backgroundColor = "#111";
    fullscreenButton.style.color = "#0f0";
    fullscreenButton.style.border = "2px solid #0f0";
    fullscreenButton.style.borderRadius = "5px";
    fullscreenButton.style.padding = "15px 30px";
    fullscreenButton.style.fontSize = "18px";
    fullscreenButton.style.fontFamily = "'Courier New', Courier, monospace";
    fullscreenButton.style.cursor = "pointer";
    fullscreenButton.style.boxShadow = "0 0 10px #0f0";
    fullscreenButton.style.transition = "all 0.3s ease";
    
    // Effetto hover
    fullscreenButton.onmouseover = function() {
        this.style.backgroundColor = "#0f0";
        this.style.color = "#000";
    };
    
    fullscreenButton.onmouseout = function() {
        this.style.backgroundColor = "#111";
        this.style.color = "#0f0";
    };
    
    // Quando l'utente clicca il bottone
    fullscreenButton.addEventListener('click', function() {
        requestFullScreen();
        overlay.remove(); // Rimuovi l'overlay e il bottone
        
        // Mostra il terminale
        const terminal = document.getElementById('draggable-terminal');
        if (terminal) {
            terminal.style.display = 'block';
        }
        
        // Avvia le funzioni originali
        executeCommand();
        setupDraggable(
            document.getElementById('draggable-terminal'),
            document.getElementById('title-bar')
        );
    });
    
    // Aggiungi il bottone all'overlay
    overlay.appendChild(fullscreenButton);
    
    // Aggiungi l'overlay al body
    document.body.appendChild(overlay);
}

function createFolders() {
    // Posizioni per le cartelle sulla destra (in percentuale dello schermo)
    const positions = [
        { top: '10%', left: '90%' },
        { top: '25%', left: '90%' },
        { top: '40%', left: '90%' },
        { top: '55%', left: '90%' },
        { top: '70%', left: '90%' },
        { top: '85%', left: '90%' }
    ];
    
    // Nomi delle cartelle
    const folderNames = [
        "PROJECT_ALPHA", 
        "OPERATION_NEXUS", 
        "CLASSIFIED_DATA", 
        "SECURITY_PROTOCOLS", 
        "MISSION_LOGS", 
        "PERSONNEL_FILES"
    ];
    
    // Crea le cartelle
    for (let i = 0; i < 6; i++) {
        // Crea il container della cartella
        const folder = document.createElement('div');
        folder.className = 'desktop-folder';
        folder.style.position = 'absolute';
        folder.style.top = positions[i].top;
        folder.style.left = positions[i].left;
        folder.style.textAlign = 'center';
        folder.style.cursor = 'pointer';
        folder.style.zIndex = '100';
        folder.dataset.folderName = folderNames[i]; // Aggiungi il nome della cartella come attributo data
        
        // Crea l'immagine della cartella
        const img = document.createElement('img');
        img.src = 'images/topsecret.png';
        img.style.width = '96px';
        img.style.height = 'auto';
        img.alt = 'Top Secret Folder';
        
        // Crea il testo della cartella
        const label = document.createElement('div');
        label.textContent = folderNames[i];
        label.style.color = '#0f0';
        label.style.marginTop = '8px';
        label.style.fontSize = '16px';
        label.style.fontFamily = "'Courier New', Courier, monospace";
        label.style.fontWeight = 'bold';
        label.style.textShadow = '0 0 5px #0f0';
        
        // Assembla la cartella
        folder.appendChild(img);
        folder.appendChild(label);
        
        // Aggiungi un effetto hover
        folder.addEventListener('mouseover', function() {
            img.style.filter = 'brightness(1.2)';
            label.style.textShadow = '0 0 8px #0f0';
        });
        
        folder.addEventListener('mouseout', function() {
            img.style.filter = 'brightness(1)';
            label.style.textShadow = '0 0 5px #0f0';
        });
        
        // Aggiungi l'event handler per il click
        folder.addEventListener('click', function() {
            const folderName = this.dataset.folderName;
            handleFolderClick(folderName);
        });
        
        // Aggiungi la cartella al desktop
        document.getElementById('desktop').appendChild(folder);
    }
}

// Funzioni di gestione del click per le cartelle
function handleFolderClick(folderName) {
    // Controlla se la cartella è già aperta
    if (folderOpenState[folderName]) {
        highlightOpenWindow(folderName);
        return;
    }
    
    // Imposta la cartella come aperta
    folderOpenState[folderName] = true;
    
    // Mappa delle funzioni per ciascuna cartella
    const folderHandlers = {
        "PROJECT_ALPHA": () => createInfoWindow("PROJECT_ALPHA", [
            "PROJECT_ALPHA - TOP SECRET",
            "Status: Active",
            "Clearance Level: Delta-9",
            "Project Lead: Dr. Marcus Chen",
            "Objective: Development of advanced neural interface technology",
            "Budget: $127.4M",
            "Timeline: Phase 3 - Implementation"
        ]),
        "OPERATION_NEXUS": () => createInfoWindow("OPERATION_NEXUS", [
            "OPERATION_NEXUS - TOP SECRET",
            "Status: In Progress",
            "Location: Multiple sites across Eastern Europe",
            "Operatives Deployed: 14",
            "Mission Objective: Intelligence gathering on Quantum OS",
            "Expected Completion: 47 days",
            "Risk Assessment: Medium-High"
        ]),
        "CLASSIFIED_DATA": () => createInfoWindow("CLASSIFIED_DATA", [
            "CLASSIFIED_DATA - TOP SECRET",
            "Database Status: Encrypted",
            "Last Update: 72 hours ago",
            "Data Categories:",
            "- Cryptographic Keys",
            "- Agent Identities",
            "- Operation Parameters",
            "- Asset Locations",
            "Security Breach Attempts: 17 (All Failed)"
        ]),
        "SECURITY_PROTOCOLS": () => createInfoWindow("SECURITY_PROTOCOLS", [
            "SECURITY_PROTOCOLS - TOP SECRET",
            "Current Threat Level: AMBER",
            "Authentication Protocol: Delta-7",
            "Communication Encryption: AES-512",
            "Physical Security: Level 4",
            "Emergency Response Team: STANDBY",
            "Last Protocol Update: 14 days ago",
            "Authorized Personnel: 23"
        ]),
        "MISSION_LOGS": () => createInfoWindow("MISSION_LOGS", [
            "MISSION_LOGS - TOP SECRET",
            "Recent Operations:",
            "- SILENT HAWK: Completed",
            "- IRON FORTRESS: In Progress",
            "- MIDNIGHT ECHO: Planning Phase",
            "- CRYSTAL SHIELD: Aborted",
            "Success Rate: 78%",
            "Casualties: 2",
            "Assets Recovered: 14"
        ]),
        "PERSONNEL_FILES": () => createInfoWindow("PERSONNEL_FILES", [
            "PERSONNEL_FILES - TOP SECRET",
            "Active Agents: 42",
            "Field Operatives: 26",
            "Analysts: 11",
            "Technical Support: 5",
            "Medical Personnel: 3",
            "Deep Cover Assets: 7",
            "Recruitment Status: Ongoing",
            "Training Program: Advanced"
        ])
    };
    
    // Esegui la funzione appropriata per la cartella cliccata
    if (folderHandlers[folderName]) {
        folderHandlers[folderName]();
    }
}

// Funzione per far lampeggiare una finestra già aperta per attirare l'attenzione
function highlightOpenWindow(folderName) {
    // Trova il terminale corrispondente alla cartella
    const terminal = document.querySelector(`.terminal[data-folder-name="${folderName}"]`);
    
    if (terminal) {
        // Salva il bordo originale
        const originalBorder = terminal.style.border;
        
        // Crea un effetto lampeggiante cambiando il bordo
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount % 2 === 0) {
                terminal.style.border = '2px solid #ff0';  // Giallo brillante
                terminal.style.boxShadow = '0 0 15px #ff0';
            } else {
                terminal.style.border = originalBorder || '2px solid #0f0';
                terminal.style.boxShadow = '0 0 15px #0f0, inset 0 0 10px rgba(15, 255, 15, 0.3)';
            }
            
            flashCount++;
            if (flashCount >= 6) {  // 3 lampeggi completi
                clearInterval(flashInterval);
                terminal.style.border = originalBorder || '2px solid #0f0';
                terminal.style.boxShadow = '0 0 15px #0f0, inset 0 0 10px rgba(15, 255, 15, 0.3)';
            }
        }, 150);  // Velocità del lampeggio
        
        // Porta il terminale in primo piano
        terminal.style.zIndex = '3000';
    }
}

// Funzione per creare una finestra di terminale con informazioni in posizione casuale
function createInfoWindow(title, contentLines) {
    // Crea un nuovo terminale per visualizzare le informazioni
    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000'; // Superiore agli altri elementi
    infoTerminal.style.width = '500px';
    infoTerminal.style.maxHeight = '400px';
    
    // Crea la barra del titolo
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;
    
    // Aggiungi il pulsante di chiusura
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function() {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);
    
    // Crea l'area di output per il contenuto
    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '300px';
    content.style.overflowY = 'auto';
    content.style.whiteSpace = 'pre-wrap';
    content.style.wordWrap = 'break-word';
    content.style.padding = '10px';
    
    // Aggiungi le linee di contenuto
    contentLines.forEach(line => {
        content.innerHTML += line + '<br>';
    });
    
    // Assembla il terminale
    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);
    
    // Aggiungi il terminale al desktop
    document.getElementById('desktop').appendChild(infoTerminal);
    
    // Posiziona il terminale in una posizione casuale ma completamente visibile
    positionRandomlyWithinScreen(infoTerminal);
    
    // Rendi il terminale trascinabile
    setupDraggable(infoTerminal, titleBar);
}

// Funzione per posizionare un elemento in modo casuale ma completamente visibile nella finestra
function positionRandomlyWithinScreen(element) {
    // Prima attendiamo che l'elemento sia stato renderizzato per ottenere le dimensioni corrette
    setTimeout(() => {
        // Ottieni le dimensioni della finestra
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Ottieni le dimensioni dell'elemento
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        
        // Calcola i limiti massimi per il posizionamento
        const maxLeft = windowWidth - elementWidth - 20;
        const maxTop = windowHeight - elementHeight - 20;
        
        // Genera posizioni casuali all'interno dei limiti
        const randomLeft = Math.floor(Math.random() * maxLeft) + 20;
        const randomTop = Math.floor(Math.random() * maxTop) + 20;
        
        // Applica le posizioni
        element.style.left = `${randomLeft}px`;
        element.style.top = `${randomTop}px`;
        element.style.transform = 'none';
    }, 10);
}