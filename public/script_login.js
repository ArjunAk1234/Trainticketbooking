// to make sure that the js is loaded correctly after the webpage is loaded
document.addEventListener('DOMContentLoaded', () => {
  generateCaptcha();
  document.querySelector('#login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendOTP();
  });
  document.querySelector('#refresh-captcha').addEventListener('click', function(e) {
    e.preventDefault();
    generateCaptcha();
  });
});
// function to generate captcha , a randoom combination of numbers ,captial and  small letters

function generateCaptcha() {
  const captchaDisplay = document.getElementById('captcha-display');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  captchaDisplay.textContent = captcha;
}
//function to send otp to the server
function sendOTP() {
  const email = document.querySelector('#logemail-login').value;
  const phone = document.querySelector('#logphone-login').value;
  const password = document.querySelector('#logpass-login').value;
  const captchaInput = document.querySelector('#captcha-login').value;
  const captchaDisplay = document.getElementById('captcha-display').textContent;

  if (captchaInput !== captchaDisplay) {
    alert('Captcha verification failed!');
    generateCaptcha();
    return;
  }

  fetch('/send-otp', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, phone, password }),
  })
  .then(response => response.json()) //Handling the Fetch Response:
  .then(data => {
    if (data.success) {
      const otp = prompt('Enter OTP sent to your email:');
      verifyOTP(otp, email, phone, password);
    } else {
      alert('Failed to send OTP: ' + data.message);
    }
  })
  .catch(error => console.error('Error:', error));
}
// verification of otp and continue with login 
// retrive data 

function verifyOTP(otp, email, phone, password) {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, phone, password, otp }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Login successful!');
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage

      if (localStorage.getItem('redirectFromTrainList') === 'true') {
        localStorage.removeItem('redirectFromTrainList'); // Clear the flag
        window.location.href = 'List.html';
      } else {
        window.location.href = '/index.html'; //redirect to homepage
      }
    } else {
      alert('Login failed: ' + data.message);
    }
  })
  .catch(error => console.error('Error:', error));
}
