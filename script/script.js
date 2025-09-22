// js/script.js

let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const form = document.getElementById("userForm");
const tbody = document.getElementById("userTableBody");
const search = document.getElementById("search");
const yearSpan = document.getElementById("year");

// Show current year
yearSpan.textContent = new Date().getFullYear();

// Render table
function renderTable(data = users) {
  tbody.innerHTML = "";
  data.forEach((user, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.language}</td>
        <td>
          <button class="edit" onclick="editUser(${index})">Edit</button>
          <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add/Edit user
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const language = document.getElementById("language").value;

  // Validation
  if (!firstName || !lastName) {
    alert("First and Last name are required");
    return;
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    alert("Enter a valid email");
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    alert("Phone must be 10 digits");
    return;
  }

  const user = { firstName, lastName, email, phone, language };

  if (editIndex === null) {
    users.push(user); // Add new
  } else {
    users[editIndex] = user; // Update existing
    editIndex = null;
  }

  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
  renderTable();
});

// Edit user
function editUser(index) {
  const user = users[index];
  document.getElementById("firstName").value = user.firstName;
  document.getElementById("lastName").value = user.lastName;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("language").value = user.language;
  editIndex = index;
}

// Delete user
function deleteUser(index) {
  if (confirm("Are you sure?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  }
}

// Search filter
search.addEventListener("input", function () {
  const term = search.value.toLowerCase();
  const filtered = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// Initial render
renderTable();
