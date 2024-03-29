(function(){
  const toggleButton = document.getElementById('toggleButton');
  const dropdownBlock = document.getElementById('dropdownBlock');
  const addInp = document.querySelectorAll('.form-inp');
  const addForm = document.getElementById('add-form')
  const reqExpEnter = /^[а-яА-ЯёЁ\s\-']+$/;


  toggleButton.addEventListener('click', () => {
    dropdownBlock.classList.toggle('hidden');
  });


  document.addEventListener('click', (e) => {
    if (!dropdownBlock.contains(e.target) && !toggleButton.contains(e.target)) {
      dropdownBlock.classList.add('hidden');
    }
  });

  // 2 задание
  function includeInput(){
    addInp.forEach(element => {

      element.addEventListener('keypress', event => {
        // const inputValue = event.target.value + event.key

        // if(!reqExpEnter.test(inputValue)) event.preventDefault();
        if(!reqExpEnter.includes(String(event.key.toLowerCase()))) {
          event.preventDefault();
        }
      })

      element.addEventListener('blur', () => {

        let inputValue = element.value.trim().replace(/\s+/g, ' ').replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
        if(inputValue) {
          element.value = inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase();
        } else {
          return
        }
        if (!reqExpEnter.test(inputValue)) {
          event.target.value = inputValue.replace(/[a-zA-Z]/g, '');
      }
      })
    })
  }
  includeInput()
  let add = document.querySelector('.fio');
  let name = document.getElementById('add-form__name'),
      surname = document.getElementById('add-from__surname'),
      lastname = document.getElementById('add-from__lastname');

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    add.textContent = `${name.value} ${surname.value} ${lastname.value}`
    e.target.reset();
  })
})()


