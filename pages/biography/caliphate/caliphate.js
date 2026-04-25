// تهيئة مكتبة التحريك AOS
AOS.init({ duration: 1000, once: true });

// وظيفة وضع القراءة الليلي
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.getAttribute("data-theme") === "dark";
  body.setAttribute("data-theme", isDark ? "light" : "dark");
}

// زر العودة للأعلى
window.onscroll = function () {
  const btn = document.getElementById("scrollToTop");
  if (btn) {
    btn.style.display = window.scrollY > 500 ? "block" : "none";
  }
};

// الوظيفة الرئيسية لجلب وعرض المحتوى
async function loadContent() {
  const main = document.getElementById("content-main");
  const loader = document.getElementById("loader-wrapper");

  try {
    // جلب ملف الـ JSON (تأكد أن الاسم مطابق لملفك)
    const response = await fetch("caliphate.json");
    if (!response.ok) throw new Error("لم يتم العثور على ملف البيانات");

    const data = await response.json();

    // مسح أي محتوى قديم
    main.innerHTML = "";

    data.forEach((sec) => {
      if (!sec.section && sec.sub_points.length === 0) return; // تخطي الأقسام الفارغة

      const div = document.createElement("div");
      div.className = "article-container mb-5";
      div.setAttribute("data-aos", "fade-up");

      // عنوان القسم الرئيسي
      let html = sec.section
        ? `<h2 class="section-title text-center mb-4">${sec.section}</h2>`
        : "";

      // عرض النقاط الفرعية
      sec.sub_points.forEach((sub) => {
        // نتحقق أن هناك محتوى فعلي قبل العرض
        if (sub.story_content.trim() !== "") {
          html += `
            <div class="sub-point-card mb-4 p-4 shadow-sm" 
                 style="border-right: 5px solid var(--gold); background: rgba(197, 160, 89, 0.02); border-radius: 8px;">
                ${
                  sub.title
                    ? `<h4 class="fw-bold mb-3" style="color:var(--accent); font-family: 'Cairo'">${sub.title}</h4>`
                    : ""
                }
                <p class="story-text" style="line-height: 1.8; font-size: 1.1rem; text-align: justify;">
                    ${sub.story_content}
                </p>
            </div>`;
        }
      });

      div.innerHTML = html;
      main.appendChild(div);
    });

    // إخفاء شاشة التحميل بسلاسة
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => (loader.style.display = "none"), 600);
      }, 800);
    }
  } catch (e) {
    console.error("Error loading JSON:", e);
    main.innerHTML = `
      <div class="alert alert-danger text-center m-5 shadow">
        <h4>حدث خطأ في تحميل البيانات</h4>
        <p>تأكد من تشغيل المشروع عبر (Live Server) وأن ملف الـ <b>abo-bakr_life.json</b> موجود في نفس المجلد.</p>
      </div>`;
    if (loader) loader.style.display = "none";
  }
}

// بدء التشغيل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", loadContent);
