document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.querySelector(".navbar-nav.ms-auto");
  const user = JSON.parse(localStorage.getItem("user"));

  // Navbar hiển thị Gmail + Đăng xuất
  if (user) {
    navBar.innerHTML = "";
    const gmailName = user.email.split("@")[0];

    const helloItem = document.createElement("li");
    helloItem.classList.add("nav-item");
    helloItem.innerHTML = `<span class="nav-link">Xin chào, <strong>${gmailName}</strong></span>`;

    const logoutItem = document.createElement("li");
    logoutItem.classList.add("nav-item");
    const logoutLink = document.createElement("a");
    logoutLink.classList.add("nav-link", "text-danger");
    logoutLink.href = "#";
    logoutLink.textContent = "Đăng xuất";
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });

    logoutItem.appendChild(logoutLink);
    navBar.appendChild(helloItem);
    navBar.appendChild(logoutItem);
  }

  // Xử lý tạo bài viết
  const postForm = document.getElementById("postForm");
  const feed = document.getElementById("feed");

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const content = document.getElementById("postContent").value;
      const imageInput = document.getElementById("postImage");
      let imageURL = "";

      if (imageInput.files && imageInput.files[0]) {
        imageURL = URL.createObjectURL(imageInput.files[0]);
      }

      // Tạo card bài viết mới
      const postCard = document.createElement("div");
      postCard.classList.add("card", "mb-3", "shadow-sm");
      postCard.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <img src="https://i.pravatar.cc/40?u=${user.email}" class="rounded-circle me-2">
            <strong>${user.email.split("@")[0]}</strong>
          </div>
          <p>${content}</p>
          ${imageURL ? `<img src="${imageURL}" class="img-fluid rounded mb-2">` : ""}
          <div class="d-flex justify-content-around">
            <button class="btn btn-light"><i class="fa-solid fa-thumbs-up"></i> Like</button>
            <button class="btn btn-light"><i class="fa-solid fa-comment"></i> Comment</button>
            <button class="btn btn-light"><i class="fa-solid fa-share"></i> Share</button>
          </div>
        </div>
      `;

      // Thêm bài viết mới lên đầu feed
      feed.prepend(postCard);

      // Reset form
      postForm.reset();
    });
  }
});
