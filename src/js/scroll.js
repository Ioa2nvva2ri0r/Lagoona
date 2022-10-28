/* eslint-disable no-unused-vars */
class AnchorLink {
  constructor(options) {
    // anchor
    if (
      options.link === undefined ||
      document.querySelector(`${options.link}`) === null
    )
      throw new Error('This link is not listed or does not exist!');
    else {
      if (
        Object.getPrototypeOf(document.querySelector(`${options.link}`))
          .constructor.name !== 'HTMLAnchorElement'
      )
        throw new Error('This selector is not a link!');
      // top offset
      if (options.topOffset === undefined) this.topOffset = 100;
      else if (isNaN(options.topOffset))
        throw new Error('Top offset must be a number!');
      else if (options.topOffset < 100)
        throw new Error('Top offset cannot be less than 100!');
      else this.topOffset = options.topOffset;

      this.link = document.querySelectorAll(`${options.link}`);
    }
  }

  set link(el) {
    this._link = el;
    this.eventLink(this._link);
  }

  get link() {
    return this._link;
  }

  retreatToAnchor(target) {
    const href = target.getAttribute('href').substring(1),
      scrollTarget = document.getElementById(`${href}`),
      elementPosition = scrollTarget.getBoundingClientRect().top;
    return elementPosition - this.topOffset;
  }

  eventLink(arraylink) {
    arraylink.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollBy({
          top: this.retreatToAnchor(e.target),
          behavior: 'smooth',
        });
      });
    });
  }
}

new AnchorLink({
  link: '.header__nav-link',
  topOffset: 200,
});

new AnchorLink({
  link: '.header__nav-btn',
  topOffset: 200,
});

class ButtonSmoothScroll {
  constructor(options) {
    // button
    if (
      options.btn === undefined ||
      document.querySelector(`${options.btn}`) === null
    )
      throw new Error('This button is not listed or does not exist!');
    else if (
      Object.getPrototypeOf(document.querySelector(`${options.btn}`))
        .constructor.name !== 'HTMLButtonElement'
    )
      throw new Error('This selector is not a button!');
    else {
      // property "display"
      if (options.display === undefined) this.display = 'block';
      if (typeof options.display !== 'string')
        throw new Error('"display" property is not a string!');
      else this.display = options.display;
      // indent from above
      if (options.pageYOffset === undefined) this.pageYOffset = 100;
      else if (isNaN(options.pageYOffset))
        throw new Error('Page Y offset must be a number!');
      else if (options.pageYOffset < 100)
        throw new Error('Page Y offset cannot be less than 100!');
      else this.pageYOffset = options.pageYOffset;
      // add class-style
      if (options.class !== undefined)
        this.btn.classList.add(`${options.class}`);
      // add content
      if (options.content !== undefined) this.btn.innerHTML = options.content;

      this.btn = document.querySelector(`${options.btn}`);
    }
  }

  set btn(elem) {
    this._btn = elem;
    this._btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load', () => this.visibleOrHiddenBtn());
    window.addEventListener('scroll', () => this.visibleOrHiddenBtn(), {
      passive: true,
    });
  }

  get btn() {
    return this._btn;
  }

  visibleOrHiddenBtn() {
    this.btn.style.position = 'fixed';

    if (window.pageYOffset >= this.pageYOffset)
      this.btn.style.display = this.display;
    else this.btn.style.display = 'none';
  }
}

new ButtonSmoothScroll({
  btn: '#btn-scroll',
  display: 'flex',
  pageYOffset: 200,
});
