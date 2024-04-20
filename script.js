document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          const offsetTop = document.querySelector(href).offsetTop;

          scroll({
              top: offsetTop - 100, // Adjusts scroll position to not hide under fixed header if any
              behavior: "smooth"
          });
      });
  });
});

  // Tabs for course contents
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  function selectTab(e) {
      e.preventDefault();
      tabs.forEach(tab => {
          tab.classList.remove('active');
      });
      tabContents.forEach(content => {
          content.style.display = 'none';
      });

      const targetTab = document.querySelector(this.getAttribute('href'));
      targetTab.style.display = 'block';
      this.classList.add('active');
  }

  tabs.forEach(tab => {
      tab.addEventListener('click', selectTab);
      tab.click(); // Initialize the first tab
  });
});

// Simulated fetch function for course contents
function fetchCourseContent(courseId) {
  // This is a placeholder for where you would make an AJAX request
  console.log(`Fetching content for ${courseId}`);
  // Simulate course content
  return {
      title: `${courseId} Course`,
      description: `Detailed description of the ${courseId} course. This part can be dynamically loaded from a server.`,
  };
}

// Update tab content dynamically
function selectTab(e) {
  e.preventDefault();
  tabs.forEach(tab => {
      tab.classList.remove('active');
  });
  tabContents.forEach(content => {
      content.style.display = 'none';
  });

  const targetTab = document.querySelector(this.getAttribute('href'));
  const courseContent = fetchCourseContent(this.textContent.trim());
  targetTab.querySelector('h3').textContent = courseContent.title;
  targetTab.querySelector('p').textContent = courseContent.description;
  targetTab.style.display = 'block';
  this.classList.add('active');
}

// Initialize tabs with dynamic loading
document.addEventListener("DOMContentLoaded", function() {
  tabs.forEach(tab => {
      tab.addEventListener('click', selectTab);
      if (tab.classList.contains('active')) tab.click(); // Load initial content
  });
});
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      course: document.getElementById('course').value
  };

  fetch('/enroll', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error('Error:', error));
});

// Assuming Stripe is integrated, add its JavaScript here

