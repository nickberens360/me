// Get the current date
const currentDate = new Date();

// Get the year from the current date
const currentYear = currentDate.getFullYear();

// Update the content of the paragraph element with the current year
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = currentYear.toString();
  }
});