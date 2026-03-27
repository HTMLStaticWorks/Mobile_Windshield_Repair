document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const themeToggle = document.querySelector('.theme-toggle');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky Navbar logic
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
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
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
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
  });

  // Dark Mode Logic
  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
    localStorage.setItem('theme', 'dark');
  };

  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
    localStorage.setItem('theme', 'light');
  };

  if (localStorage.getItem('theme') === 'dark') {
    enableDarkMode();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  // RTL Toggle Logic (Optimized)
  const rtlToggle = document.querySelector('#rtl-toggle');
  
  const enableRTL = () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-active');
    if (rtlToggle) {
      rtlToggle.textContent = 'LTR';
    }
    localStorage.setItem('rtl', 'true');
  };

  const disableRTL = () => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-active');
    if (rtlToggle) {
      rtlToggle.textContent = 'RTL';
    }
    localStorage.setItem('rtl', 'false');
  };

  if (localStorage.getItem('rtl') === 'true') {
    enableRTL();
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.documentElement.getAttribute('dir') === 'rtl') {
        disableRTL();
      } else {
        enableRTL();
      }
    });
  }

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
});
