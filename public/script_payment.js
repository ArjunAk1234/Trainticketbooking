function generateRandomValues() {
    // Generate random values for additional fee and discount
    const additionalFee = Math.floor(Math.random() * 2000) + 10;
    
    // Ensure discount is less than 50 percent of additional fee
    const maxDiscount = Math.floor(additionalFee * 0.3);
    const discount = Math.floor(Math.random() * maxDiscount);
    
    // Calculate total price
    const totalPrice =  additionalFee - discount;

    // Return an object containing the generated values
    return {
        additionalFee,
        discount,
        totalPrice
    };
}

// Display random order summary values
function displayRandomValues() {
    const { additionalFee, discount, totalPrice } = generateRandomValues();

    // Display the random values in the respective elements
    document.getElementById('additionalFee').textContent = additionalFee;
    document.getElementById('discount').textContent = discount;
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Display random values on load
displayRandomValues();

// Get the modal
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

function validateForm() {
    var email = document.getElementById("email").value;
    var cardNumber = document.getElementById("card-number").value;
    var expiryDate = document.getElementById("expiry-date").value;
    var cvv = document.getElementById("cvv").value;
    if (!email || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill all the fields");
        return false; // Prevent form submission
    }
    if (isNaN(cardNumber) || isNaN(cvv)) {
        alert("Please enter a valid card number and CVV");
        return false;
    }

    modal.style.display = "block"; // Display the modal if validation passes
    return true; // Allow form submission if all fields are filled correctly
}

function viewTicket() {
    window.location.href = "ticketdisplay.html";
}s