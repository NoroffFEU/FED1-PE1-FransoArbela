export function router() {
    const path = window.location.pathname;
  
    if (path === '/' || path === '/index.html') {
      // Home page
      setupCarousel();
    } else if (path === '/about' || path === '/about/index.html') {
      // About page
      setupTimeline();
    } else if (path === '/contact' || path === '/contact/index.html') {
      // Contact page
      setupForm();
    } else {
      // 404 page
      setup404();
    }
  }