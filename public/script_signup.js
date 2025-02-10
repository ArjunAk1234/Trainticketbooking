// to make sure that the js is loaded correctly after the webpage is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
    
    document.querySelector('#refresh-captcha').addEventListener('click', function(e) {
      e.preventDefault();
      generateCaptcha();
    });
  
    const registerForm = document.querySelector('#register-form'); // getting the form for registration
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateRegistration();
      });
    } else {
      console.error("Register form not found!");
    }
  });
  // function to generate the captcha
  
  function generateCaptcha() {
    const captchaDisplay = document.getElementById('captcha-display');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    captchaDisplay.textContent = captcha;
  }
  
  // function to validate the registration form and get all the values from the form
  function register() {
    const name = document.querySelector('#regname').value;
    const email = document.querySelector('#regemail').value;
    const password = document.querySelector('#regpass').value;
    const phone = document.querySelector('#regphone').value;
    const captchaInput = document.querySelector('#captcha').value;
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone, captchaInput }),   // add to data base in json format
    })
    .then(response => {           // shows if any server loading error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            window.location.href = '/login.html';
        } else {
            alert('Registration failed: ' + data.message);
            generateCaptcha();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed: Server error');
    });
  }
  
  function validateRegistration() {
    const captchaInput = document.querySelector('#captcha').value;
    const captchaDisplay = document.getElementById('captcha-display').textContent;
  
    if (captchaInput === captchaDisplay) {
      register();
    } else {
      alert('Captcha verification failed!');
      generateCaptcha();
    }
  }
  