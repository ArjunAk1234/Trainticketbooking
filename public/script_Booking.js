
document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('click', function() {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        showStep(this.getAttribute('data-step'));
    });
});

function showStep(step) {
    document.querySelectorAll('.box').forEach(box => box.style.display = 'none');
    if (step === 'review-journey') {
        document.querySelector('.review-journey').style.display = 'block';
    } else if (step === 'payment') {
        document.querySelector('.payment-details').style.display = 'block';
    } else if (step === 'passenger-details') {
        document.querySelector('.passenger-details').style.display = 'block';
    }
}

// Initialize the display
showStep('passenger-details');

document.getElementById('next-review').addEventListener('click', function() {
    storePassengerDetails();
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step[data-step="review-journey"]').classList.add('active');
    showStep('review-journey');
    displayTrainDetails();
});

document.getElementById('next-payment').addEventListener('click', function() {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step[data-step="payment"]').classList.add('active');
    showStep('payment');
});

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve selected train details from localStorage
    const selectedTrain = localStorage.getItem('selectedTrain');
    const selectedDepartureTime = localStorage.getItem('selectedDepartureTime');
    const selectedArrivalTime = localStorage.getItem('selectedArrivalTime');
    const selectedOrigin = localStorage.getItem('selectedOrigin');
    const selectedDestination = localStorage.getItem('selectedDestination');

    // Display selected train details
    if (selectedTrain && selectedDepartureTime && selectedArrivalTime && selectedOrigin && selectedDestination) {
        const reviewDetails = document.getElementById('review-details');
        reviewDetails.innerHTML = `
            <p><strong>Train Name:</strong> ${selectedTrain}</p>
            <p><strong>Origin:</strong> ${selectedOrigin}</p>
            <p><strong>Destination:</strong> ${selectedDestination}</p>
            <p><strong>Departure Time:</strong> ${selectedDepartureTime}</p>
            <p><strong>Arrival Time:</strong> ${selectedArrivalTime}</p>
        `;
    }

    // Handle the number of passengers input
    document.getElementById('num-passengers').addEventListener('input', function() {
        const numPassengers = parseInt(this.value);
        const passengerInputs = document.getElementById('passenger-inputs');
        passengerInputs.innerHTML = ''; // Clear previous inputs

        for (let i = 1; i <= numPassengers; i++) {
            const passengerFieldset = document.createElement('fieldset');
            passengerFieldset.innerHTML = `
                <legend>Passenger ${i}</legend>
                <label for="passenger-name-${i}">Passenger Name</label>
                <input type="text" id="passenger-name-${i}" name="passenger-name-${i}" placeholder="e.g., Avikshith" required><br><br>
                <label for="age-${i}">Age</label>
                <input type="number" id="age-${i}" name="age-${i}" required><br><br>
                <label for="gender-${i}">Gender</label>
                <select id="gender-${i}" name="gender-${i}">
                    <option>Male</option>
                    <option>Female</option>
                </select><br><br>
                <label for="berth-preference-${i}">Berth Preference</label>
                <input type="text" id="berth-preference-${i}" name="berth-preference-${i}" placeholder="Upper/Lower/Middle" required><br><br>
            `;
            passengerInputs.appendChild(passengerFieldset);
        }
    });
});

function storePassengerDetails() {
    const numPassengers = parseInt(document.getElementById('num-passengers').value);
    const passengers = [];

    for (let i = 1; i <= numPassengers; i++) {
        const name = document.getElementById(`passenger-name-${i}`).value;
        passengers.push(name);
    }

    localStorage.setItem('passengerDetails', JSON.stringify(passengers));
}

function displayTrainDetails() {
    const selectedTrain = localStorage.getItem('selectedTrain');
    const selectedDepartureTime = localStorage.getItem('selectedDepartureTime');
    const selectedArrivalTime = localStorage.getItem('selectedArrivalTime');
    const selectedOrigin = localStorage.getItem('selectedOrigin');
    const selectedDestination = localStorage.getItem('selectedDestination');

    if (selectedTrain && selectedDepartureTime && selectedArrivalTime && selectedOrigin && selectedDestination) {
        const reviewDetails = document.getElementById('review-details');
        reviewDetails.innerHTML = `
            <p><strong>Train Name:</strong> ${selectedTrain}</p>
            <p><strong>Origin:</strong> ${selectedOrigin}</p>
            <p><strong>Destination:</strong> ${selectedDestination}</p>
            <p><strong>Departure Time:</strong> ${selectedDepartureTime}</p>
            <p><strong>Arrival Time:</strong> ${selectedArrivalTime}</p>
        `;
    }
}
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function viewTicket() {
    window.location.href = "ticketdisplay.html";
}
function validateForm(){
    modal.style.display = "block";
}
