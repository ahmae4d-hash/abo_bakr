AOS.init({ duration: 1000, once: true });

function toggleDarkMode() {
  const body = document.body;
  const isDark = body.getAttribute("data-theme") === "dark";
  body.setAttribute("data-theme", isDark ? "light" : "dark");
}

window.onscroll = function () {
  const btn = document.getElementById("scrollToTop");
  btn.style.display = window.scrollY > 500 ? "block" : "none";
};

async function loadContent() {
  const main = document.getElementById("content-main");
  const loader = document.getElementById("loader-wrapper");

  try {
    // جلب ملف الـ JSON المحلي (تأكد أنه بجانب index.html)
    const response = await fetch("abo-bakr_life.json");
    if (!response.ok) throw new Error("File not found");

    const data = await response.json();

    data.forEach((sec) => {
      const div = document.createElement("div");
      div.className = "article-container";
      div.setAttribute("data-aos", "fade-up");

      let html = `<h2 class="section-title">${sec.section}</h2>`;
      sec.sub_points.forEach((sub) => {
        html += `
            <div class="mb-5 p-4" style="border-right: 5px solid var(--gold); background: rgba(197, 160, 89, 0.02)">
                <h4 class="fw-bold mb-3" style="color:var(--accent); font-family: 'Cairo'">${sub.title}</h4>
                <p class="story-text">${sub.story_content}</p>
            </div>`;
      });
      div.innerHTML = html;
      main.appendChild(div);
    });

    // إخفاء التحميل بعد المعالجة
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => (loader.style.display = "none"), 600);
    }, 1000);
  } catch (e) {
    console.error("Error loading JSON:", e);
    main.innerHTML = `<div class="alert alert-danger text-center m-5">خطأ: تأكد من وجود ملف abo-bakr_life.json وتشغيله عبر Live Server</div>`;
    loader.style.display = "none";
  }
}

// البدء عند جاهزية المستند
document.addEventListener("DOMContentLoaded", loadContent);
