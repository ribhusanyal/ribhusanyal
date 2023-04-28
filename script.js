document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", function() {
        const target = document.querySelector(tab.dataset.tabTarget);
        const content = document.querySelectorAll(".tab-content");
        const links = document.querySelectorAll(".tab");
  
        content.forEach(contentItem => contentItem.classList.remove("active"));
        links.forEach(link => link.classList.remove("active"));
  
        tab.classList.add("active");
        target.classList.add("active");
      });
    });
  });
  