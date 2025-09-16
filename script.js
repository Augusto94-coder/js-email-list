const API_URL = "https://flynn.boolean.careers/exercises/api/random/mail";

// selezioni SOLO per id
const emailListEl = document.getElementById("emailList");
const reloadBtn = document.getElementById("reloadBtn");
const statusEl = document.getElementById("status");


function loadEmails() {
  statusEl.textContent = "Caricamento in corso…";

  const emails = [];
  let completed = 0;
  const total = 10;

  for (let i = 0; i < total; i++) {
    axios
      .get(API_URL)
      .then((response) => {
        emails.push(response.data.response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        completed++;
        if (completed === total) {
          renderEmails(emails);
          statusEl.textContent = `Caricate ${emails.length} email.`;
        }
      });
  }
}

function renderEmails(emails) {
  emailListEl.innerHTML = "";

  emails.forEach((mail) => {
    const li = document.createElement("li");

    const bullet = document.createElement("span");
    bullet.className = "email-bullet"; 

    const text = document.createElement("span");
    text.textContent = mail;

    li.appendChild(bullet);
    li.appendChild(text);

    emailListEl.appendChild(li);
  });
}

reloadBtn.addEventListener("click", loadEmails);
document.addEventListener("DOMContentLoaded", loadEmails);