const menuOpen = document.querySelector(".menu-open");
const navlists = document.querySelector(".nav-lists");
const menuClose = document.querySelector(".menu-close")

document.addEventListener("DOMContentLoaded", () => {

    menuOpen.addEventListener("click", () => {
        navlists.style.right = "0";
    })

    menuClose.addEventListener("click", () => {
        navlists.style.right = "-200px";
    })
});

// --- --- ---  --- --- ---

fetch("https://optlit.rf.gd/backend/session.php")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data.status) {
            const navBtns = document.querySelector(".nav-btns");
            navBtns.innerHTML = `<p style="margin-right:5px">Hello, ${data.username}</p><a href="#" class="logout-btn"><button class="btn btn-primary btn-size">Logout</button></a>`;

            const logoutBtn = document.querySelector(".logout-btn");
            logoutBtn.addEventListener("click", (e) => {
                fetch("https://optlit.rf.gd/backend/logout.php")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.status){
                        navBtns.innerHTML = `<a href=""><button class="btn btn-primary login btn-size">Login</button></a><a href="signup.html"><button class="btn btn-primary btn-size">Signup</button></a>`
                    }
                })
            })
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });