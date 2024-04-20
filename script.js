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
      const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => content.style.display = 'none');

            // Add active class to clicked tab and display corresponding tab content
            this.classList.add('active');
            const activeTabContent = document.querySelector(this.getAttribute('href'));
            activeTabContent.style.display = 'block';
        });
    });

    // Optionally: Click the first tab to open it by default on page load
    tabs[0].click();
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

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, course } = req.body;
    console.log(`Received registration from ${name}`);

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use any SMTP service you prefer
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'info@ribhusanyal.in',
        to: email, // Send email to the registrant
        subject: `Registration for ${course}`,
        text: `Hi ${name},\n\nYou have successfully registered for the ${course}. We will contact you with more details soon.\n\nBest regards,\nYour Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.send('Registration successful, email sent!');
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
