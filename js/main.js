document.addEventListener("DOMContentLoaded", function () {
    // 手機版導覽選單
    const menuToggle = document.querySelector("#menuToggle");
    const mainNav = document.querySelector("#mainNav");

    if (menuToggle && mainNav) {
        function closeMenu() {
            mainNav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeMenu();
        });
    }

    // S04 年齡互動展示
    const ageNumber = document.querySelector("#ageNumber");
    const ageTitle = document.querySelector("#ageTitle");
    const ageDescription = document.querySelector("#ageDescription");
    const ageImageText = document.querySelector("#ageImageText");
    const ageImage = document.querySelector("#ageImage");
    const agePrev = document.querySelector("#agePrev");
    const ageNext = document.querySelector("#ageNext");
    const ageDots = document.querySelectorAll("#agePagination .age-dot");

    const ageData = [
        {
            number: "20",
            title: "初次探索",
            description: "在人生的起點，勇敢探索喜歡的事物，讓每一次嘗試都成為成長的養分。",
            imageText: "AGE 20｜初次探索",
            image: "images/age-01.jpg"
        },
        {
            number: "30",
            title: "累積與成形",
            description: "在不同角色與經歷之中，逐漸找到自己的步調，打造值得珍藏的生活。",
            imageText: "AGE 30｜累積與成形",
            image: "images/age-02.jpg"
        },
        {
            number: "40",
            title: "自在綻放",
            description: "經過時間淬鍊，更懂得珍惜自己，也更有勇氣活出理想中的模樣。",
            imageText: "AGE 40｜自在綻放",
            image: "images/age-03.jpg"
        }
    ];

    if (ageNumber && ageTitle && ageDescription && ageImageText && ageDots.length > 0) {
        let currentAgeIndex = 0;

        function showAge(index) {
            currentAgeIndex = (index + ageData.length) % ageData.length;
            const data = ageData[currentAgeIndex];

            ageNumber.textContent = data.number;
            ageTitle.textContent = data.title;
            ageDescription.textContent = data.description;
            ageImageText.textContent = data.imageText;

            if (ageImage) {
                ageImage.style.backgroundImage = "url('" + data.image + "')";
            }

            ageDots.forEach(function (dot, dotIndex) {
                dot.classList.toggle("active", dotIndex === currentAgeIndex);
                dot.setAttribute("aria-current", dotIndex === currentAgeIndex ? "true" : "false");
            });
        }

        if (agePrev) {
            agePrev.addEventListener("click", function () {
                showAge(currentAgeIndex - 1);
            });
        }

        if (ageNext) {
            ageNext.addEventListener("click", function () {
                showAge(currentAgeIndex + 1);
            });
        }

        ageDots.forEach(function (dot) {
            dot.addEventListener("click", function () {
                const index = Number(dot.dataset.index);
                if (Number.isInteger(index) && index >= 0 && index < ageData.length) {
                    showAge(index);
                }
            });
        });

        showAge(0);
    }

    // Footer 自動更新年份
    const currentYear = document.querySelector("#currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 聯絡表單前端檢查（尚未連接後端）
    const contactForm = document.querySelector("#contactForm");
    const formNotice = document.querySelector("#formNotice");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                if (formNotice) {
                    formNotice.textContent = "請確認必填欄位與電子郵件格式是否正確。";
                }
                return;
            }

            if (formNotice) {
                formNotice.textContent = "欄位檢查完成！目前此展示頁尚未連接後端，訊息尚未實際送出。";
            }
        });
    }
});
