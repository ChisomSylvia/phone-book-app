
// fxn to display contact form
function showAddContactForm() {
  phoneBookForm.classList.toggle('hidden');
}
// fxn to display search form
function toggleSearch() {
  document.getElementById('searchForm').classList.toggle('hidden');
}


const phoneBookForm = document.getElementById('phoneBookForm');

phoneBookForm.addEventListener('submit', startFxn);
// fxn to initialize form action
function startFxn(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (validateInput(name, phone, email)) {
      addContact(name, phone, email);
  }
}


// fxn to validate input before adding
function validateInput(name, phone, email) {
  const phonePattern = /^(080|070|090|081|091)\d{8}$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!name) {
      alert('Name is required');
      return false;
  }
  if (!phonePattern.test(phone)) {
      alert('Please enter a valid 11-digit phone number');
      return false;
  }
  if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return false;
  }
  return true;
}

// fxn to add contact
function addContact(name, phone, email) {
  const contactList = document.getElementById('contactList');
  const li = document.createElement('li');
  li.innerHTML = `<div class="contact-name"><strong>Name:</strong> ${name}</div>
  <div class="contact-phone"><strong>Phone:</strong> ${phone}</div>
  <div class="contact-email"><strong>Email:</strong> ${email}</div>`;
  contactList.appendChild(li);

  // Clear input fields
  phoneBookForm.reset();
  phoneBookForm.classList.toggle('hidden');
  saveContact();
}


const contactList = document.getElementById('contactList');
const filter = document.getElementById('filter');

// filter and display search keyword
filter.addEventListener('input', (event) => {
  const filterText = event.target.value.toLowerCase();
  const contacts = Array.from(contactList.getElementsByTagName('li'));

  contacts.filter(contact => {
    const name = contact.querySelector('.contact-name').textContent.toLowerCase();
    const phone = contact.querySelector('.contact-phone').textContent.toLowerCase();

    if (name.includes(filterText) || phone.includes(filterText)) {
      contact.style.display = '';
    } else {
      contact.style.display = 'none';
    }
  });
});


// To save already created list
function saveContact() {
  localStorage.setItem("contacts", contactList.innerHTML);
}

function showContact() {
  contactList.innerHTML = localStorage.getItem("contacts");
}
showContact();