document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminForm');
    const userForm = document.getElementById('userForm');
    const statusDisplay = document.getElementById('statusDisplay');
    const dataTable = document.getElementById('dataTable');
  
    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const contract = document.getElementById('contract').value || '';
        const vkk = document.getElementById('vkk').value || '';
        const conclusion = document.getElementById('conclusion').value || '';
        const payment = document.getElementById('payment').value || '';
  
        const userData = { contract, vkk, conclusion, payment };
        localStorage.setItem(username, JSON.stringify(userData));
  
        adminForm.reset();
        alert('User information updated!');
      });
    }
  
    if (userForm) {
      userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const userData = JSON.parse(localStorage.getItem(username));
  
        if (userData) {
          statusDisplay.innerHTML = `<h2>Status for ${username}</h2>`;
          statusDisplay.innerHTML += `
            <p>Договор: ${userData.contract}</p>
            <p>ВКК: ${userData.vkk}</p>
            <p>Заключение: ${userData.conclusion}</p>
            <p>Ожидание оплаты: ${userData.payment}</p>
          `;
        } else {
          statusDisplay.innerHTML = `<p>No data found for ${username}</p>`;
        }
      });
    }
  
    if (dataTable) {
      const tbody = dataTable.querySelector('tbody');
      tbody.innerHTML = ''; // Clear existing data
  
      for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(username));
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${username}</td>
          <td>${userData.contract}</td>
          <td>${userData.vkk}</td>
          <td>${userData.conclusion}</td>
          <td>${userData.payment}</td>
        `;
        tbody.appendChild(row);
      }
    }
  });
  