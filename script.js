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

  // Tabs functionality for course contents
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
          e.preventDefault();

          // Deactivate all tabs and hide all contents
          tabs.forEach(t => {
              t.classList.remove('active');
          });
          tabContents.forEach(content => {
              content.style.display = 'none';
          });

          // Activate clicked tab and display its content
          this.classList.add('active');
          const activeTabContent = document.querySelector(this.getAttribute('href'));
          activeTabContent.style.display = 'block';
      });
  });

  // Form submission for course registration
  document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
          name: this.querySelector('[name="name"]').value,
          email: this.querySelector('[name="email"]').value,
          course: this.querySelector('[name="course"]').value
      };

      fetch('/enroll', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      })
      .then(response => response.text())
      .then(data => alert('Thank you for registering! We will contact you soon.'))
      .catch(error => console.error('Error:', error));
  });
});
