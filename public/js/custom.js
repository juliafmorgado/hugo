document.addEventListener('DOMContentLoaded', function() {
  // Select all images within the .markdown-image container
  const images = document.querySelectorAll('.markdown-image img');
  
  images.forEach(img => {
    img.addEventListener('click', function() {
      this.classList.toggle('enlarged');
    });
  });
});
