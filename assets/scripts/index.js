function renderTodayDate() {
  const experienceStartedOnYear = 2009;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const elements = document.querySelectorAll('.js-today-date');
  elements.forEach(element => {
    element.datetime = formattedDate;
    // element.textContent = formattedDate;
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

function toggleSidebar(button) {
  const sidebar = document.querySelector('.js-aside');
  const sidebarNavigation = document.querySelector('.js-sidebar-navigation');
  sidebar.classList.toggle('sidebar--open');
  sidebarNavigation.classList.toggle('sidebar__navigation--visible');

  if (button) {
    button.classList.toggle('is-active');
    button.setAttribute('aria-expanded', button.classList.contains('is-active'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodayDate();
  showActiveMenuLink();

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
