let btn = document.querySelector('.btn.btn-primary');
let insert = document.querySelector('.insertDiv');
btn.addEventListener('click', () => {
    alert('button clicked');
    createFun();
});

let form = document.forms[0];

function createFun() {
    let ul = document.createElement('ul')
    ul.classList.add('collection');
    // let li = document.createElement('li').classList.add('collection-item');
    // ul.appendChild(li)
    // form.appendChild(ul);
    form.insertBefore(insert, btn);
}