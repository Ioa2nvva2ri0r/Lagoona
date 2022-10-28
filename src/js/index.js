/* eslint-disable no-undef */

// header
const menu = document.getElementById('menu');
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

menuOpen.addEventListener('click', () =>
  elemVisible(menu, 'header__nav-open', 'flex')
);
menuClose.addEventListener('click', () =>
  elemHidden(menu, 'header__nav-open', 'header__nav-close', 395)
);

function hiddenMenu() {
  document
    .querySelectorAll('.header__nav-link, .header__nav-account')
    .forEach((btn) => {
      if (window.screen.width <= 820) {
        btn.addEventListener('click', () =>
          elemHidden(menu, 'header__nav-open', 'header__nav-close', 395)
        );
      }
    });
  document.body.addEventListener('click', (el) => {
    if (window.screen.width <= 820) {
      if (menu.style.display === 'none') return;
      if (!menu.contains(el.target) && !menuOpen.contains(el.target))
        elemHidden(menu, 'header__nav-open', 'header__nav-close', 395);
    } else menu.style.display = 'flex';
  });
}

window.addEventListener('load', () => hiddenMenu());
window.addEventListener('resize', () => hiddenMenu());

// tour
document.querySelectorAll('#tourists, #nights, #date').forEach((input) => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(
      input.id === 'date' ? /[^0-9.]/g : /[^0-9]/g,
      ''
    );
    if (this.value.length > this.maxLength)
      this.value = this.value.slice(0, this.maxLength);
  });
});

let tourInputValue;
const dropdownOpen = 'tour__form-dropdown-open';
const dropdownClose = 'tour__form-dropdown-close';
const selectActive = 'tour__form-dropdown-select-active';

document.querySelectorAll('.tour__form-dropdown-select').forEach((select) => {
  for (const elem of select.parentElement.children)
    if (elem.classList.contains('tour__form-dropdown')) {
      select.addEventListener('click', function () {
        if (this.classList.contains(selectActive)) {
          this.classList.remove(selectActive);
          elemHidden(elem, dropdownOpen, dropdownClose, 395);
        } else {
          this.classList.add(selectActive);
          elemVisible(elem, dropdownOpen, 'flex');
        }
      });
      for (const option of elem.children)
        option.addEventListener('click', (e) => {
          for (const input of select.children)
            if (input.nodeName === 'INPUT') {
              tourInputValue = input.value;
              input.value = e.currentTarget.textContent;
              e.currentTarget.textContent = tourInputValue;
            }

          select.classList.remove(selectActive);
          elemHidden(elem, dropdownOpen, dropdownClose, 395);
        });
      document.body.addEventListener('click', (el) => {
        if (elem.style.display === 'none') return;
        if (!select.contains(el.target) && !elem.contains(el.target)) {
          select.classList.remove(selectActive);
          elemHidden(elem, dropdownOpen, dropdownClose, 395);
        }
      });
    }
});

formSubmit(
  document.getElementById('tour-form'),
  document.getElementById('tour-message'),
  'tour__message-open'
);

// contacts
const contactsForm = document.getElementById('contacts-form');
const contactsFormOpen = document.getElementById('contacts-form-open');
const contactsFormClose = document.getElementById('contacts-form-close');
const headerBtnCallback = document.getElementById('callback');

headerBtnCallback.addEventListener('click', () =>
  elemVisible(contactsForm, 'contacts__form-open', 'flex')
);
contactsFormOpen.addEventListener('click', () =>
  elemVisible(contactsForm, 'contacts__form-open', 'flex')
);
contactsFormClose.addEventListener('click', () =>
  elemHidden(contactsForm, 'contacts__form-open', 'contacts__form-close', 395)
);
document.body.addEventListener('click', (el) => {
  if (contactsForm.style.display === 'none') return;
  if (
    !contactsForm.contains(el.target) &&
    !contactsFormOpen.contains(el.target) &&
    !headerBtnCallback.contains(el.target)
  )
    elemHidden(
      contactsForm,
      'contacts__form-open',
      'contacts__form-close',
      395
    );
});

formSubmit(
  contactsForm,
  document.getElementById('contacts-message'),
  'contacts__message-open'
);
