const data = 
`TCR Thrissur 
CLT Kozhikode Main 
ERS Ernakulam Junction 
TVC Trivandrum Central 
AWY Aluva 
QLN Kollam Junction 
PGT Palakkad Junction 
KYJ Kayamkulam Junction 
SRR Shoranur Junction 
CAN Kannur Main 
ERN Ernakulam Town 
KTYM Kottayam 
TIR Tirur 
CNGR Chengannur 
TLY Thalassery 
BDJ Vadakara 
ALLP Alappuzha 
KCVL Kochuveli 
KGQ Kasaragod 
TRVL Tiruvalla 
PAY Payyanur 
KZE Kanhangad 
OTP Ottappalam 
VAK Varkala Sivagiri 
AFK Angamaly 
CGY Changanassery 
KTU Kuttippuram 
QLD Koyilandy 
GUV Guruvayur 
MVLK Mavelikara 
CKI Chalakudi 
KPY Karunagapalli 
IJK Irinjalakuda
PGI Parpanangadi
SRTL Cherthala
WKI Wadakanchery 
FK Ferok
PVU Paravur
PTB Pattambi
NLE Nileshwar 
AMPA Ambalappuzha 
HAD Haripad 
TRTR Tripunittura 
KPQ Kannapuram
STKT Sasthamkotta 
TA Tanur
CHV Charvattur
PAZ Payangadi
PVRD Piravam Road
NYY Neyyattinkara
CRY Chirayinkil 
KZK Kazhakuttam
PASA Parassala
KMQ Kumbala 
PGTN Palakkad Town 
VNB Vaniyambalam 
AAM Angadippuram 
NIL Nilambur Road 
TVP Thiruvananthapuram Pettah 
KVU Kadakavur
TUVR Turavur
IPL Idappally
MJS Manjeshwar 
KUV Kundara
MAKM Mararikulam 
VLI Vallikunnu 
AVS Auvaneswarem 
KQK Kotikulam 
KKZ Kottarakara
MYY Mayyanad
PUK Pudukad
PUU Punalur
PNQ Punkunnam
VARD Vaikam Road 
MNTT Mulanturutti
VAPM Valapattanam 
ETM Ettumanur
TKQ Trikarpur 
CYN Cheriyanad 
PYOL Payyoli 
KLQ Kilikollur
BFR Bekal Fort 
KRPP Kuruppanthara 
EDN Edamann 
KLGD Kollengode 
PRND Perinad
AYVN Aryankavu 
TUA Tirunnavaya 
EKN Ezhukone 
UAA Uppala 
ELM Ezhimala 
MQU Murukkampuzha 
OCR Ochira 
KN Kadalundi 
CHPD Cheppad Halt
LDY Lakkiti 
MGK Mulangunnathukavu
NEM Trivandrum Nemom 
PPNS Pappinissery 
BRAM Balaramapuram 
PDGM Pudunagaram 
MMDA Muthalamada 
OKL Ottakkal 
ETR Elattur
KUC Karukkutty
KUL Kallayi Kozhikode South
VTK Vallathol Nagar
KUMM Kumbalam
WH West Hill
WRA Walayar
KJKD Kanjikode
CS Cannanore South
PUM Pallippuram
JGE Jagannath Temple Gate
TKT Tikkotti`;


// Initialize arrays
const stations = [];


// Split the data by new line character and iterate over each line
data.split('\n').forEach(line => {
    stations.push(line);
});

console.log(stations);

// Function to generate list options
function generateListOptions(inputValue, dataList, listContainer, inputField) {
    const filteredData = dataList.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()));
    const listOptions = filteredData.map(option => `<div onclick="fillInput('${inputField}', '${option}')">${option}</div>`).join('');
    listContainer.innerHTML = listOptions;
    if (filteredData.length > 0) {
        listContainer.style.display = 'block';
    } else {
        listContainer.style.display = 'none';
    }
}

// Function to fill input field with selected option
function fillInput(inputFieldId, value) {
    document.getElementById(inputFieldId).value = value;
    document.getElementById(inputFieldId + 'List').style.display = 'none';
}

// Add event listeners for each input
function addInputEventListeners(inputId, dataList, listContainer) {
    const input = document.getElementById(inputId);
    input.addEventListener('input', event => {
        const inputValue = event.target.value;
        generateListOptions(inputValue, dataList, listContainer, inputId);
    });
}

addInputEventListeners('boardingStation', stations, document.getElementById('boardingStationList'));
addInputEventListeners('destination', stations, document.getElementById('destinationList'));


// Submit form event
document.getElementById('myForm').addEventListener('submit', event => {
    event.preventDefault();
    const boardingStationValue = document.getElementById('boardingStation').value;
    const destinationValue = document.getElementById('destination').value;
    
    // Store values in localStorage
    localStorage.setItem('boardingStation', boardingStationValue);
    localStorage.setItem('destination', destinationValue);
    
    // Redirect to another page
    location.href = "List.html";
});
