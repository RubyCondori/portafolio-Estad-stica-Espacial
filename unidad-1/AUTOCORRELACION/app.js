/* ============================================================================
   METADATA & GEOGRAPHIC CONFIGURATIONS
   ============================================================================ */

// Centroids of Peru's 25 Departments (approximate coordinates in longitude/latitude)
const DEPT_CENTROIDS = {
    1: { name: "Amazonas", lon: -77.8, lat: -6.2, abbr: "AMA" },
    2: { name: "Ancash", lon: -77.5, lat: -9.5, abbr: "ANC" },
    3: { name: "Apurímac", lon: -73.1, lat: -14.0, abbr: "APU" },
    4: { name: "Arequipa", lon: -71.5, lat: -16.0, abbr: "ARE" },
    5: { name: "Ayacucho", lon: -74.2, lat: -14.0, abbr: "AYA" },
    6: { name: "Cajamarca", lon: -78.5, lat: -7.2, abbr: "CAJ" },
    7: { name: "Callao", lon: -77.1, lat: -12.1, abbr: "CAL" },
    8: { name: "Cusco", lon: -72.0, lat: -13.5, abbr: "CUS" },
    9: { name: "Huancavelica", lon: -75.0, lat: -12.8, abbr: "HUV" },
    10: { name: "Huánuco", lon: -76.2, lat: -9.9, abbr: "HUA" },
    11: { name: "Ica", lon: -75.7, lat: -14.0, abbr: "ICA" },
    12: { name: "Junín", lon: -75.5, lat: -11.5, abbr: "JUN" },
    13: { name: "La Libertad", lon: -78.8, lat: -8.1, abbr: "LAL" },
    14: { name: "Lambayeque", lon: -79.9, lat: -6.8, abbr: "LAM" },
    15: { name: "Lima", lon: -76.6, lat: -12.0, abbr: "LIM" },
    16: { name: "Loreto", lon: -75.0, lat: -3.7, abbr: "LOR" },
    17: { name: "Madre de Dios", lon: -70.8, lat: -12.6, abbr: "MDD" },
    18: { name: "Moquegua", lon: -70.9, lat: -17.2, abbr: "MOQ" },
    19: { name: "Pasco", lon: -75.5, lat: -10.4, abbr: "PAS" },
    20: { name: "Piura", lon: -80.6, lat: -5.2, abbr: "PIU" },
    21: { name: "Puno", lon: -70.0, lat: -15.5, abbr: "PUN" },
    22: { name: "San Martín", lon: -76.7, lat: -6.6, abbr: "SAM" },
    23: { name: "Tacna", lon: -70.3, lat: -17.6, abbr: "TAC" },
    24: { name: "Tumbes", lon: -80.4, lat: -3.6, abbr: "TUM" },
    25: { name: "Ucayali", lon: -74.6, lat: -8.4, abbr: "UCA" }
};

// Grid Coordinates for Cartogram Rendering
const DEPT_GRID = {
    1: { r: 2, c: 3 }, // Amazonas
    2: { r: 4, c: 2 }, // Ancash
    3: { r: 6, c: 4 }, // Apurimac
    4: { r: 7, c: 4 }, // Arequipa
    5: { r: 6, c: 3 }, // Ayacucho
    6: { r: 2, c: 2 }, // Cajamarca
    7: { r: 5, c: 1 }, // Callao
    8: { r: 5, c: 5 }, // Cusco
    9: { r: 5, c: 3 }, // Huancavelica
    10: { r: 3, c: 3 }, // Huanuco
    11: { r: 6, c: 2 }, // Ica
    12: { r: 4, c: 3 }, // Junin
    13: { r: 3, c: 2 }, // La Libertad
    14: { r: 3, c: 1 }, // Lambayeque
    15: { r: 5, c: 2 }, // Lima
    16: { r: 1, c: 4 }, // Loreto
    17: { r: 4, c: 6 }, // Madre de Dios
    18: { r: 8, c: 4 }, // Moquegua
    19: { r: 4, c: 4 }, // Pasco
    20: { r: 2, c: 1 }, // Piura
    21: { r: 6, c: 6 }, // Puno
    22: { r: 2, c: 4 }, // San Martin
    23: { r: 9, c: 5 }, // Tacna
    24: { r: 1, c: 1 }, // Tumbes
    25: { r: 3, c: 5 }  // Ucayali
};

// Queen Contiguity Adjacency List for Peru's 25 Departments
const QUEEN_NEIGHBORS = {
    1: [6, 13, 22, 16],       // Amazonas
    2: [13, 10, 19, 15],      // Ancash
    3: [5, 8, 4],             // Apurimac
    4: [11, 5, 3, 8, 21, 18],  // Arequipa
    5: [9, 11, 4, 3, 8, 12],   // Ayacucho
    6: [20, 14, 13, 1],       // Cajamarca
    7: [15],                  // Callao (Enclosed by Lima - linked to ensure connectivity)
    8: [12, 25, 17, 21, 4, 3, 5], // Cusco
    9: [15, 12, 5, 11],       // Huancavelica
    10: [2, 13, 22, 16, 25, 19], // Huanuco
    11: [15, 9, 5, 4],        // Ica
    12: [19, 25, 8, 5, 9, 15],  // Junin
    13: [14, 6, 1, 22, 10, 2], // La Libertad
    14: [20, 6, 13],          // Lambayeque
    15: [2, 19, 12, 9, 11, 7],  // Lima
    16: [1, 22, 25],          // Loreto
    17: [25, 8, 21],          // Madre de Dios
    18: [4, 21, 23],          // Moquegua
    19: [2, 10, 25, 12, 15],   // Pasco
    20: [24, 14, 6],          // Piura
    21: [8, 17, 4, 18, 23],   // Puno
    22: [1, 13, 10, 16],      // San Martin
    23: [18, 21],             // Tacna
    24: [20],                 // Tumbes
    25: [16, 10, 19, 12, 8, 17] // Ucayali
};

// Spellings dictionary to handle fuzzy name normalization
const DEPT_NAME_MAP = {
    "amazonas": 1, "ancash": 2, "apurimac": 3, "arequipa": 4, "ayacucho": 5,
    "cajamarca": 6, "callao": 7, "cusco": 8, "cuzco": 8, "huancavelica": 9,
    "huanuco": 10, "ica": 11, "junin": 12, "la libertad": 13, "libertad": 13,
    "lambayeque": 14, "lima": 15, "loreto": 16, "madre de dios": 17, "moquegua": 18,
    "pasco": 19, "piura": 20, "puno": 21, "san martin": 22, "tacna": 23,
    "tumbes": 24, "ucayali": 25
};

// Predefined Preloaded Variables
const PREDEFINED_VARIABLES = {
    crops: [
        { id: "CACAO", name: "Cacao (Mód. 1896)", colVal: "P224D_SUP_1", nameCol: "P224B_NOM" },
        { id: "PLATANO", name: "Plátano (Mód. 1896)", colVal: "P224D_SUP_1", nameCol: "P224B_NOM" },
        { id: "PAPA", name: "Papa (Mód. 1896)", colVal: "P224D_SUP_1", nameCol: "P224B_NOM" },
        { id: "CAFE", name: "Café (Mód. 1896)", colVal: "P224D_SUP_1", nameCol: "P224B_NOM" },
        { id: "OREGANO", name: "Orégano (Mód. 1896)", colVal: "P224D_SUP_1", nameCol: "P224B_NOM" }
    ],
    pastures: [
        { id: "PASTO BRAQUIARIA", name: "Pasto Braquiaria (Mód. 1895)", colVal: "P218C_PROD_CORTE_ENT", nameCol: "P204_NOM" },
        { id: "PASTO BRIZANTA", name: "Pasto Brizanta/Brizantha (Mód. 1895)", colVal: "P218C_PROD_CORTE_ENT", nameCol: "P204_NOM" },
        { id: "ALFALFA", name: "Alfalfa (Mód. 1895)", colVal: "P218C_PROD_CORTE_ENT", nameCol: "P204_NOM" }
    ]
};

/* ============================================================================
   GLOBAL STATE VARIABLES
   ============================================================================ */
let activeDataset = "crops"; // "crops", "pastures", "custom"
let parsedRows = []; // Raw rows from CSV parsing
let customHeaders = []; // For custom CSV upload
let aggregatedData = {}; // Department-level aggregated values: { id: { value, code, name } }
let spatialWeights = {}; // Row-standardized spatial weights: { i: { j: weight } }
let calculatedResults = {}; // Final results: { id: { val, z, wz, localI, pValue, quadrant } }
let activeMapTab = "value"; // "value", "lisa"
let globalMoranResult = {}; // { observed, expected, variance, zScore, pValue, mcPValue }

/* ============================================================================
   INITIALIZATION & EVENT HANDLERS
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initDOMElements();
    loadPredefinedVariables();
    setupSpatialWeights();
    triggerProcess();
});

// Cache elements for quick access
let elDatasetSelect, elUploadContainer, elDropZone, elFileInput, elFileInfo, elFileName, elRemoveFileBtn,
    elCustomColsContainer, elColDeptSelect, elColValSelect, elPredefinedVarsContainer, elVariableSelect,
    elAggregationSelect, elWeightsSelect, elBtnProcess, elLoadingOverlay, elLoadingText, elPeruCartogram,
    elMapLegend, elTableBody, elTooltip, canvasScatter, canvasHistogram, btnMapValue, btnMapLisa;

function initDOMElements() {
    elDatasetSelect = document.getElementById("dataset-select");
    elUploadContainer = document.getElementById("upload-container");
    elDropZone = document.getElementById("drop-zone");
    elFileInput = document.getElementById("csv-file-input");
    elFileInfo = document.getElementById("file-info");
    elFileName = document.getElementById("file-name");
    elRemoveFileBtn = document.getElementById("remove-file-btn");
    elCustomColsContainer = document.getElementById("custom-columns-container");
    elColDeptSelect = document.getElementById("col-dept-select");
    elColValSelect = document.getElementById("col-val-select");
    elPredefinedVarsContainer = document.getElementById("predefined-vars-container");
    elVariableSelect = document.getElementById("variable-select");
    elAggregationSelect = document.getElementById("aggregation-select");
    elWeightsSelect = document.getElementById("weights-select");
    elBtnProcess = document.getElementById("btn-process");
    elLoadingOverlay = document.getElementById("loading-overlay");
    elLoadingText = document.getElementById("loading-text");
    elPeruCartogram = document.getElementById("peru-cartogram");
    elMapLegend = document.getElementById("map-legend");
    elTableBody = document.getElementById("table-body");
    elTooltip = document.getElementById("tooltip");
    
    canvasScatter = document.getElementById("lisa-scatter");
    canvasHistogram = document.getElementById("value-histogram");
    
    btnMapValue = document.getElementById("btn-map-value");
    btnMapLisa = document.getElementById("btn-map-lisa");

    // Event listeners
    elDatasetSelect.addEventListener("change", handleDatasetChange);
    elBtnProcess.addEventListener("click", triggerProcess);
    
    btnMapValue.addEventListener("click", () => setMapTab("value"));
    btnMapLisa.addEventListener("click", () => setMapTab("lisa"));
    
    // Custom File Drag & Drop events
    elDropZone.addEventListener("click", () => elFileInput.click());
    elFileInput.addEventListener("change", handleFileSelect);
    elDropZone.addEventListener("dragover", (e) => { e.preventDefault(); elDropZone.classList.add("dragover"); });
    elDropZone.addEventListener("dragleave", () => elDropZone.classList.remove("dragover"));
    elDropZone.addEventListener("drop", handleFileDrop);
    elRemoveFileBtn.addEventListener("click", resetCustomFile);
}

function showLoading(text) {
    elLoadingText.textContent = text;
    elLoadingOverlay.classList.remove("hidden");
}

function hideLoading() {
    elLoadingOverlay.classList.add("hidden");
}

function setMapTab(tab) {
    activeMapTab = tab;
    btnMapValue.classList.toggle("active", tab === "value");
    btnMapLisa.classList.toggle("active", tab === "lisa");
    renderMap();
}

/* ============================================================================
   DATA LOADING & PARSING HANDLERS
   ============================================================================ */
function handleDatasetChange() {
    activeDataset = elDatasetSelect.value;
    
    if (activeDataset === "custom") {
        elUploadContainer.classList.remove("hidden");
        elCustomColsContainer.classList.remove("hidden");
        elPredefinedVarsContainer.classList.add("hidden");
    } else {
        elUploadContainer.classList.add("hidden");
        elCustomColsContainer.classList.add("hidden");
        elPredefinedVarsContainer.classList.remove("hidden");
        loadPredefinedVariables();
    }
}

function loadPredefinedVariables() {
    elVariableSelect.innerHTML = "";
    const list = PREDEFINED_VARIABLES[activeDataset];
    list.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.id;
        opt.textContent = v.name;
        elVariableSelect.appendChild(opt);
    });
}

// Custom CSV drag & drop parser
function handleFileDrop(e) {
    e.preventDefault();
    elDropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
        parseCustomFile(e.dataTransfer.files[0]);
    }
}

function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        parseCustomFile(e.target.files[0]);
    }
}

function parseCustomFile(file) {
    showLoading("Analizando archivo CSV...");
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            hideLoading();
            if (results.errors.length > 0 && results.data.length === 0) {
                alert("Error al parsear el CSV. Verifica el formato.");
                return;
            }
            
            parsedRows = results.data;
            customHeaders = results.meta.fields;
            
            // Show file info UI
            elFileName.innerHTML = `<i class="fas fa-file-csv"></i> ${file.name} (${parsedRows.length} registros)`;
            elDropZone.classList.add("hidden");
            elFileInfo.classList.remove("hidden");
            
            // Populate Column select boxes
            populateCustomColumns();
        },
        error: function(err) {
            hideLoading();
            alert("Error: " + err.message);
        }
    });
}

function populateCustomColumns() {
    elColDeptSelect.innerHTML = '<option value="">-- Seleccionar departamento --</option>';
    elColValSelect.innerHTML = '<option value="">-- Seleccionar variable --</option>';
    
    customHeaders.forEach(h => {
        const optDept = document.createElement("option");
        optDept.value = h;
        optDept.textContent = h;
        elColDeptSelect.appendChild(optDept);
        
        const optVal = document.createElement("option");
        optVal.value = h;
        optVal.textContent = h;
        elColValSelect.appendChild(optVal);
    });
    
    // Smart defaults detection
    const deptMatch = customHeaders.find(h => ["ccdd", "nombredd", "departamento", "depto", "region", "region_name"].includes(h.toLowerCase()));
    if (deptMatch) elColDeptSelect.value = deptMatch;
    
    const valMatch = customHeaders.find(h => ["valor", "value", "total", "cantidad", "tasa"].includes(h.toLowerCase()));
    if (valMatch) elColValSelect.value = valMatch;
}

function resetCustomFile() {
    parsedRows = [];
    customHeaders = [];
    elFileInput.value = "";
    elFileInfo.classList.add("hidden");
    elDropZone.classList.remove("hidden");
    elColDeptSelect.innerHTML = '<option value="">-- Seleccionar departamento --</option>';
    elColValSelect.innerHTML = '<option value="">-- Seleccionar variable --</option>';
}

/* ============================================================================
   TRIGGER PROCESS & PIPELINE
   ============================================================================ */
function triggerProcess() {
    showLoading("Procesando datos y calculando autocorrelación...");
    
    // Small delay to let loading screen render
    setTimeout(() => {
        if (activeDataset === "custom") {
            processCustomDataset();
        } else {
            fetchAndProcessPreloadedDataset();
        }
    }, 100);
}

function fetchAndProcessPreloadedDataset() {
    let csvPath = "";
    if (activeDataset === "crops") {
        csvPath = "973-Modulo1896/04_CAP200B_1.csv";
    } else {
        csvPath = "973-Modulo1895/03_CAP200A.csv";
    }
    
    Papa.parse(csvPath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            parsedRows = results.data;
            processPreloadedDataset();
        },
        error: function(err) {
            hideLoading();
            let msg = `Error al cargar el dataset: ${err.message}.\n\n`;
            if (window.location.protocol === 'file:') {
                msg += "⚠️ RESTRICCIÓN DE SEGURIDAD DEL NAVEGADOR (CORS):\n" +
                       "Estás abriendo la página directamente desde tu disco duro (url file:///). " +
                       "Los navegadores bloquean la lectura de archivos locales por defecto.\n\n" +
                       "Para solucionarlo:\n" +
                       "1. Selecciona 'Cargar Archivo CSV Personalizado' y sube el archivo manualmente.\n" +
                       "2. Usa un servidor web local (ej. la extensión Live Server de VS Code).\n" +
                       "3. Sube tus cambios a GitHub y ábrelo en tu dirección de GitHub Pages.";
            } else {
                msg += `Asegúrate de que el archivo existe en la ruta: ${csvPath}`;
            }
            alert(msg);
        }
    });
}

/* ============================================================================
   AGGREGATION & CALCULATION ENGINE
   ============================================================================ */

// Normalize name string to match DEPT_NAME_MAP keys
function normalizeString(str) {
    if (!str) return "";
    return str.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9 ]/g, "")
        .trim();
}

function processPreloadedDataset() {
    const selectedVarId = elVariableSelect.value;
    const selectedVarMeta = PREDEFINED_VARIABLES[activeDataset].find(v => v.id === selectedVarId);
    const aggMethod = elAggregationSelect.value;
    
    // Group rows by department name
    const grouped = {};
    for (let i = 1; i <= 25; i++) {
        grouped[i] = [];
    }
    
    parsedRows.forEach(row => {
        // Find department code
        const deptNorm = normalizeString(row.NOMBREDD);
        const code = DEPT_NAME_MAP[deptNorm];
        if (code && grouped[code]) {
            grouped[code].push(row);
        }
    });
    
    // Aggregate values
    aggregatedData = {};
    for (let code = 1; code <= 25; code++) {
        const rows = grouped[code];
        const deptName = DEPT_CENTROIDS[code].name;
        
        if (rows.length === 0) {
            aggregatedData[code] = { value: 0, code, name: deptName };
            continue;
        }
        
        let aggregatedVal = 0;
        
        if (aggMethod === "rate") {
            // adoption rate = UAs growing the selected crop/pasture / total UAs in the department
            const nameCol = selectedVarMeta.nameCol;
            const uniqueUAs = new Set(rows.map(r => `${r.ID_PROD}_${r.UA}`));
            const uniqueUAsWithVar = new Set(
                rows.filter(r => r[nameCol] && normalizeString(r[nameCol]) === normalizeString(selectedVarId))
                    .map(r => `${r.ID_PROD}_${r.UA}`)
            );
            aggregatedVal = uniqueUAs.size > 0 ? (uniqueUAsWithVar.size / uniqueUAs.size) : 0;
        } else {
            // average or sum of the value column (e.g. area or production)
            const valCol = selectedVarMeta.colVal;
            const nameCol = selectedVarMeta.nameCol;
            
            // Filter records matching the specific crop/pasture
            const matchedRows = rows.filter(r => r[nameCol] && normalizeString(r[nameCol]) === normalizeString(selectedVarId));
            
            let sumVal = 0;
            let sumWeights = 0;
            let count = 0;
            
            matchedRows.forEach(r => {
                const val = parseFloat(r[valCol]) || 0;
                const weight = parseFloat(r.FACTOR_PRODUCTOR) || 1.0;
                sumVal += val * weight;
                sumWeights += weight;
                count++;
            });
            
            if (aggMethod === "sum") {
                aggregatedVal = sumVal;
            } else if (aggMethod === "mean") {
                aggregatedVal = sumWeights > 0 ? (sumVal / sumWeights) : 0;
            }
        }
        
        aggregatedData[code] = { value: aggregatedVal, code, name: deptName };
    }
    
    runSpatialAutocorrelationPipeline();
}

function processCustomDataset() {
    const colDept = elColDeptSelect.value;
    const colVal = elColValSelect.value;
    const aggMethod = elAggregationSelect.value;
    
    if (!colDept || !colVal) {
        hideLoading();
        alert("Por favor, selecciona las columnas de Departamento y Variable.");
        return;
    }
    
    // Group rows by department name
    const grouped = {};
    for (let i = 1; i <= 25; i++) {
        grouped[i] = [];
    }
    
    parsedRows.forEach(row => {
        let deptVal = row[colDept];
        if (deptVal) {
            // It could be numeric UBIGEO code or string name
            let code = null;
            if (Number.isInteger(deptVal)) {
                // If it is UBIGEO code (typically 1-25)
                const num = parseInt(deptVal);
                if (num >= 1 && num <= 25) code = num;
            } else {
                const deptNorm = normalizeString(deptVal);
                code = DEPT_NAME_MAP[deptNorm];
            }
            
            if (code && grouped[code]) {
                grouped[code].push(row);
            }
        }
    });
    
    // Aggregate values
    aggregatedData = {};
    for (let code = 1; code <= 25; code++) {
        const rows = grouped[code];
        const deptName = DEPT_CENTROIDS[code].name;
        
        if (rows.length === 0) {
            aggregatedData[code] = { value: 0, code, name: deptName };
            continue;
        }
        
        let aggregatedVal = 0;
        let sum = 0;
        let count = 0;
        
        rows.forEach(r => {
            const val = parseFloat(r[colVal]);
            if (!isNaN(val)) {
                sum += val;
                count++;
            }
        });
        
        if (aggMethod === "sum") {
            aggregatedVal = sum;
        } else if (aggMethod === "mean") {
            aggregatedVal = count > 0 ? (sum / count) : 0;
        } else if (aggMethod === "rate") {
            // For custom rate, assume variable is binary (1 or 0), find adoption rate
            let positiveCount = rows.filter(r => parseInt(r[colVal]) === 1 || r[colVal] === true).length;
            aggregatedVal = count > 0 ? (positiveCount / count) : 0;
        }
        
        aggregatedData[code] = { value: aggregatedVal, code, name: deptName };
    }
    
    runSpatialAutocorrelationPipeline();
}

/* ============================================================================
   SPATIAL WEIGHTS MATRIX BUILDER
   ============================================================================ */
function setupSpatialWeights() {
    const weightsType = elWeightsSelect.value;
    spatialWeights = {};
    
    if (weightsType === "queen") {
        // Row-standardized Queen contiguity
        for (let code = 1; code <= 25; code++) {
            const neighbors = QUEEN_NEIGHBORS[code] || [];
            spatialWeights[code] = {};
            
            const w = neighbors.length > 0 ? (1.0 / neighbors.length) : 0;
            neighbors.forEach(n => {
                spatialWeights[code][n] = w;
            });
        }
    } else {
        // kNN weights based on centroid distances
        const k = weightsType === "knn4" ? 4 : 2;
        
        for (let i = 1; i <= 25; i++) {
            const cI = DEPT_CENTROIDS[i];
            const distances = [];
            
            for (let j = 1; j <= 25; j++) {
                if (i === j) continue;
                const cJ = DEPT_CENTROIDS[j];
                const d = Math.sqrt(Math.pow(cI.lon - cJ.lon, 2) + Math.pow(cI.lat - cJ.lat, 2));
                distances.push({ code: j, dist: d });
            }
            
            // Sort by distance and select top k
            distances.sort((a, b) => a.dist - b.dist);
            const nearest = distances.slice(0, k);
            
            spatialWeights[i] = {};
            const w = 1.0 / k;
            nearest.forEach(n => {
                spatialWeights[i][n.code] = w;
            });
        }
    }
}

/* ============================================================================
   MORAN'S I & LISA CORE CALCULATOR
   ============================================================================ */
function runSpatialAutocorrelationPipeline() {
    setupSpatialWeights(); // Make sure weights are up to date
    
    const N = 25;
    const values = [];
    for (let code = 1; code <= 25; code++) {
        values.push(aggregatedData[code].value);
    }
    
    // 1. Calculate Mean and Standard Deviation
    const mean = values.reduce((sum, v) => sum + v, 0) / N;
    const sqDiffSum = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0);
    const stdDev = sqDiffSum > 0 ? Math.sqrt(sqDiffSum / N) : 1; // Population SD
    
    // 2. Standardize variable values: z_i = (x_i - mean) / stdDev
    const z = {};
    for (let code = 1; code <= 25; code++) {
        z[code] = stdDev > 0 ? ((aggregatedData[code].value - mean) / stdDev) : 0;
    }
    
    // 3. Compute Spatial Lags: wz_i = sum_j w_ij * z_j
    const wz = {};
    for (let i = 1; i <= 25; i++) {
        let lag = 0;
        const weights = spatialWeights[i] || {};
        for (let j in weights) {
            lag += weights[j] * (z[j] || 0);
        }
        wz[i] = lag;
    }
    
    // 4. Calculate Global Moran's I
    // Since z is standardized (mean=0, variance=1), Global Moran's I is:
    // I = sum(z_i * wz_i) / sum(z_i^2) = sum(z_i * wz_i) / N
    let sumZwz = 0;
    for (let i = 1; i <= 25; i++) {
        sumZwz += z[i] * wz[i];
    }
    const globalMoranI = sqDiffSum > 0 ? (sumZwz / N) : 0;
    
    // 5. Compute expectation and variance under randomization
    const E_I = -1.0 / (N - 1);
    
    // Compute S0, S1, S2 parameters for variance calculation
    let S0 = 0;
    let S1 = 0;
    let S2 = 0;
    
    // S2 terms
    const sumRowW = {};
    const sumColW = {};
    for (let i = 1; i <= 25; i++) {
        sumRowW[i] = 0;
        sumColW[i] = 0;
    }
    
    for (let i = 1; i <= 25; i++) {
        for (let j = 1; j <= 25; j++) {
            const w_ij = spatialWeights[i][j] || 0;
            const w_ji = spatialWeights[j][i] || 0;
            
            S0 += w_ij;
            S1 += 0.5 * Math.pow(w_ij + w_ji, 2);
            
            sumRowW[i] += w_ij;
            sumColW[j] += w_ij;
        }
    }
    
    for (let i = 1; i <= 25; i++) {
        S2 += Math.pow(sumRowW[i] + sumColW[i], 2);
    }
    
    // Kurtosis of the variable
    const m4 = values.reduce((sum, v) => sum + Math.pow(v - mean, 4), 0) / N;
    const m2 = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / N;
    const b2 = m2 > 0 ? (m4 / Math.pow(m2, 2)) : 3.0; // Kurtosis
    
    // Variance under randomization assumption
    const A = N * ((N*N - 3*N + 3) * S1 - N * S2 + 3 * S0*S0);
    const B = b2 * ((N*N - N) * S1 - 2 * N * S2 + 6 * S0*S0);
    const C = (N - 1) * (N - 2) * (N - 3) * S0*S0;
    const Var_I = C > 0 ? ((A - B) / C - Math.pow(E_I, 2)) : 0.0001;
    
    // Z-Score and analytical p-value
    const zScore = Var_I > 0 ? ((globalMoranI - E_I) / Math.sqrt(Var_I)) : 0;
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
    
    // 6. Monte Carlo permutation for Global Moran (999 permutations)
    let mcCount = 0;
    const numPermutations = 999;
    const mcPerms = [];
    
    for (let p = 0; p < numPermutations; p++) {
        // Shuffle z values
        const zArray = Object.values(z);
        shuffleArray(zArray);
        
        let pSumZwz = 0;
        for (let i = 1; i <= 25; i++) {
            let lag = 0;
            const weights = spatialWeights[i] || {};
            for (let j in weights) {
                const idx = parseInt(j) - 1;
                lag += weights[j] * zArray[idx];
            }
            pSumZwz += zArray[i - 1] * lag;
        }
        const permI = pSumZwz / N;
        mcPerms.push(permI);
        
        if (Math.abs(permI) >= Math.abs(globalMoranI)) {
            mcCount++;
        }
    }
    const mcPValue = (mcCount + 1) / (numPermutations + 1);
    
    globalMoranResult = {
        observed: globalMoranI,
        expected: E_I,
        variance: Var_I,
        zScore: zScore,
        pValue: pValue,
        mcPValue: mcPValue
    };
    
    // 7. LISA Local Moran Calculations & Significance Permutations
    calculatedResults = {};
    
    for (let i = 1; i <= 25; i++) {
        const localI = z[i] * wz[i];
        
        // Permutation test for local significance of region i
        let localMcCount = 0;
        const targetZ = z[i];
        
        // Create pool of other regions' z-values
        const otherZ = [];
        for (let j = 1; j <= 25; j++) {
            if (i === j) continue;
            otherZ.push(z[j]);
        }
        
        const weights = spatialWeights[i] || {};
        const neighborsCodes = Object.keys(weights).map(Number);
        
        for (let p = 0; p < numPermutations; p++) {
            shuffleArray(otherZ);
            
            // Calculate lag with shuffled values
            let pLag = 0;
            neighborsCodes.forEach((nCode, idx) => {
                pLag += weights[nCode] * otherZ[idx];
            });
            
            const permLocalI = targetZ * pLag;
            if (Math.abs(permLocalI) >= Math.abs(localI)) {
                localMcCount++;
            }
        }
        const localPValue = (localMcCount + 1) / (numPermutations + 1);
        
        // LISA Quadrant classification
        let quadrant = "NS"; // Not Significant
        if (localPValue < 0.05) {
            if (z[i] > 0 && wz[i] > 0) quadrant = "HH"; // High-High (Hotspot)
            else if (z[i] < 0 && wz[i] < 0) quadrant = "LL"; // Low-Low (Coldspot)
            else if (z[i] > 0 && wz[i] < 0) quadrant = "HL"; // High-Low (Outlier)
            else if (z[i] < 0 && wz[i] > 0) quadrant = "LH"; // Low-High (Outlier)
        }
        
        calculatedResults[i] = {
            val: aggregatedData[i].value,
            z: z[i],
            wz: wz[i],
            localI: localI,
            pValue: localPValue,
            quadrant: quadrant
        };
    }
    
    // Update Dashboard UI Views
    hideLoading();
    updateUIViews();
}

/* ============================================================================
   SUPPORT MATH & UTILITY FUNCTIONS
   ============================================================================ */

// Cumulative Standard Normal Distribution (Polynomial approximation)
function normalCDF(x) {
    const t = 1.0 / (1.0 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2.0);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) {
        return 1.0 - p;
    } else {
        return p;
    }
}

// Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* ============================================================================
   UI RENDERING & GRAPHICS GENERATOR
   ============================================================================ */
function updateUIViews() {
    renderGlobalStats();
    renderMap();
    renderLISAScatterPlot();
    renderHistogram();
    renderDetailsTable();
}

function renderGlobalStats() {
    const res = globalMoranResult;
    
    // Observed value with animation
    const elMoran = document.getElementById("val-moran-i");
    elMoran.textContent = res.observed.toFixed(4);
    
    // Icon color based on sign
    const elIcon = document.getElementById("moran-indicator-icon");
    elIcon.className = "fas";
    if (res.pValue < 0.05) {
        if (res.observed > 0) {
            elIcon.classList.add("fa-arrow-trend-up", "pos");
        } else {
            elIcon.classList.add("fa-arrow-trend-down", "neg");
        }
    } else {
        elIcon.classList.add("fa-circle", "text-muted");
    }
    
    // Interpretation text
    const elType = document.getElementById("val-moran-type");
    if (res.pValue < 0.05) {
        if (res.observed > 0) {
            elType.innerHTML = "<span style='color: #4cd137; font-weight:600;'>Autocorrelación Espacial Positiva</span> (Clústeres similares)";
        } else {
            elType.innerHTML = "<span style='color: #ff4757; font-weight:600;'>Autocorrelación Espacial Negativa</span> (Dispersión espacial)";
        }
    } else {
        elType.innerHTML = "<span style='color: var(--text-secondary);'>Patrón Espacial Aleatorio</span> (Sin autocorrelación significativa)";
    }
    
    // Analytical stats
    document.getElementById("val-expected-i").textContent = res.expected.toFixed(4);
    document.getElementById("val-variance-i").textContent = res.variance.toFixed(5);
    document.getElementById("val-z-score").textContent = res.zScore.toFixed(2);
    
    const elPVal = document.getElementById("val-p-value");
    elPVal.textContent = res.pValue < 0.0001 ? "< 0.0001" : res.pValue.toFixed(4);
    
    const elPSig = document.getElementById("val-p-sig");
    if (res.pValue < 0.01) {
        elPSig.className = "stat-badge badge-sig";
        elPSig.textContent = "Altamente Sig. (p < 0.01)";
        elPSig.style.backgroundColor = "rgba(76, 209, 55, 0.2)";
    } else if (res.pValue < 0.05) {
        elPSig.className = "stat-badge badge-sig";
        elPSig.textContent = "Significativo (p < 0.05)";
        elPSig.style.backgroundColor = "rgba(76, 209, 55, 0.15)";
    } else {
        elPSig.className = "stat-badge badge-gray";
        elPSig.textContent = "No Significativo";
        elPSig.style.backgroundColor = "rgba(107, 114, 128, 0.15)";
    }
    
    // Monte Carlo stats
    document.getElementById("val-mc-p-value").textContent = res.mcPValue.toFixed(4);
}

function renderMap() {
    elPeruCartogram.innerHTML = "";
    
    // Values range detection
    const values = Object.values(aggregatedData).map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal;
    
    // Create cartogram grid tiles
    for (let code = 1; code <= 25; code++) {
        const gridPos = DEPT_GRID[code];
        const res = calculatedResults[code];
        const name = DEPT_CENTROIDS[code].name;
        const abbr = DEPT_CENTROIDS[code].abbr;
        
        const tile = document.createElement("div");
        tile.className = `depto-tile cell-${code}`;
        tile.style.gridRow = gridPos.r;
        tile.style.gridColumn = gridPos.c;
        
        // Text layers
        tile.innerHTML = `
            <span class="tile-abbr">${abbr}</span>
            <span class="tile-name">${name}</span>
        `;
        
        // Color mapping
        if (activeMapTab === "value") {
            // Continuous scale
            const percent = range > 0 ? ((res.val - minVal) / range) : 0;
            // From dark indigo/blue to neon violet/magenta
            // HSL path: H (240 -> 320), S (70% -> 90%), L (15% -> 55%)
            const h = 230 + (percent * 90);
            const s = 50 + (percent * 40);
            const l = 12 + (percent * 40);
            tile.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
            tile.style.borderColor = `hsl(${h}, ${s}%, ${l}%)`;
            
            // Text color logic for legibility
            tile.style.color = l > 50 ? "#0a0c16" : "#f3f4f6";
            tile.querySelector(".tile-abbr").style.color = l > 50 ? "#0a0c16" : "#ffffff";
            tile.querySelector(".tile-name").style.color = l > 50 ? "rgba(0,0,0,0.7)" : "var(--text-secondary)";
        } else {
            // LISA Quadrants classes
            tile.classList.add(`tile-lisa-${res.quadrant.toLowerCase()}`);
        }
        
        // Tooltip interaction events
        tile.addEventListener("mouseenter", (e) => showDeptTooltip(e, code));
        tile.addEventListener("mousemove", (e) => moveTooltip(e));
        tile.addEventListener("mouseleave", () => hideTooltip());
        
        elPeruCartogram.appendChild(tile);
    }
    
    renderMapLegend(minVal, maxVal);
}

function renderMapLegend(minVal, maxVal) {
    elMapLegend.innerHTML = "";
    
    if (activeMapTab === "value") {
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span>Bajo (${minVal.toFixed(3)})</span>
            <div class="legend-gradient" style="background: linear-gradient(90deg, hsl(230, 50%, 12%), hsl(320, 90%, 52%));"></div>
            <span>Alto (${maxVal.toFixed(3)})</span>
        `;
        elMapLegend.appendChild(item);
    } else {
        const quadrants = [
            { id: "HH", label: "Alto-Alto (Hotspot)", color: "var(--color-hh)" },
            { id: "LL", label: "Bajo-Bajo (Coldspot)", color: "var(--color-ll)" },
            { id: "HL", label: "Alto-Bajo (Outlier)", color: "var(--color-hl)" },
            { id: "LH", label: "Bajo-Alto (Outlier)", color: "var(--color-lh)" },
            { id: "NS", label: "No Significativo", color: "var(--color-ns)" }
        ];
        
        quadrants.forEach(q => {
            const item = document.createElement("div");
            item.className = "legend-item";
            item.innerHTML = `
                <div class="legend-color" style="background: ${q.color}"></div>
                <span>${q.label}</span>
            `;
            elMapLegend.appendChild(item);
        });
    }
}

/* ============================================================================
   TOOLTIP LOGIC
   ============================================================================ */
function showDeptTooltip(e, code) {
    const res = calculatedResults[code];
    const dept = DEPT_CENTROIDS[code];
    
    let quadText = "No Significativo";
    if (res.quadrant === "HH") quadText = "Alto-Alto (Hotspot)";
    else if (res.quadrant === "LL") quadText = "Bajo-Bajo (Coldspot)";
    else if (res.quadrant === "HL") quadText = "Alto-Bajo (Outlier)";
    else if (res.quadrant === "LH") quadText = "Bajo-Alto (Outlier)";
    
    elTooltip.innerHTML = `
        <div class="tooltip-title">${dept.name} (${dept.abbr})</div>
        <div class="tooltip-row">
            <span class="tooltip-label">Valor Original:</span>
            <span class="tooltip-value">${res.val.toFixed(4)}</span>
        </div>
        <div class="tooltip-row">
            <span class="tooltip-label">Estándar (z):</span>
            <span class="tooltip-value">${res.z.toFixed(4)}</span>
        </div>
        <div class="tooltip-row">
            <span class="tooltip-label">Lag Espacial (wz):</span>
            <span class="tooltip-value">${res.wz.toFixed(4)}</span>
        </div>
        <div class="tooltip-row" style="margin-top: 6px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            <span class="tooltip-label">Moran Local (I<sub>i</sub>):</span>
            <span class="tooltip-value">${res.localI.toFixed(4)}</span>
        </div>
        <div class="tooltip-row">
            <span class="tooltip-label">p-Valor Local:</span>
            <span class="tooltip-value">${res.pValue.toFixed(4)}</span>
        </div>
        <div class="tooltip-row" style="font-weight: bold; margin-top: 4px;">
            <span class="tooltip-label">Clase:</span>
            <span class="tooltip-value text-${res.quadrant.toLowerCase()}">${quadText}</span>
        </div>
    `;
    
    elTooltip.classList.remove("hidden");
    moveTooltip(e);
}

function moveTooltip(e) {
    const tooltipWidth = elTooltip.offsetWidth;
    const tooltipHeight = elTooltip.offsetHeight;
    
    // Offset standard position to follow mouse cursor
    let x = e.pageX + 15;
    let y = e.pageY + 15;
    
    // Edge bounds check
    if (x + tooltipWidth > window.innerWidth) {
        x = e.pageX - tooltipWidth - 15;
    }
    if (y + tooltipHeight > window.innerHeight) {
        y = e.pageY - tooltipHeight - 15;
    }
    
    elTooltip.style.left = `${x}px`;
    elTooltip.style.top = `${y}px`;
}

function hideTooltip() {
    elTooltip.classList.add("hidden");
}

/* ============================================================================
   LISA SCATTER PLOT & HISTOGRAM GENERATORS (RAW CANVAS RENDERING)
   ============================================================================ */
function renderLISAScatterPlot() {
    const ctx = canvasScatter.getContext("2d");
    const W = canvasScatter.width;
    const H = canvasScatter.height;
    ctx.clearRect(0, 0, W, H);
    
    const margin = 35;
    const graphW = W - 2 * margin;
    const graphH = H - 2 * margin;
    
    // Find limits for axes
    const zList = Object.values(calculatedResults).map(r => r.z);
    const wzList = Object.values(calculatedResults).map(r => r.wz);
    
    const maxZ = Math.max(...zList.map(Math.abs), ...wzList.map(Math.abs), 1.0);
    const limit = maxZ * 1.15; // padding
    
    // Coordinate conversion utilities
    function toCanvasX(zVal) {
        return margin + ((zVal - (-limit)) / (2 * limit)) * graphW;
    }
    
    function toCanvasY(wzVal) {
        return margin + graphH - ((wzVal - (-limit)) / (2 * limit)) * graphH;
    }
    
    // 1. Draw quadrant boundary crosshair (0,0 axes)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), margin);
    ctx.lineTo(toCanvasX(0), margin + graphH);
    ctx.moveTo(margin, toCanvasY(0));
    ctx.lineTo(margin + graphW, toCanvasY(0));
    ctx.stroke();
    ctx.setLineDash([]); // Reset
    
    // 2. Linear Regression Line (wz = I * z)
    // The slope of the regression line is exactly the Global Moran's I
    const slope = globalMoranResult.observed;
    const lineZ1 = -limit;
    const lineWz1 = slope * lineZ1;
    const lineZ2 = limit;
    const lineWz2 = slope * lineZ2;
    
    ctx.strokeStyle = "rgba(139, 92, 246, 0.7)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(lineZ1), toCanvasY(lineWz1));
    ctx.lineTo(toCanvasX(lineZ2), toCanvasY(lineWz2));
    ctx.stroke();
    
    // 3. Draw Points representing departments
    Object.keys(calculatedResults).forEach(code => {
        const res = calculatedResults[code];
        const cx = toCanvasX(res.z);
        const cy = toCanvasY(res.wz);
        
        let color = "var(--color-ns)"; // Default Gray
        if (res.quadrant === "HH") color = "var(--color-hh)";
        else if (res.quadrant === "LL") color = "var(--color-ll)";
        else if (res.quadrant === "HL") color = "var(--color-hl)";
        else if (res.quadrant === "LH") color = "var(--color-lh)";
        
        ctx.fillStyle = color;
        ctx.shadowBlur = res.quadrant !== "NS" ? 8 : 0;
        ctx.shadowColor = color;
        
        ctx.beginPath();
        ctx.arc(cx, cy, 6.5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Outline border on point
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0; // reset shadow
        ctx.stroke();
    });
    
    // 4. Draw axis scales labels
    ctx.fillStyle = "var(--text-muted)";
    ctx.font = "600 8px Poppins";
    ctx.textAlign = "center";
    ctx.fillText(`-${limit.toFixed(1)}`, margin, margin + graphH + 12);
    ctx.fillText(`${limit.toFixed(1)}`, margin + graphW, margin + graphH + 12);
    
    ctx.textAlign = "right";
    ctx.fillText(`-${limit.toFixed(1)}`, margin - 6, margin + graphH);
    ctx.fillText(`${limit.toFixed(1)}`, margin - 6, margin + 6);
}

function renderHistogram() {
    const ctx = canvasHistogram.getContext("2d");
    const W = canvasHistogram.width;
    const H = canvasHistogram.height;
    ctx.clearRect(0, 0, W, H);
    
    const margin = 35;
    const graphW = W - 2 * margin;
    const graphH = H - 2 * margin;
    
    const values = Object.values(aggregatedData).map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal;
    
    // Define 5 equidistant bins
    const numBins = 5;
    const binWidth = range > 0 ? (range / numBins) : 1;
    const bins = Array(numBins).fill(0);
    
    values.forEach(v => {
        let idx = Math.floor((v - minVal) / binWidth);
        if (idx >= numBins) idx = numBins - 1; // handle edge maxVal
        if (idx < 0) idx = 0;
        bins[idx]++;
    });
    
    const maxFreq = Math.max(...bins, 1);
    const colW = graphW / numBins;
    
    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
        const yLine = margin + graphH - (i / 4) * graphH;
        ctx.beginPath();
        ctx.moveTo(margin, yLine);
        ctx.lineTo(margin + graphW, yLine);
        ctx.stroke();
    }
    
    // Draw Bars
    bins.forEach((freq, idx) => {
        const barH = (freq / maxFreq) * graphH;
        const x = margin + idx * colW + 4;
        const y = margin + graphH - barH;
        const barW = colW - 8;
        
        // Gradient styling
        const gradient = ctx.createLinearGradient(x, y, x, y + barH);
        gradient.addColorStop(0, "var(--accent)");
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.2)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        
        // Draw frequency number above bar
        if (freq > 0) {
            ctx.fillStyle = "var(--text-secondary)";
            ctx.font = "bold 9px Poppins";
            ctx.textAlign = "center";
            ctx.fillText(freq, x + barW / 2, y - 5);
        }
    });
    
    // X-Axis bounds label values
    ctx.fillStyle = "var(--text-muted)";
    ctx.font = "600 8px Poppins";
    ctx.textAlign = "center";
    
    for (let i = 0; i <= numBins; i++) {
        const labelVal = minVal + i * binWidth;
        const xPos = margin + i * colW;
        ctx.fillText(labelVal.toFixed(2), xPos, margin + graphH + 12);
    }
    
    // Y-Axis bounds label values
    ctx.textAlign = "right";
    ctx.fillText("0", margin - 6, margin + graphH);
    ctx.fillText(maxFreq, margin - 6, margin + 6);
}

function renderDetailsTable() {
    elTableBody.innerHTML = "";
    
    // Sort departments by code ascending
    const codes = Object.keys(calculatedResults).map(Number).sort((a, b) => a - b);
    
    codes.forEach(code => {
        const res = calculatedResults[code];
        const name = DEPT_CENTROIDS[code].name;
        
        let quadLabel = "No Significativo";
        let quadClass = "row-ns";
        
        if (res.quadrant === "HH") { quadLabel = "Alto-Alto (Hotspot)"; quadClass = "row-hh"; }
        else if (res.quadrant === "LL") { quadLabel = "Bajo-Bajo (Coldspot)"; quadClass = "row-ll"; }
        else if (res.quadrant === "HL") { quadLabel = "Alto-Bajo (Outlier)"; quadClass = "row-hl"; }
        else if (res.quadrant === "LH") { quadLabel = "Bajo-Alto (Outlier)"; quadClass = "row-lh"; }
        
        const tr = document.createElement("tr");
        tr.className = `table-row-${code}`;
        tr.innerHTML = `
            <td>${code}</td>
            <td><strong>${name}</strong></td>
            <td>${res.val.toFixed(4)}</td>
            <td>${res.z.toFixed(4)}</td>
            <td>${res.wz.toFixed(4)}</td>
            <td>${res.localI.toFixed(4)}</td>
            <td>${res.pValue.toFixed(4)}</td>
            <td>
                <span class="stat-badge ${res.pValue < 0.05 ? 'badge-sig' : 'badge-gray'}">
                    ${res.pValue < 0.05 ? 'Significativo' : 'No Sig.'}
                </span>
            </td>
            <td>
                <span class="lisa-indicator ${quadClass}">
                    <span class="indicator-dot" style="background-color: var(--color-${res.quadrant.toLowerCase()})"></span>
                    ${quadLabel}
                </span>
            </td>
        `;
        
        // Highlight corresponding tile on table hover
        tr.addEventListener("mouseenter", () => {
            const tile = document.querySelector(`.cell-${code}`);
            if (tile) tile.style.transform = "scale(1.15)";
        });
        tr.addEventListener("mouseleave", () => {
            const tile = document.querySelector(`.cell-${code}`);
            if (tile) tile.style.transform = "scale(1.0)";
        });
        
        elTableBody.appendChild(tr);
    });
}
