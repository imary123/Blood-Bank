const firebaseConfig = {
  apiKey: "AIzaSyA189Uizu-kRTOoe85Vz7xz_IMiJ7Gvd4k",
  authDomain: "blood-bank-42e92.firebaseapp.com",
  databaseURL: "https://blood-bank-42e92-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blood-bank-42e92",
  storageBucket: "blood-bank-42e92.firebasestorage.app",
  messagingSenderId: "869633174615",
  appId: "1:869633174615:web:5a856a60206e8a2397c712",
  measurementId: "G-8CHZPYKVRG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  databaseURL: "https://yourproject.firebaseio.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Use Firebase database
const db = firebase.database();

let adminPassword = "1234"; // CHANGE THIS PASSWORD


function checkAdmin() {
  const input = document.getElementById("adminPass").value;
  if (input === adminPassword) {
    document.getElementById("adminSection").style.display = "block";
    alert("Welcome, Admin!");
  } else {
    alert("Incorrect password!");
  }
}

function addPerson() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const blood = document.getElementById("blood").value.toUpperCase();

  if (name && address && phone && blood) {
    people.push({ name, address, phone, blood });
    
    alert("Person added successfully!");
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("blood").value = "";
  } else {
    alert("Please fill all fields.");
  }
}

function searchByGroup() {
  const group = document.getElementById("searchGroup").value.toUpperCase();
  db.ref("people").once("value", snapshot => {
    const data = snapshot.val();
    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    if (!data) {
      resultList.innerHTML = "<li>No data found.</li>";
      return;
    }

    const entries = Object.values(data);
    const filtered = entries.filter(p => p.blood === group);

    if (filtered.length === 0) {
      resultList.innerHTML = "<li>No person found with this blood group.</li>";
      return;
    }

    filtered.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ${p.address}, ${p.phone}`;
      resultList.appendChild(li);
    });
  });
}
