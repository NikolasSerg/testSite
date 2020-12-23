let sumAll;
let table;
let evenItem;

window.onload = function() {
  sumAll = document.querySelector('#cart_sumAll');
  table = document.querySelector('#cart table');
  calcSum();
}

function calcSum () {
  let items = document.querySelectorAll('.cart_counter');
  console.log(items, ' - items');
  console.log(items.length, ' - length');
  for(let i = 0; i < items.length; i++){
      let price = Number(items[i].parentElement.nextElementSibling.textContent);
      console.log(price, ' - price');
      let value = Number(items[i].value);
      console.log(value, ' - value');
      let sum = price * value;
      console.log(sum, ' - sum');
  }
}



function objCompos (event) {
    console.log(event.currentTarget.form[0]);
    console.log(event.currentTarget.form[1]);
    console.log(event.currentTarget.form[2]);
    console.log(event.currentTarget.form[3]);
    console.log(event.currentTarget.form.length);

  let obj = {};
  for(let i = 0; i < 4; i++)  {
    obj[event.currentTarget.form[i].name] = event.currentTarget.form[i].value; 
  }
  // console.log(obj, ' - obj');

  return obj;
}


async function cart_pushToServer(event){
  event.preventDefault();
  let obj = await objCompos(event);

  postData('/cart', obj).
  then((data) => {
    console.log(data, ' - responce server');
  })

}


async function postData(url, data) {
  // console.log(data, '  - data');
  const responce = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(data)
  })
  return await responce.json();
}
async function putData(url, data) {
  // console.log(data, '  - data');
  console.log('вызов ФЕТЧ');
  const responce = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(data)
  })
  return await responce.json();
}

// опрацювання подій в корзині

let cart = document.querySelector('#cart');
cart.addEventListener('click', (event)  => {
    // додавання одиниць товару
    //TODO ADD item
    if(event.target.classList.contains('cart_add')) {
      let add_button =  event.target;
      // console.log(add_button, ' - add_button');
      let input = add_button.parentElement.previousElementSibling;
      // console.log(input, ' - input');

      console.log('its class add');
      // console.log(event.target, ' - event.target');
      evenItem = event.target;
      // console.log(event.target.attributes.name.value, ' - event.attributes.name.value');
      // console.log(input.value, ' - input value');

      input.value = +input.value + 1;
      console.log(event.target.id, ' - event.target.id');
      let id = event.target.id;
      // let sum = document.querySelector(toString("[id="+`${id}`+"] .cart_add"));
      console.log(sum, ' - sum');
      // console.log(add_button.parentElement.parentElement.parentElement, ' - did');
      // console.log(add_button.parentElement.parentElement.parentElement.getAttribute('id'), ' - did');
      let data = {
        id: add_button.parentElement.parentElement.parentElement.getAttribute('id'),
        // count: +input.value,
        type: 'add'
      }
      postData('/cart', data);
      
      // let priceItemHtml = parseInt(add_button.parentElement.parentElement.nextElementSibling.textContent);
      // console.log(priceItemHtml, ' - priceItemHtml');
      // console.log(priceItemHtml.textContent, ' - priceItemHtml textContent');
      // let sumItemHtml = add_button.parentElement.parentElement.nextElementSibling.nextElementSibling;
      // console.log(sumItemHtml.textContent,' - sumItemHtml text conent');
      // let sumItem = parseInt(input.value) * priceItemHtml;
      // let sumItem = +sumItemHtml.textContent + +priceItemHtml.textContent;
      // let sumItem = parseInt(sumItemHtml.textContent) + parseInt(priceItemHtml.textContent);
      // console.log(+sumItemHtml.textContent + +priceItemHtml.textContent, ' - test');
      // console.log(sumItem, ' - sumItem');
      // sumItemHtml.innerHTML = sumItem;

      // let sum = parseInt(sumAll.textContent);
      // console.log(sum, ' - sum');
      // sumAll.innerHTML = sum + priceItemHtml;

    }
    // віднімання товару
    //TODO REMOVE item
    else if(event.target.classList.contains('cart_minus')) {
      console.log('its class remove');
      let remove_button =  event.target;
      let input = remove_button.parentElement.nextElementSibling;
      input.value = +input.value -1;
      // let count = +input.value;
      let data = {
        id: remove_button.parentElement.parentElement.parentElement.getAttribute('id'),
        // count: +remove_button.parentElement.nextElementSibling.value,
        type: 'minus'
      }
      console.log(data, ' - data');
      
      postData('/cart', data)
      // console.log(input, ' - input in remove');
      // console.log(+input.value, ' - input.value in remove');

      // let rez = parseInt(input.value) - 1;
      // console.log(rez, ' - rez');

      // let priceItem = parseInt(remove_button.parentElement.parentElement.nextElementSibling.textContent);
      // let sumItemHtml = remove_button.parentElement.parentElement.nextElementSibling.nextElementSibling;
      // let sumItem;  
      // console.log(remove_button.parentElement.parentElement.parentElement, ' - did');
      // console.log(remove_button.parentElement.parentElement.parentElement.getAttribute('id'), ' - did');
      // console.log(sumItem, " - sumItem");
    

      // let sum = parseInt(sumAll.textContent);

      // if(rez < 1) {
      //   input.value = 1;
      //   sumItem = priceItem;
      // } else {
      //   input.value = rez;
      //   sumItem = parseInt(input.value) * priceItem;
      //   sumAll.innerHTML = sum - priceItem;
      // }
      // sumItemHtml.innerHTML = sumItem;
    }
    //TODO CLOSE item
    else if(event.target.classList.contains('cart_close')){
      let close = event.target;
      let id = close.attributes.id.value;
      let sumItemHtml = parseInt(close.parentElement.parentElement.previousElementSibling.textContent);
      let sum = parseInt(sumAll.textContent) - sumItemHtml;
      // console.log(sumItemHtml, ' - sumItemHtml');
      // console.log(id, '- id');
      // c+onsole.log(close, ' - close');
      let trItem = document.getElementById(id);
      // let parent = document.querySelector(`table #${id}`);
      // console.log(document.getElementById(id));
      // console.log(document.getElementById(id).parentNode);
      let table = document.querySelector('#cart table');
      // console.log(parent, ' - parent');
     
      if(sum === 0) {
        table.parentNode.removeChild(table);
        sumAll.parentNode.removeChild(sumAll);

        let paragraf = document.createElement('p');
        paragraf.innerHTML = "КОРЗИНА ПУСТА";
        let cart = document.getElementById('cart');
        console.log(cart, ' - cart');
        cart.appendChild(paragraf);

      } else {
        trItem.parentNode.removeChild(trItem);
        sumAll.innerHTML = sum;
      }
     
    }
    else {
      console.log('none');
    }
});



//TODO  iNPUT item
cart.addEventListener('input', (event) => {
  if(event.currentTarget.classList.contains = 'cart_counter') {
    // console.log('input change');
    let input = event.target;
   
    let priceItemHtml = parseInt(input.parentElement.nextElementSibling.textContent);
    // console.log(priceItemHtml, ' - priceItemHtml in change');
    let sumItemHtml = input.parentElement.nextElementSibling.nextElementSibling;
    let sumItemHtmlStart = parseInt(sumItemHtml.textContent);
    // console.log(sumItemHtml, ' - sumItemHtml in change');
    let sum;
    if(input.value === "" || input.value === "0"){
      input.value = 1;
      sum = priceItemHtml;
    } else {
      sum = priceItemHtml * parseInt(input.value);
    }
    
    sumItemHtml.innerHTML = sum;
    let sumAllStart = parseInt(sumAll.textContent);
    let sumAllEnd = sumAllStart - sumItemHtmlStart + sum;
    console.log(sumAllEnd, " - sumAllEnd");
    sumAll.innerHTML = sumAllEnd;
  }
})


