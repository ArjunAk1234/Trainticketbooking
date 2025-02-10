document.addEventListener('DOMContentLoaded', () => {
    const boardingStation = localStorage.getItem('boardingStation');
    const destination = localStorage.getItem('destination');

    const trains = [
        { origin: boardingStation, destination: destination, trainName: "Rajadhani Express" },
        { origin: boardingStation, destination: destination, trainName: "Maveli Express" },
        { origin: boardingStation, destination: destination, trainName: "Netravati Express" },
        { origin: boardingStation, destination: destination, trainName: "Jan Shatabdi Express" },
        { origin: boardingStation, destination: destination, trainName: "Banglore Express" },
        { origin: boardingStation, destination: destination, trainName: "Pune Express" },
    ];

    // Function to create train cards
    function generateRandomTime(afterTime = null) {
        const randomSeconds = afterTime ? Math.random() * (86400 - afterTime) + afterTime : Math.random() * 86400;
        const randomDate = new Date(randomSeconds * 1000);
        const hours = randomDate.getUTCHours();
        const minutes = randomDate.getUTCMinutes();
        return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
    }

    function createTrainCard(train) {
        const card = document.createElement("div");
        card.classList.add("train-card");

        const heading = document.createElement("h2");
        heading.textContent = train.trainName;

        const origin = document.createElement("p");
        origin.textContent = "Origin: " + train.origin;

        const destination = document.createElement("p");
        destination.textContent = "Destination: " + train.destination;

        const departureTime = generateRandomTime();
        const arrivalTime = generateRandomTime();

        const departureTimeElement = document.createElement("p");
        departureTimeElement.textContent = "Departure Time: " + departureTime;

        const arrivalTimeElement = document.createElement("p");
        arrivalTimeElement.textContent = "Arrival Time: " + arrivalTime;

        const bookButton = document.createElement("button");
        bookButton.textContent = "Book Now";

        // Add event listener to the book button
        bookButton.addEventListener('click', () => {
            if (checkLogin()) {
                showLoginModal();
            } else {
                localStorage.setItem('selectedTrain', train.trainName);
                localStorage.setItem('selectedDestination', train.destination);
                localStorage.setItem('selectedOrigin', train.origin);
                localStorage.setItem('selectedDepartureTime', departureTime);
                localStorage.setItem('selectedArrivalTime', arrivalTime);
                window.location.href = 'Booking.html';
            }
        });

        card.appendChild(heading);
        card.appendChild(origin);
        card.appendChild(destination);
        card.appendChild(departureTimeElement);
        card.appendChild(arrivalTimeElement);
        card.appendChild(bookButton);

        return card;
    }

    // Function to display train cards
    function displayTrainCards() {
        const trainList = document.getElementById("train-list");
        trains.forEach(train => {
            const card = createTrainCard(train);
            trainList.appendChild(card);
        });
    }

    // Function to check if the user is logged in
    function checkLogin() {
        const user = JSON.parse(localStorage.getItem('user'));
        return !user;
    }

    // Function to show login modal
    function showLoginModal() {
        const loginPromptModal = document.getElementById('loginPromptModal');
        loginPromptModal.style.display = 'block';
    }

    // Close the login prompt modal
    document.getElementById('closeLoginPrompt').onclick = function() {
        document.getElementById('loginPromptModal').style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        const loginPromptModal = document.getElementById('loginPromptModal');
        if (event.target == loginPromptModal) {
            loginPromptModal.style.display = 'none';
        }
    }

    // Login button click event
    document.getElementById('loginButton').onclick = function() {
        window.location.href = 'login.html';
        localStorage.setItem('redirectFromTrainList', 'true');
    }

    // Back button click event
    document.getElementById('backButton').onclick = function() {
        document.getElementById('loginPromptModal').style.display = 'none';
    }

    // Display train cards when the page loads
    displayTrainCards();
});