import { shToast, success, danger } from "../modules/toast"

const signUpBtn = document.querySelector(".sign-up-btn");
signUpBtn.addEventListener("click", () => {
    window.location.href = "../pages/signup.html"
})

// --- --- --- EYE SVG --- --- ---
const openEye = document.getElementById("open-eye");
const closeEye = document.getElementById("close-eye");
const password = document.getElementById("password");
openEye.addEventListener("click", (e) => {
    openEye.style.display = "none";
    closeEye.style.display = "block";
    password.setAttribute("type", "password");
});
closeEye.addEventListener("click", (e) => {
    closeEye.style.display = "none";
    openEye.style.display = "block";
    password.setAttribute("type", "text");
});


// --- --- --- SENDING RESPONSE TO DATABASE --- --- ---
const form = document.querySelector("#login-form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Prepare the data to send to the server
    const data = {
        email: email,
        password: password,
    };

    // Send data to PHP using AJAX (fetch API)
    fetch("http://localhost:8000/backend/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Sending data as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the JSON response from PHP
        })
        .then((data) => {
            // Handle the server response (data from PHP)
            if (data.status) {
                shToast("Welcome Back", success);
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1000);
            } else {
                shToast(`Sorry! - ${data.message}`, danger);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});