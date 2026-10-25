// =====================================================
// MotoGO - script.js  (pure JavaScript, no libraries)
// Topics used: DOM, events, functions, arrays, objects,
// JSON, localStorage, form validation, Date
// =====================================================

// ===== localStorage helper functions =====
// Users list is saved as an array of objects:  [{name, email, password}, ...]
function getUsers() {
  var data = localStorage.getItem("motogoUsers");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

function saveUsers(users) {
  localStorage.setItem("motogoUsers", JSON.stringify(users));
}

// The logged in user is stored separately
function getCurrentUser() {
  var data = localStorage.getItem("motogoCurrentUser");
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}

function logoutUser() {
  localStorage.removeItem("motogoCurrentUser");
  window.location.href = "Home.html";
}

function getBookings() {
  var data = localStorage.getItem("motogoBookings");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

function saveBookings(bookings) {
  localStorage.setItem("motogoBookings", JSON.stringify(bookings));
}

// ===== Mobile menu =====
var hamburger = document.getElementById("hamburger");
var navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

// ===== Navbar: show Login or Logout (added with JS on every page) =====
function setupNavbar() {
  if (!navLinks) {
    return;
  }

  var li = document.createElement("li");
  var link = document.createElement("a");
  var user = getCurrentUser();

  if (user !== null) {
    var firstName = user.name.split(" ")[0];
    link.textContent = "Logout (" + firstName + ")";
    link.href = "#";
    link.className = "logout-link";
    link.addEventListener("click", function (event) {
      event.preventDefault();
      logoutUser();
    });
  } else {
    link.textContent = "Login";
    link.href = "login.html";
    if (window.location.pathname.indexOf("login.html") !== -1) {
      link.className = "active";
    }
  }

  li.appendChild(link);
  navLinks.appendChild(li);
}

setupNavbar();

// ===== Login / Sign Up page =====
var loginForm = document.getElementById("loginForm");
var signupForm = document.getElementById("signupForm");

// Switch between Login and Sign Up tabs
var authTabs = document.querySelectorAll(".auth-tab");
var authPanels = document.querySelectorAll(".auth-panel");

for (var t = 0; t < authTabs.length; t++) {
  authTabs[t].addEventListener("click", function () {
    var panelId = this.getAttribute("data-tab");

    for (var a = 0; a < authTabs.length; a++) {
      authTabs[a].classList.remove("active");
    }
    for (var b = 0; b < authPanels.length; b++) {
      authPanels[b].classList.remove("active");
    }

    this.classList.add("active");
    // the panel ids are loginPanel / signupPanel -> match with form ids
    if (panelId === "loginPanel") {
      loginForm.classList.add("active");
    } else {
      signupForm.classList.add("active");
    }
  });
}

// If user is already logged in, tell them on the login page
if (loginForm && getCurrentUser() !== null) {
  document.getElementById("loginMsg").textContent =
    "You are already logged in as " + getCurrentUser().name;
}

// Sign Up
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim().toLowerCase();
    var password = document.getElementById("signupPassword").value;
    var confirm = document.getElementById("signupConfirm").value;
    var valid = true;

    document.getElementById("signupNameError").textContent = "";
    document.getElementById("signupEmailError").textContent = "";
    document.getElementById("signupPasswordError").textContent = "";
    document.getElementById("signupConfirmError").textContent = "";
    document.getElementById("signupMsg").textContent = "";

    if (name === "") {
      document.getElementById("signupNameError").textContent = "Please enter your name";
      valid = false;
    }

    if (email === "" || !email.includes("@")) {
      document.getElementById("signupEmailError").textContent = "Please enter a valid email";
      valid = false;
    }

    if (password.length < 6) {
      document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters";
      valid = false;
    }

    if (confirm !== password) {
      document.getElementById("signupConfirmError").textContent = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      return;
    }

    // check if this email is already registered
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        document.getElementById("signupEmailError").textContent = "This email is already registered";
        return;
      }
    }

    var newUser = { name: name, email: email, password: password };
    users.push(newUser);
    saveUsers(users);

    document.getElementById("signupMsg").textContent = "Account created! Now you can login.";
    signupForm.reset();
  });
}

// Login
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value.trim().toLowerCase();
    var password = document.getElementById("loginPassword").value;
    var valid = true;

    document.getElementById("loginEmailError").textContent = "";
    document.getElementById("loginPasswordError").textContent = "";
    document.getElementById("loginMsg").textContent = "";

    if (email === "" || !email.includes("@")) {
      document.getElementById("loginEmailError").textContent = "Please enter a valid email";
      valid = false;
    }

    if (password === "") {
      document.getElementById("loginPasswordError").textContent = "Please enter your password";
      valid = false;
    }

    if (!valid) {
      return;
    }

    var users = getUsers();
    var foundUser = null;

    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        foundUser = users[i];
        break;
      }
    }

    if (foundUser === null) {
      document.getElementById("loginPasswordError").textContent = "Wrong email or password";
      return;
    }

    localStorage.setItem("motogoCurrentUser", JSON.stringify(foundUser));
    document.getElementById("loginMsg").textContent = "Welcome back, " + foundUser.name + "!";

    setTimeout(function () {
      window.location.href = "Home.html";
    }, 1000);
  });
}

// ===== Bike filter =====
var filterButtons = document.querySelectorAll(".filter-btn");
var bikeCards = document.querySelectorAll(".bike-card");

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    var selectedType = this.getAttribute("data-type");

    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }

    this.classList.add("active");

    for (var k = 0; k < bikeCards.length; k++) {
      var cardType = bikeCards[k].getAttribute("data-type");

      if (selectedType === "all" || selectedType === cardType) {
        bikeCards[k].style.display = "block";
      } else {
        bikeCards[k].style.display = "none";
      }
    }
  });
}

// ===== "Book Now" remembers which bike was clicked =====
for (var c = 0; c < bikeCards.length; c++) {
  var bookLink = bikeCards[c].querySelector(".btn-secondary");

  bookLink.addEventListener("click", function () {
    var card = this.parentElement;
    localStorage.setItem("selectedBikeType", card.getAttribute("data-type"));
    localStorage.setItem("selectedBikeName", card.querySelector("h3").textContent);
  });
}

// ===== Booking form =====
var bookingForm = document.getElementById("bookingForm");

// show the list of bookings of the logged in user
function showMyBookings() {
  var user = getCurrentUser();
  var oldBox = document.getElementById("myBookings");

  if (oldBox) {
    oldBox.remove();
  }

  if (user === null) {
    return;
  }

  var allBookings = getBookings();
  var box = document.createElement("div");
  box.className = "my-bookings";
  box.id = "myBookings";

  var heading = document.createElement("h2");
  heading.textContent = "My Bookings";
  box.appendChild(heading);

  var count = 0;

  for (var i = 0; i < allBookings.length; i++) {
    if (allBookings[i].userEmail !== user.email) {
      continue;
    }
    count++;

    var item = document.createElement("div");
    item.className = "booking-item";

    var info = document.createElement("div");
    var bikeLabel = allBookings[i].bikeName !== "" ? allBookings[i].bikeName : allBookings[i].bikeType + " bike";
    info.innerHTML = "<strong></strong><br><small></small>";
    info.querySelector("strong").textContent = bikeLabel;
    info.querySelector("small").textContent =
      allBookings[i].pickupDate + " to " + allBookings[i].returnDate +
      " (" + allBookings[i].days + (allBookings[i].days === 1 ? " day)" : " days)");

    var cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel-btn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("data-id", allBookings[i].id);

    cancelBtn.addEventListener("click", function () {
      var id = Number(this.getAttribute("data-id"));
      var list = getBookings();
      var updated = [];

      for (var x = 0; x < list.length; x++) {
        if (list[x].id !== id) {
          updated.push(list[x]);
        }
      }

      saveBookings(updated);
      showMyBookings();
    });

    item.appendChild(info);
    item.appendChild(cancelBtn);
    box.appendChild(item);
  }

  if (count === 0) {
    var empty = document.createElement("p");
    empty.textContent = "You have no bookings yet.";
    box.appendChild(empty);
  }

  bookingForm.parentElement.appendChild(box);
}

if (bookingForm) {
  var currentUser = getCurrentUser();

  // pickup date cannot be in the past
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("pickupDate").setAttribute("min", today);
  document.getElementById("returnDate").setAttribute("min", today);

  // fill name and email automatically if user is logged in
  if (currentUser !== null) {
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
  }

  // select the bike chosen on the bikes page
  var savedType = localStorage.getItem("selectedBikeType");
  if (savedType !== null) {
    document.getElementById("bikeType").value = savedType;
  }

  showMyBookings();

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var bikeType = document.getElementById("bikeType").value;
    var pickupDate = document.getElementById("pickupDate").value;
    var returnDate = document.getElementById("returnDate").value;
    var valid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("bikeError").textContent = "";
    document.getElementById("dateError").textContent = "";
    document.getElementById("successMsg").textContent = "";

    // user must login before booking
    var user = getCurrentUser();
    if (user === null) {
      alert("Please login first to book a bike.");
      window.location.href = "login.html";
      return;
    }

    if (name === "") {
      document.getElementById("nameError").textContent = "Please enter your name";
      valid = false;
    }

    if (email === "" || !email.includes("@")) {
      document.getElementById("emailError").textContent = "Please enter a valid email";
      valid = false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      document.getElementById("phoneError").textContent = "Enter a valid 10 digit number";
      valid = false;
    }

    if (bikeType === "") {
      document.getElementById("bikeError").textContent = "Please select a bike type";
      valid = false;
    }

    if (pickupDate === "" || returnDate === "") {
      document.getElementById("dateError").textContent = "Please select both dates";
      valid = false;
    } else if (returnDate < pickupDate) {
      document.getElementById("dateError").textContent = "Return date cannot be before pickup date";
      valid = false;
    }

    if (valid) {
      // number of days (same day = 1 day)
      var difference = new Date(returnDate) - new Date(pickupDate);
      var days = Math.round(difference / (1000 * 60 * 60 * 24)) + 1;

      // bike name is only known if the user came from the bikes page
      var bikeName = "";
      if (localStorage.getItem("selectedBikeType") === bikeType) {
        bikeName = localStorage.getItem("selectedBikeName");
      }

      var booking = {
        id: Date.now(),
        userEmail: user.email,
        name: name,
        phone: phone,
        bikeType: bikeType,
        bikeName: bikeName,
        pickupDate: pickupDate,
        returnDate: returnDate,
        days: days
      };

      var bookings = getBookings();
      bookings.push(booking);
      saveBookings(bookings);

      localStorage.removeItem("selectedBikeType");
      localStorage.removeItem("selectedBikeName");

      document.getElementById("successMsg").textContent =
        "Booking confirmed for " + days + (days === 1 ? " day" : " days") +
        "! We will contact you on " + phone;
      bookingForm.reset();

      // fill name/email again after reset
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;

      showMyBookings();
    }
  });
}

// ===== Contact form =====
var contactForm = document.getElementById("contactForm");

if (contactForm) {
  // fill name and email if logged in
  var contactUser = getCurrentUser();
  if (contactUser !== null) {
    document.getElementById("cname").value = contactUser.name;
    document.getElementById("cemail").value = contactUser.email;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("cname").value.trim();
    var email = document.getElementById("cemail").value.trim();
    var message = document.getElementById("message").value.trim();
    var valid = true;

    document.getElementById("cnameError").textContent = "";
    document.getElementById("cemailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("contactSuccessMsg").textContent = "";

    if (name === "") {
      document.getElementById("cnameError").textContent = "Please enter your name";
      valid = false;
    }

    if (email === "" || !email.includes("@")) {
      document.getElementById("cemailError").textContent = "Please enter a valid email";
      valid = false;
    }

    if (message === "") {
      document.getElementById("messageError").textContent = "Please enter a message";
      valid = false;
    }

    if (valid) {
      // save the message in localStorage
      var messages = JSON.parse(localStorage.getItem("motogoMessages") || "[]");
      messages.push({ name: name, email: email, message: message, time: new Date().toLocaleString() });
      localStorage.setItem("motogoMessages", JSON.stringify(messages));

      document.getElementById("contactSuccessMsg").textContent =
        "Thanks " + name + "! Your message has been sent.";
      contactForm.reset();
    }
  });
}
