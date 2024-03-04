function renderTodayDate() {
  const experienceStartedOnYear = 2009;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const elements = document.querySelectorAll('.js-today-date');
  elements.forEach(element => {
    element.datetime = formattedDate;
  });
  document.querySelector('.js-experience-years').textContent = currentDate.getFullYear() - experienceStartedOnYear;
}

function showActiveMenuLink() {
  const activeClassName = 'sidebar__navigation-menu-link--active';
  const links = document.querySelectorAll('.js-sidebar-navigation-menu-link');
  const currentURL = window.location.origin + window.location.pathname + window.location.hash;

  links.forEach(link => {
    link.classList.remove(activeClassName);
    if (
      link.href === currentURL ||
      currentURL === link.href + 'index.html'
    ) {
      link.classList.add(activeClassName);
    }
  });
}

function toggleSidebar(button = null) {
  const sidebar = document.querySelector('.js-aside');
  const sidebarNavigation = document.querySelector('.js-sidebar-navigation');

  sidebar.classList.toggle('sidebar--open');
  if (sidebar.classList.contains('sidebar--open')) {
    bodyScrollLock.disableBodyScroll(sidebar);
  } else {
    bodyScrollLock.enableBodyScroll(sidebar);
  }
  sidebarNavigation.classList.toggle('sidebar__navigation--visible');

  if (button) {
    button.classList.toggle('is-active');
    button.setAttribute('aria-expanded', button.classList.contains('is-active'));
  }
}

function addSidebarObserver() {
  const isTab = window.matchMedia('(min-width: 768px)');
  if (!isTab.matches) {
    return;
  }

  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentSectionId = entry.target.id;
      updateActiveLink(currentSectionId);
    }
  });
}

function updateActiveLink(currentSectionId = '') {
  const activeClassName = 'sidebar__navigation-menu-link--active';
  const sidebarLinks = document.querySelectorAll('.js-sidebar-navigation-menu-link');

  sidebarLinks.forEach(link => {
    link.classList.remove(activeClassName);
    link.setAttribute('aria-current', false);

    const isHeroLink = link.getAttribute('href') === './' && currentSectionId === 'hero';

    if (link.getAttribute('href') === `#${currentSectionId}` || isHeroLink) {
      link.classList.add(activeClassName);
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodayDate();
  showActiveMenuLink();
  addSidebarObserver();

  document.addEventListener('click', (ev) => {
    const targetClassList = ev.target.classList ?? [];
    if (targetClassList.contains('js-sidebar-toggle')) {
      toggleSidebar(ev.target);
    } else if (targetClassList.contains('js-sidebar-navigation-menu-link')) {
      toggleSidebar(document.querySelector('.js-sidebar-toggle'));
    }
  });
});

window.addEventListener('hashchange', () => {
  showActiveMenuLink();
})
