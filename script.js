const output = document.getElementById("output");
const input = document.getElementById("input");
const correctPassword = "J081";

const commands = [
    "Starting network scan...",
    "Connecting to server 192.168.1.1...",
    "Handshake request... Awaiting response...",
    "01001110: Accessing data...",
    "Bypassing firewall...",
    "Decoding TCP/IP packets...",
    "11010100... Detected packets in transit...",
    "Checking vulnerability CVE-2023-0001...",
    "Buffer overflow bug detected...",
    "11001001: Encrypting sensitive data...",
    "Extracting user credentials...",
    "Administrative access successfully obtained!",
    "11000101: Secure data transmission activated...",
    "Bypassing antivirus protections...",
    "01100110: Intercepted encrypted data stream...",
    "Dumping MySQL database...",
    "Verifying SHA-256 hash...",
    "11000011: Hash encoding completed...",
    "Scanning for open ports on 192.168.1.100...",
    "Port 22 (SSH) open. Attempting connection...",
    "01110111: SSH access key verified...",
    "Installing remote backdoor...",
    "RSA 2048 encryption activated...",
    "11011001: Secure communication established...",
    "Executing buffer overflow exploit...",
    "Extracting server configuration file...",
    "Downloading system registry...",
    "00011110: File dump completed!",
    "Initiating secure log deletion...",
    "Accessing encrypted network files...",
    "Connection established!",
    "Insert password:"
];


let commandIndex = 0;
function executeCommand() {
    if (commandIndex < commands.length) {
        writeOutput(commands[commandIndex]);
        commandIndex++;
        setTimeout(executeCommand, 5); // Delay between commands
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
        if (userInput.toUpperCase() === correctPassword.toUpperCase()) {
            writeOutput("> Access granted!");

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
            writeOutput("> Access denied!");
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

document.addEventListener('DOMContentLoaded', function () {
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
    document.getElementById('player').addEventListener('ended', function () {
        document.getElementById('video-terminal').style.display = 'none';
        createFolders();
    });
});

function preventDefaultBrowserBehaviors() {
    // Previeni il refresh da tastiera (F5, Ctrl+R)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Previeni il refresh dal menu contestuale del browser
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Previeni il refresh tramite swipe su dispositivi touch
    document.addEventListener('touchstart', function (e) {
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
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    });

    // Blocca la storia del browser
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
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
    fullscreenButton.onmouseover = function () {
        this.style.backgroundColor = "#0f0";
        this.style.color = "#000";
    };

    fullscreenButton.onmouseout = function () {
        this.style.backgroundColor = "#111";
        this.style.color = "#0f0";
    };

    // Quando l'utente clicca il bottone
    fullscreenButton.addEventListener('click', function () {
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
    const folderNames = [
        "PROJECT_ALPHA",
        "OPERATION_NEXUS",
        "CLASSIFIED_DATA",
        "SECURITY_PROTOCOLS",
        "MISSION_LOGS",
        "PERSONNEL_FILES",
        "INTEL_ARCHIVE",
        "TACTICAL_ASSETS",
        "COMMAND_DIRECTIVES"
    ];

    const minDistance = 120; // distanza minima in px tra le cartelle
    const placedPositions = [];

    for (let i = 0; i < folderNames.length; i++) {
        const folder = document.createElement('div');
        folder.className = 'desktop-folder';
        folder.style.position = 'absolute';

        // Trova una posizione libera
        let topPx, leftPx;
        let tries = 0;
        const maxTries = 100;

        do {
            const randomTopPercent = Math.floor(Math.random() * 70) + 10;
            const randomLeftPercent = Math.floor(Math.random() * 70) + 10;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            topPx = (randomTopPercent / 100) * viewportHeight;
            leftPx = (randomLeftPercent / 100) * viewportWidth;

            tries++;
        } while (
            tries < maxTries &&
            placedPositions.some(pos => {
                const dx = pos.left - leftPx;
                const dy = pos.top - topPx;
                return Math.sqrt(dx * dx + dy * dy) < minDistance;
            })
        );

        placedPositions.push({ top: topPx, left: leftPx });

        folder.style.top = `${topPx}px`;
        folder.style.left = `${leftPx}px`;
        folder.style.textAlign = 'center';
        folder.style.cursor = 'pointer';
        folder.style.zIndex = '100';
        folder.dataset.folderName = folderNames[i];

        const img = document.createElement('img');
        img.src = 'images/topsecret.png';
        img.style.width = '96px';
        img.style.height = 'auto';
        img.alt = 'Top Secret Folder';

        const label = document.createElement('div');
        label.textContent = folderNames[i];
        if (folderNames[i] === 'PROJECT_ALPHA') {
            label.style.color = '#ECF300';
        } else {
            label.style.color = '#0f0';
        }
        label.style.marginTop = '8px';
        label.style.fontSize = '16px';
        label.style.fontFamily = "'Courier New', Courier, monospace";
        label.style.fontWeight = 'bold';
        label.style.textShadow = '0 0 5px #0f0';

        folder.appendChild(img);
        folder.appendChild(label);

        folder.addEventListener('mouseover', function () {
            img.style.filter = 'brightness(1.2)';
            label.style.textShadow = '0 0 8px #0f0';
        });

        folder.addEventListener('mouseout', function () {
            img.style.filter = 'brightness(1)';
            label.style.textShadow = '0 0 5px #0f0';
        });

        folder.addEventListener('click', function () {
            const folderName = this.dataset.folderName;
            handleFolderClick(folderName);
        });

        document.getElementById('desktop').appendChild(folder);
    }

    // Stato di apertura
    folderOpenState["INTEL_ARCHIVE"] = false;
    folderOpenState["TACTICAL_ASSETS"] = false;
    folderOpenState["COMMAND_DIRECTIVES"] = false;
}


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
        "PROJECT_ALPHA": createProjectAlphaWindow,
        "OPERATION_NEXUS": createOperationNexusWindow,
        "CLASSIFIED_DATA": createClassifiedDataWindow,
        "SECURITY_PROTOCOLS": createSecurityProtocolsWindow,
        "MISSION_LOGS": createMissionLogsWindow,
        "PERSONNEL_FILES": createPersonnelFilesWindow,
        "INTEL_ARCHIVE": createIntelArchiveWindow,
        "TACTICAL_ASSETS": createTacticalAssetsWindow,
        "COMMAND_DIRECTIVES": createCommandDirectivesWindow
    };

    // Esegui la funzione appropriata per la cartella cliccata
    if (folderHandlers[folderName]) {
        folderHandlers[folderName]();
    }
}

// Find the existing script.js code, and modify the following functions:

function createProjectAlphaWindow() {
    const title = "PROJECT_ALPHA";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '500px';
    infoTerminal.style.maxHeight = '400px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '300px';
    content.style.overflowY = 'auto';
    content.style.padding = '15px';
    content.style.fontFamily = 'monospace';
    content.style.fontSize = '18px';
    content.style.backgroundColor = '#000';

    // Creare elementi di testo per ogni identificativo cassaforte
    const textContent = document.createElement('div');
    textContent.style.width = '100%';
    textContent.style.height = '100%';


    const lineElement = document.createElement('div');
        lineElement.style.margin = '10px 0';
        lineElement.style.color = 'white';
        lineElement.innerHTML = `
            <span style="font-weight: bold;">SILO DELTA</span>
        `;
        textContent.appendChild(lineElement);
    // Generare il contenuto dinamico dagli identificativi delle casseforti
    for (const windowName in codici_cassaforte) {
        const safeCodes = codici_cassaforte[windowName];
        const lineElement = document.createElement('div');
        lineElement.style.margin = '10px 0';
        lineElement.style.color = safeCodes.codice_colore;
        lineElement.innerHTML = `
            ID: <span style="font-weight: bold;">${safeCodes.identificativoCassaforte}</span>
        `;
        textContent.appendChild(lineElement);
    }

    content.appendChild(textContent);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    // Applicare stili personalizzati per la scrollbar, se la funzione esiste
    if (typeof applyScrollbarStyles === 'function') {
        applyScrollbarStyles(content);
    }

    document.getElementById('desktop').appendChild(infoTerminal);

    // Setup draggable se la funzione esiste
    if (typeof setupDraggable === 'function') {
        setupDraggable(infoTerminal, titleBar);
    }

    // Posizionare la finestra, se la funzione esiste
    if (typeof positionRandomlyWithinScreen === 'function') {
        positionRandomlyWithinScreen(infoTerminal);
    }
}

function createSecurityProtocolsWindow() {
    const title = "SECURITY_PROTOCOLS";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createOperationNexusWindow() {
    const title = "OPERATION_NEXUS";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createClassifiedDataWindow() {
    const title = "CLASSIFIED_DATA";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createMissionLogsWindow() {
    const title = "MISSION_LOGS";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createPersonnelFilesWindow() {
    const title = "PERSONNEL_FILES";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createIntelArchiveWindow() {
    const title = "INTEL_ARCHIVE";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createTacticalAssetsWindow() {
    const title = "TACTICAL_ASSETS";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
}

function createCommandDirectivesWindow() {
    const title = "COMMAND_DIRECTIVES";

    const infoTerminal = document.createElement('div');
    infoTerminal.className = 'terminal';
    infoTerminal.dataset.folderName = title;
    infoTerminal.style.position = 'absolute';
    infoTerminal.style.zIndex = '2000';
    infoTerminal.style.width = '1000px';
    infoTerminal.style.maxHeight = '800px';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = `<span>${title}</span>`;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function () {
        infoTerminal.remove();
        folderOpenState[title] = false;
    });
    titleBar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `info-output-${title}`;
    content.style.height = '600px';
    content.style.overflowY = 'auto';
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';

    const gif = document.createElement('img');
    gif.src = 'images/console.gif';
    gif.style.width = '100%';  // Fill width of container
    gif.style.height = '100%'; // Fill height of container
    gif.style.objectFit = 'contain'; // contain entire area while maintaining aspect ratio
    gif.style.maxWidth = '100%';
    gif.style.maxHeight = '100%';

    content.appendChild(gif);
    const CODE_OVERLAY = document.createElement('div');
    CODE_OVERLAY.id = `code-overlay-${title}`;
    CODE_OVERLAY.classList.add('code-overlay');

    content.appendChild(CODE_OVERLAY);

    infoTerminal.appendChild(titleBar);
    infoTerminal.appendChild(content);

    applyScrollbarStyles(content);

    document.getElementById('desktop').appendChild(infoTerminal);

    setupDraggable(infoTerminal, titleBar);
    positionRandomlyWithinScreen(infoTerminal);
    animateCode(`code-overlay-${title}`, title);
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

function applyScrollbarStyles(contentElement) {
    // Apply WebKit scrollbar styles
    contentElement.style.scrollbarWidth = 'thin';
    contentElement.style.scrollbarColor = '#0f0 #111';

    // The pseudo-element styles (::-webkit-scrollbar) cannot be applied through JavaScript
    // So we'll add a class to the element instead
    contentElement.classList.add('terminal-content');
}

// Inizializzazione dell'array
const codici_cassaforte = [];

codici_cassaforte["OPERATION_NEXUS"] = {
    codice: "10101010", // Codice binario a 8 bit
    codice_colore: "#FF0000", // Rosso
    identificativoCassaforte: "5247-8931/42"
};

codici_cassaforte["CLASSIFIED_DATA"] = {
    codice: "11001100", // Codice binario a 8 bit
    codice_colore: "#FF7F00", // Arancione
    identificativoCassaforte: "6385-1274/43"
};

codici_cassaforte["SECURITY_PROTOCOLS"] = {
    codice: "00110011", // Codice binario a 8 bit
    codice_colore: "#FFFF00", // Giallo
    identificativoCassaforte: "7429-5631/44"
};

//GIUSTO
codici_cassaforte["MISSION_LOGS"] = {
    codice: "10011001", // Codice binario a 8 bit
    codice_colore: "#00FF00", // Verde
    identificativoCassaforte: "9613-5223/68"
};

codici_cassaforte["PERSONNEL_FILES"] = {
    codice: "01100110", // Codice binario a 8 bit
    codice_colore: "#0000FF", // Blu
    identificativoCassaforte: "3842-9157/46"
};

codici_cassaforte["INTEL_ARCHIVE"] = {
    codice: "11110000", // Codice binario a 8 bit
    codice_colore: "#07edda", // Indaco
    identificativoCassaforte: "2937-4826/47"
};

//GIUSTO
codici_cassaforte["TACTICAL_ASSETS"] = {
    codice: "00001111", // Codice binario a 8 bit
    codice_colore: "#9400D3", // Viola
    identificativoCassaforte: "8712-2312/12"
};

codici_cassaforte["COMMAND_DIRECTIVES"] = {
    codice: "10100101", // Codice binario a 8 bit
    codice_colore: "#FFC0CB", // Rosa
    identificativoCassaforte: "1658-7493/49"
};

function animateCode(id, title) {
    if (title !== 'PROJECT_ALPHA') {
        const codeOverlay = document.getElementById(id);
        const code = codici_cassaforte[title].codice;
        const color = codici_cassaforte[title].codice_colore;

        // Reset dell'elemento
        codeOverlay.innerHTML = '';

        // Stile contenitore principale - manteniamo semplice
        codeOverlay.style.position = 'absolute';
        codeOverlay.style.fontFamily = 'monospace';
        codeOverlay.style.fontSize = '50px';
        codeOverlay.style.color = color;
        codeOverlay.style.top = '50%';
        codeOverlay.style.left = '50%';
        codeOverlay.style.transform = 'translate(-50%, -50%)';
        codeOverlay.style.textAlign = 'center';
        


        
        const digitValue = document.createElement('span');
        digitValue.style.transition = 'transform 0.2s, opacity 0.2s';
        digitValue.style.display = 'inline-block'; // Importante per gli effetti di scala
        codeOverlay.appendChild(digitValue);

        let index = 0;

        function showNextDigit() {
            if (index < code.length) {
                // Effetto di transizione
                digitValue.style.transform = 'scale(0.5)';
                digitValue.style.opacity = '0';

                setTimeout(() => {
                    // Aggiorna il valore
                    digitValue.textContent = code[index];

                    // Effetto di apparizione
                    digitValue.style.transform = 'scale(1.3)';
                    digitValue.style.opacity = '1';

                    setTimeout(() => {
                        // Ritorna alla dimensione normale
                        digitValue.style.transform = 'scale(1)';

                        // Passa alla prossima cifra
                        index++;
                        setTimeout(showNextDigit, 400);
                    }, 200);
                }, 200);
            } else {
                // Effetto di fine sequenza
                digitValue.style.transform = 'scale(0)';
                digitValue.style.opacity = '0';

                setTimeout(() => {
                    // Resetta per ricominciare
                    index = 0;
                    setTimeout(showNextDigit, 1000);
                }, 500);
            }
        }

        showNextDigit(); // Avvia l'animazione
    }
}