// let count;
// let add;
// let remove;
// let sum;
let sumAll;

window.onload = function() {
  console.log('сторніка загрузилась');
  // let count = document.querySelector('#backet .backet_counter');
  // let add = document.querySelector('#backet .backet_add');
  // let remove = document.querySelector('#backet .backet_remove');
  sumAll = document.querySelector('#backet_sumAll');

  // console.log(sum);
  // // console.log(count, ' - count');
  // // console.log(count.value, ' - count.value');
  // console.log(add);
  // console.log(remove);
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


async function fetchToServer(event){
  event.preventDefault();
  let obj = await objCompos(event);

  postData('/backet', obj).
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

// опрацювання подій в корзині

let backet = document.querySelector('#backet');
backet.addEventListener('click', (event)  => {
    // додавання одиниць товару
    if(event.target.classList.contains('backet_add')) {
      let add_button =  event.target;
      // console.log(add_button, ' - add_button');
      let input = add_button.parentElement.previousElementSibling;
      // console.log(input, ' - input');

      // console.log('its class add');
      // console.log(event.target, ' - event.target');
      // console.log(event.target.attributes.name.value, ' - event.attributes.name.value');
      // console.log(input.value, ' - input value');
      input.value = +input.value + 1;
      
      let priceItemHtml = parseInt(add_button.parentElement.parentElement.nextElementSibling.textContent);
      // console.log(priceItemHtml, ' - priceItemHtml');
      // console.log(priceItemHtml.textContent, ' - priceItemHtml textContent');
      let sumItemHtml = add_button.parentElement.parentElement.nextElementSibling.nextElementSibling;
      // console.log(sumItemHtml.textContent,' - sumItemHtml text conent');
      let sumItem = parseInt(input.value) * priceItemHtml;
      // let sumItem = +sumItemHtml.textContent + +priceItemHtml.textContent;
      // let sumItem = parseInt(sumItemHtml.textContent) + parseInt(priceItemHtml.textContent);
      // console.log(+sumItemHtml.textContent + +priceItemHtml.textContent, ' - test');
      // console.log(sumItem, ' - sumItem');
      sumItemHtml.innerHTML = sumItem;

      let sum = parseInt(sumAll.textContent);
      // console.log(sum, ' - sum');
      sumAll.innerHTML = sum + priceItemHtml;

    }
    // віднімання товару
    else if(event.target.classList.contains('backet_remove')) {
      // console.log('its class remove');
      let remove_button =  event.target;
      let input = remove_button.parentElement.nextElementSibling;
      // console.log(input, ' - input in remove');
      // console.log(+input.value, ' - input.value in remove');

      let rez = parseInt(input.value) - 1;
      console.log(rez, ' - rez');

      let priceItem = parseInt(remove_button.parentElement.parentElement.nextElementSibling.textContent);
      let sumItemHtml = remove_button.parentElement.parentElement.nextElementSibling.nextElementSibling;
      let sumItem;  
       
      // console.log(sumItem, " - sumItem");
    

      let sum = parseInt(sumAll.textContent);

      if(rez < 1) {
        input.value = 1;
        sumItem = priceItem;
      } else {
        input.value = rez;
        sumItem = parseInt(input.value) * priceItem;
        sumAll.innerHTML = sum - priceItem;
      }
      sumItemHtml.innerHTML = sumItem;
    }
    else if(event.target.classList.contains('backet_counter')){
      let close = event.target;
      let parent = close.parentElement;
    }
    else {
      console.log('none');
    }
});


// let event = new Event("")

backet.addEventListener('input', (event) => {
  if(event.currentTarget.classList.contains = 'backet_counter') {
    // console.log('input change');
    let input = event.target;
    let priceItemHtml = parseInt(input.parentElement.nextElementSibling.textContent);
    // console.log(priceItemHtml, ' - priceItemHtml in change');
    let sumItemHtml = input.parentElement.nextElementSibling.nextElementSibling;
    let sumItemHtmlStart = parseInt(sumItemHtml.textContent);
    // console.log(sumItemHtml, ' - sumItemHtml in change');

    let sum = priceItemHtml * parseInt(input.value);
    sumItemHtml.innerHTML = sum;
    let sumAllStart = parseInt(sumAll.textContent);
    let sumAllEnd = sumAllStart - sumItemHtmlStart + sum;
    console.log(sumAllEnd, " - sumAllEnd");
    sumAll.innerHTML = sumAllEnd;
  }
})


