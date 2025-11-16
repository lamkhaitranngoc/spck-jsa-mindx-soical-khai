const registerForm = document.querySelector("#registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const displayName = document.getElementById("displayName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Tạo object user
        const user = { displayName, email, password };

        // Lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Đã lưu:", user);
        alert("Đăng ký thành công!");
        window.location.href = "login.html"; // chuyển sang trang login
    });
}
