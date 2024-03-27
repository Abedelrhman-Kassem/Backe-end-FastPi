const header = `
<nav class="navbar navbar-expand-md py-0 bg-main-color">
    <div class="container-fluid container-xl px-md-0">
        <a class="navbar-brand text-white fs-5 fw-bold" href="/"
            ><img
            src="/images/sql-logo.png"
            alt="sql-logo"
            class="sql-logo d-block d-md-none d-xl-block"
        /></a>
        <button
            class="navbar-toggler my-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <div class="hamburger-icon">
            <div class="hamburger-line bg-white"></div>
            <div class="hamburger-line bg-white"></div>
            <div class="hamburger-line bg-white"></div>
            </div>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a
                    class="nav-link active text-white fs-5 fw-bold"
                    aria-current="page"
                    href="/"
                    >الصفحه الرئيسيه</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fs-5 fw-bold" href="#"
                    >الأهداف العامه</a
                    >
                </li>
                <li class="nav-item dropdown">
                    <a
                    class="nav-link dropdown-toggle text-white fs-5 fw-bold"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    الوحدات
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الأولى</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="/view/modules/module-2.html"
                            >الوحده الثانيه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الثالثه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الرابعه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الخامسه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده السادسه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده السابعه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الثامنه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده التاسعه</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده العاشره</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item text-dark fs-5 fw-bold" href="#"
                            >الوحده الأحد عشر</a
                            >
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fs-5 fw-bold" href="#">الأنشطه</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fs-5 fw-bold" href="#"
                    >شات بوت</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fs-5 fw-bold" href="#"
                    >تعليمات الأنشطه</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fs-5 fw-bold" href="#"
                    >اتصل بنا</a
                    >
                </li>
                <li class="nav-item">
                    <button id="logout-btn" class="nav-link fs-5 fw-bold text-white border-0 rounded-3 bg-main-color px-2"
                    >تسجيل خروج</button
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
`;

const headerDiv = document.querySelector("header");

headerDiv.innerHTML = header;

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
