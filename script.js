document.addEventListener("DOMContentLoaded", function() {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          const offsetTop = document.querySelector(href).offsetTop - 100;
          window.scrollTo({
              top: offsetTop,
              behavior: "smooth"
          });
      });
  });

  // Handling tab functionality
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  function selectTab(e) {
      e.preventDefault();

      // Deactivate all tabs and hide all contents
      tabs.forEach(tab => {
          tab.classList.remove('active');
      });
      tabContents.forEach(content => {
          content.style.display = 'none';
      });

      // Activate clicked tab and display its content
      this.classList.add('active');
      const activeTabContent = document.querySelector(this.getAttribute('href'));
      activeTabContent.style.display = 'block';
  }

  tabs.forEach(tab => {
      tab.addEventListener('click', selectTab);
  });

  // Fetch and display course contents dynamically (optional)
  function fetchCourseContent(courseId) {
      console.log(`Fetching content for ${courseId}`);
      // Simulated fetch operation; replace with actual AJAX request if needed
      return {
          title: `${courseId} Course`,
          description: `Detailed description of the ${courseId} course.`
      };
  }

  function updateTabContent(e) {
      const courseContent = fetchCourseContent(this.textContent.trim());
      const targetTab = document.querySelector(this.getAttribute('href'));
      targetTab.querySelector('h3').textContent = courseContent.title;
      targetTab.querySelector('p').textContent = courseContent.description;
  }

  tabs.forEach(tab => {
      tab.addEventListener('click', updateTabContent);
  });

  // Form submission handling for course registration
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
});
