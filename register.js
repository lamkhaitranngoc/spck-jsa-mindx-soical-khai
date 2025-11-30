const registerForm = document.querySelector("#registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const displayName = document.getElementById("displayName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = { displayName, email, password };

       
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Đã lưu:", user);
        alert("Đăng ký thành công!");
        window.location.href = "login.html"; 
    });
}
