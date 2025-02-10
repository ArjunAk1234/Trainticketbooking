
document.addEventListener('DOMContentLoaded', () => {
    const userInfoContainer = document.getElementById('user-info');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      userInfoContainer.innerHTML = `
        <div class="navbar-text me-3">
          <strong>Welcome, ${user.name}</strong><br>
          <!--<small>Email: ${user.email}</small><br>-->
        </div>
        <button class="btn btn-danger" href="#" onclick="logout()">Logout</button>
      `;
    }
  });
  
  function logout() {
    localStorage.removeItem('user');
    window.location.href = '/index.html';
  }
  