// Academics tabs: switch visible program panel and filter subject table rows.
const tabButtons = document.querySelectorAll(".tab-btn");
const levelPanels = document.querySelectorAll(".level-panel");
const tableRows = document.querySelectorAll(".subjects-table tbody tr");

function setActiveLevel(level) {
  // Update tab button state
  tabButtons.forEach((button) => {
    const isActive = button.dataset.level === level;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  // Show only selected program panel
  levelPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.level === level);
  });

  // Filter table rows by selected level
  tableRows.forEach((row) => {
    const matchesLevel = row.dataset.level === level;
    row.classList.toggle("hidden-row", !matchesLevel);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveLevel(button.dataset.level);
  });
});

// Initialize with O-Level data visible.
setActiveLevel("olevel");
