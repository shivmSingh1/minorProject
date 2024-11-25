import { isPasswordValid } from "../modules/validation";
import { shToast, success, danger } from "../modules/toast";

const signInBtn = document.querySelector(".sign-in-btn");
signInBtn.addEventListener("click", () => {
    window.location.href = "../pages/login.html";
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

// --- --- --- INITIAL FORM VALIDATIONS --- --- ---
const form = document.querySelector("#signup-form");
const pMessage = document.getElementById("password-message");
let isValid = false;

password.addEventListener("input", (e) => {
    let message = isPasswordValid(e.target.value);
    if (message === "empty") {
        pMessage.style.display = "none";
        password.style.borderColor = "#ddd";
    }
    else if (message === "Week Password") {
        password.style.border = "1px solid red"
        pMessage.style.display = "block";
        pMessage.style.color = "red";
        pMessage.style.fontSize = "smaller";
        pMessage.innerText = message;
    } else {
        password.style.border = "1px solid green"
        pMessage.innerText = message;
        pMessage.style.color = "green";
        isValid = true;
    }
})

// Add an event listener to the form submit button
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    if (isValid) {
        // Collect form data
        const fullname = document.querySelector("#fullname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        // Prepare the data to send to the server
        const data = {
            fullname: fullname,
            email: email,
            password: password
        };

        // Send data to PHP using AJAX (fetch API)
        fetch("http://localhost:8000/backend/signup.php", {
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
                if (data.success) {
                    shToast("Registration Successfull", success);
                    setTimeout(() => {
                        window.location.href = "../index.html";
                    }, 2000);
                } else {
                    shToast(`Registration Unsuccessful - ${data.error}`, danger);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
});