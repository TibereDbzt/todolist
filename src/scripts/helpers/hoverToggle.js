export const hoverToggle = () => {
    const elements = document.querySelectorAll('.js-task_name');
    console.log(elements);
    elements.forEach(element => {
        element.addEventListener('mouseover', e => {
            e.target.previousSibling.previousSibling.classList.toggle('hover');
        });
    });
};