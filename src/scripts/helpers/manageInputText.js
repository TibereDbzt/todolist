export const manageInputText = (defaultClass, activeClass) => {
  const inputs = document.querySelectorAll(defaultClass);
  inputs.forEach( (element) => {
    element.addEventListener('focusout', (event) => {
      element.value !== '' ? element.classList.add(activeClass) : element.classList.remove(activeClass);
    });
  });
};
