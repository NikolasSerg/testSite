function objCompos (event) {
    console.log(event.currentTarget.form[0]);
    console.log(event.currentTarget.form[1]);
    console.log(event.currentTarget.form[2]);
    console.log(event.currentTarget.form.length);

  let obj = {};
  for(let i = 0; i < 3; i++)  {
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



// let backetNavbar  = document.querySelector('.navbar_backet');
// let backetHiden  = document.querySelector('.navbar_hiden');


// backetNavbar.addEventListener('mouseover', function(){
//     backetHiden.style.display = 'block';
//     console.log('ura');
// })
// backetNavbar.addEventListener('mouseout', function(){
//     backetHiden.style.display = 'none';
//     console.log('bbbra');
// })

// function forTest(event) {
//     let obj = {};
     
//     for(let i = 0; i < 3; i++) {
//         let name = event.currentTarget.form[i].name;
//         let value = event.currentTarget.form[i].value;
//         obj[name] = value;
//     }
//     return obj;
// }

// async function testDrive(event) {
//     console.log(event.currentTarget.form[0]);
//     console.log(event.currentTarget.form[1]);
//     console.log(event.currentTarget.form[2]);
//     console.log(event.currentTarget.form[3]);
//     console.log(event.currentTarget.form.length);
    
//     let test = await forTest(event);

//     console.log(test, ' - test');
//     event.preventDefault();
//     let test2 = {
//         test: 'test it is'
//     }

//     let response = await fetch('/backet',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//               },
//             body: JSON.stringify(test2)
//         }
//     )
//     let result = await response.json();
//     alert(result.message);
// }

// // --------------------------------
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *client
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
//   }
  
//   postData('/backet', { answer: 42 })
//     .then((data) => {
//       console.log(data); // JSON data parsed by `response.json()` call
//     });


// // backetNavbar.onfocus = function() {
// //     console.log('test');
// // }