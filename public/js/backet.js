async function backet_fetchToServer(event){
  console.log(event.currentTarget.form[0], " - target 0");
  let id = event.currentTarget.form[0].name;
  let value = event.currentTarget.form[0].value;
  event.preventDefault();

  let obj = {
    id: value
  }

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
