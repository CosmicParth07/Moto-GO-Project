// ===== Mobile menu =====
var hamburger = document.getElementById("hamburger");
var navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
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

// ===== Booking form =====
var bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
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
      document.getElementById("successMsg").textContent =
        "Booking confirmed! We will contact you on " + phone;
      bookingForm.reset();
    }
  });
}

// ===== Contact form =====
var contactForm = document.getElementById("contactForm");

if (contactForm) {
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
      document.getElementById("contactSuccessMsg").textContent =
        "Thanks " + name + "! Your message has been sent.";
      contactForm.reset();
    }
  });
}
