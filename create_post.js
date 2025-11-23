function toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const postForm = document.querySelector("#createPostForm");

    if (postForm) {
      postForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("postTitle").value;
        const content = document.getElementById("postContent").value;
        const imageFile = document.getElementById("postImage").files[0];
        const videoFile = document.getElementById("postVideo").files[0];

        const image = imageFile ? await toBase64(imageFile) : null;
        const video = videoFile ? await toBase64(videoFile) : null;

        // Tạo object post
        const post = { title, content, image, video };

        // Lấy danh sách bài viết cũ
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        // Thêm bài viết mới vào đầu danh sách
        posts.unshift(post);

        // Lưu lại vào localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        console.log("Đã lưu:", post);
        alert("Đăng bài thành công!");
        window.location.href = "index.html"; // chuyển sang trang danh sách
      });
    }