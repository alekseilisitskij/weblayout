export function buttonAll(btns) {
    const btn = document.querySelectorAll(btns);

    btn.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('btn__active');
        })
    });
}