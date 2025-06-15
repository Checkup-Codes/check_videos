// Prevent right-click on images
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG' && !e.target.classList.contains('allow-right-click')) {
    e.preventDefault();
    return false;
  }
});
