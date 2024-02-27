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

  links.forEach(link => {
    link.classList.remove(activeClassName);
    if (
      link.href === window.location.href ||
      window.location.href === link.href + 'index.html'
    ) {
      link.classList.add(activeClassName);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodayDate();
  showActiveMenuLink();
});

window.addEventListener('hashchange', () => {
  showActiveMenuLink();
})
