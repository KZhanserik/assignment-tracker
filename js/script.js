// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics,getFirestore, collection, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLrwgBEwp6YJ5GTkCEKcgYnVbexhX7HSc",
  authDomain: "assignment-169eb.firebaseapp.com",
  projectId: "assignment-169eb",
  storageBucket: "assignment-169eb.appspot.com",
  messagingSenderId: "122554567005",
  appId: "1:122554567005:web:e9cae393e1b290ab98c0b4",
  measurementId: "G-D7D80VSM8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



document.addEventListener('DOMContentLoaded', () => {
  const adminForm = document.getElementById('adminForm');
  const userForm = document.getElementById('userForm');
  const statusDisplay = document.getElementById('statusDisplay');
  const dataTable = document.getElementById('dataTable');

  if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const contract = document.getElementById('contract').value || '';
      const vkk = document.getElementById('vkk').value || '';
      const conclusion = document.getElementById('conclusion').value || '';
      const payment = document.getElementById('payment').value || '';

      const userData = { contract, vkk, conclusion, payment };

      await setDoc(doc(db, "users", username), userData);

      adminForm.reset();
      alert('User information updated!');
    });
  }

  if (userForm) {
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;

      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
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
    const loadTableData = async () => {
      const tbody = dataTable.querySelector('tbody');
      tbody.innerHTML = ''; // Clear existing data

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${doc.id}</td>
          <td>${userData.contract}</td>
          <td>${userData.vkk}</td>
          <td>${userData.conclusion}</td>
          <td>${userData.payment}</td>
        `;
        tbody.appendChild(row);
      });
    };

    loadTableData(); // Call the async function to load data
  }
});