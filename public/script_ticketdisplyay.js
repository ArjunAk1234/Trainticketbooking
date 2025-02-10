document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from local storage
    const selectedTrain = localStorage.getItem('selectedTrain');
    const selectedDepartureTime = localStorage.getItem('selectedDepartureTime');
    const selectedArrivalTime = localStorage.getItem('selectedArrivalTime');
    const selectedOrigin = localStorage.getItem('selectedOrigin');
    const selectedDestination = localStorage.getItem('selectedDestination');
    const passengerDetails = JSON.parse(localStorage.getItem('passengerDetails')) || [];

    // Populate the ticket details with retrieved data
    document.getElementById('train-name').textContent = selectedTrain || "Express Line 101";
    document.getElementById('boarding-station').textContent = selectedOrigin || "Boston";
    document.getElementById('destination').textContent = selectedDestination || "New York";
    document.getElementById('departure-time').textContent = selectedDepartureTime || "10:00 AM";
    document.getElementById('arrival-time').textContent = selectedArrivalTime || "02:00 PM";

    // Generate random seat numbers and display passenger details
    const passengerList = document.getElementById('passenger-list');
    passengerList.innerHTML = ''; // Clear previous content
    passengerDetails.forEach((passenger, index) => {
        const seatNumber = Math.floor(Math.random() * 100) + 1; // Random seat number between 1 and 100
        const passengerDiv = document.createElement('div');
        passengerDiv.innerHTML = `
            <div><strong>Passenger ${index + 1}:</strong></div>
            <div>Name: ${passenger}</div>
            <div>Seat: ${seatNumber}</div>
            <br>
        `;
        passengerList.appendChild(passengerDiv);
    });
});

document.getElementById('download-button').addEventListener('click', function() {
    const element = document.getElementById('ticket');
    html2pdf(element, {
        margin: 10,
        filename: 'ticket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
});

document.getElementById('home-button').addEventListener('click', function() {
    window.location.href = 'index.html'; // Replace with the actual path to your home page
});
