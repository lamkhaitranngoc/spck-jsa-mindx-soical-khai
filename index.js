  document.addEventListener("DOMContentLoaded", () => {
        const navBar = document.querySelector(".navbar-nav.ms-auto");
        const user = JSON.parse(localStorage.getItem("user"));

        // Xử lý navbar
        if (user) {
          const gmailName = user.email.split("@")[0];
          const loginItem = navBar.querySelector('a[href="login.html"]')?.parentElement;
          const registerItem = navBar.querySelector('a[href="register.html"]')?.parentElement;
          if (loginItem) loginItem.remove();
          if (registerItem) registerItem.remove();

          const helloItem = document.createElement("li");
          helloItem.classList.add("nav-item");
          helloItem.innerHTML = `<span class="nav-link">Xin chào, <strong>${gmailName}</strong></span>`;

          const logoutItem = document.createElement("li");
          logoutItem.classList.add("nav-item");
          logoutItem.innerHTML = `<a href="#" class="nav-link text-danger" id="logoutBtn">Đăng xuất</a>`;

          navBar.appendChild(helloItem);
          navBar.appendChild(logoutItem);

          document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            window.location.href = "login.html";
          });
        }

        // Hiển thị bài viết từ localStorage
        const feed = document.getElementById("feed");
        const posts = JSON.parse(localStorage.getItem("posts")) || [];

       posts.forEach(post => {
  const card = document.createElement("div");
  card.className = "card mb-3 shadow-sm";
  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center mb-2">
        <strong>${user ? user.email.split("@")[0] : "Người dùng"}</strong>
      </div>
      <h5>${post.title}</h5>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" class="img-fluid rounded mb-2">` : ""}
      ${post.video ? `<video controls class="w-100 mb-2"><source src="${post.video}"></video>` : ""}
      <div class="d-flex justify-content-between text-muted small">
        <span><i class="fa-solid fa-thumbs-up text-primary"></i> 0</span>
        <span>0 bình luận</span>
      </div>
      <hr>
      <div class="d-flex justify-content-around">
        <button class="btn btn-light"><i class="fa-solid fa-thumbs-up"></i> Like</button>
        <button class="btn btn-light"><i class="fa-solid fa-comment"></i> Comment</button>
        <button class="btn btn-light"><i class="fa-solid fa-share"></i> Share</button>
      </div>
    </div>
  `;
  feed.appendChild(card);
});

      });