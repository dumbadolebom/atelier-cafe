const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuToggle.classList.remove("is-active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.classList.toggle("is-active", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// ==========================================
// INTERACTIVE MENU FILTERS
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");

const menuCategories = document.querySelectorAll(".menu-category-block");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    // Update the active button
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    // Show only matching menu categories
    menuCategories.forEach((category) => {
      const categoryName = category.dataset.category;

      const shouldShow =
        selectedCategory === "all" || selectedCategory === categoryName;

      category.hidden = !shouldShow;
    });
  });
});

// Initialize accessibility state
filterButtons.forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active")),
  );
});
