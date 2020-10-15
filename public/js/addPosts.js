  let form = document.forms[0];
  let hr = document.querySelector('hr');
  

  function addArea (className, name, promptName) {
        let head = document.querySelector('.'+className);
        head.addEventListener('click', () => {
        let div = document.createElement('div');
        div.classList.add('input-field');
    
        let input = document.createElement('input');
        input.classList.add('validate');
        input.setAttribute("type", "text");
        TODO:
        input.setAttribute("name", name);
    
        let label = document.createElement('label');
        label.setAttribute("for", name);
        label.innerText = promptName;
    
        let span = document.createElement('span');
        span.classList.add("helper-text");
        span.setAttribute("data-error", "Заповніть поле");
    
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(span);
    
        form.insertBefore(div, hr);
        alert(`alert` + className);
      });
      console.log(className, name, promptName);
    }


  addArea('paragrafAdd', 'paragraf2', 'ПАРАГРАФ');
  addArea('listAdd', 'list2', 'СПИСОК');
  addArea('headingAdd', 'title2', 'ЗАГОЛОВКО Н2');
  addArea('attachAdd', 'img', 'ВВЕДІТЬ URL');  