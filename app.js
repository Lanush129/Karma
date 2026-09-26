const form = document.getElementById("bookForm");
const msg = document.getElementById("formMsg");

const today = new Date().toISOString().slice(0, 10);
form.checkin.min = today;
form.checkout.min = today;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const checkin = data.get("checkin");
  const checkout = data.get("checkout");
  if (checkout <= checkin) {
    msg.hidden = false;
    msg.style.color = "#b42318";
    msg.textContent = "Check-out must be after check-in.";
    return;
  }
  const request = {
    name: data.get("name"),
    email: data.get("email"),
    checkin,
    checkout,
    suite: data.get("suite"),
    guests: data.get("guests"),
  };
  const existing = JSON.parse(localStorage.getItem("aurum-enquiries") || "[]");
  existing.push(request);
  localStorage.setItem("aurum-enquiries", JSON.stringify(existing));
  msg.hidden = false;
  msg.style.color = "#1f7a4d";
  msg.textContent = `Thank you, ${request.name}. ${request.suite} is held as a request for ${checkin} – ${checkout}.`;
  form.reset();
});
