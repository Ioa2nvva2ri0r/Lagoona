/* eslint-disable no-unused-vars */
function responseMessage(elem, content, classActive) {
  elem.textContent = content;
  elem.classList.add(classActive);
  setTimeout(() => {
    elem.classList.remove(classActive);
  }, 5000);
}

function formSubmit(form, messageBox, classActiveMessage) {
  let data = {};

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let elem of e.currentTarget.elements)
      if (elem.nodeName === 'INPUT') data[elem.name] = elem.value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.ok)
        responseMessage(
          messageBox,
          'Ваши данные успешно отправлены, ожидайте дальнейшей связи с нами!',
          classActiveMessage
        );
      else
        responseMessage(
          messageBox,
          'Произошла ошибка при отправке данных, повторите данную операцию позже!',
          classActiveMessage
        );
    });
  });
}
