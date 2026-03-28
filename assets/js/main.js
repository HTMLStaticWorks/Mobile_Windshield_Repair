document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky Navbar logic
  window.addEventListener('scroll', () => {
    if (navbar && window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else if (navbar) {
      navbar.classList.remove('scrolled');
    }
  });

  // Dashboard Sidebar (Mobile/Tablet) Logic
  const sidebarToggle = document.querySelector('#sidebar-toggle');
  const sidebar = document.querySelector('#dashboard-sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove('active');
      }
    });

    // Close sidebar on link click
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });
    });
  }

  // Mobile Menu Logic (Sliding Drawer)
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  document.body.appendChild(overlay);

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  });

  // Close nav drawer on link click (Mobile)
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      });
    });
  }

  // Dark Mode Logic
  const themeToggles = document.querySelectorAll('.theme-toggle');

  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
      const textSpan = toggle.querySelector('span');
      if (textSpan) textSpan.textContent = 'Light Mode';
    });
    localStorage.setItem('theme', 'dark');
  };

  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
      const textSpan = toggle.querySelector('span');
      if (textSpan) textSpan.textContent = 'Dark Mode';
    });
    localStorage.setItem('theme', 'light');
  };

  // Default to dark mode if no theme is set
  if (localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')) {
    enableDarkMode();
  } else if (localStorage.getItem('theme') === 'light') {
    disableDarkMode();
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  });

  // Sync theme across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'dark') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });

  // RTL Toggle Logic
  const rtlToggles = document.querySelectorAll('#rtl-toggle');

  const enableRTL = () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-active');
    rtlToggles.forEach(toggle => {
      const textSpan = toggle.querySelector('span');
      if (textSpan) {
        textSpan.textContent = 'LTR';
      } else {
        toggle.textContent = 'LTR';
      }
    });
    localStorage.setItem('rtl', 'true');
  };

  const disableRTL = () => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-active');
    rtlToggles.forEach(toggle => {
      const textSpan = toggle.querySelector('span');
      if (textSpan) {
        textSpan.textContent = 'RTL';
      } else {
        toggle.textContent = 'RTL';
      }
    });
    localStorage.setItem('rtl', 'false');
  };

  if (localStorage.getItem('rtl') === 'true') {
    enableRTL();
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.documentElement.getAttribute('dir') === 'rtl') {
        disableRTL();
      } else {
        enableRTL();
      }
    });
  });

  // Sync RTL state across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'rtl') {
      if (e.newValue === 'true') {
        enableRTL();
      } else {
        disableRTL();
      }
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  // Global Premium FAQ Component Logic
  const faqHeaders = document.querySelectorAll('.faq-premium-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isAlreadyActive = currentItem.classList.contains('active');
      const allItems = currentItem.parentElement.querySelectorAll('.faq-premium-item');
      allItems.forEach(item => item.classList.remove('active'));
      if (!isAlreadyActive) currentItem.classList.add('active');
    });
  });

  // Scroll Up Button Logic
  const scrollUpBtn = document.getElementById('scroll-up');

  if (scrollUpBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
      } else {
        scrollUpBtn.classList.remove('show');
      }
    });

    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
