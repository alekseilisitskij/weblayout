// Сервер

const SERVER_URL = 'http://localhost:3000'

async function serverAddSudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json()

    return data
}

async function serverGetSudents() {
  let response = await fetch(SERVER_URL + '/api/students', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
  })

  let data = await response.json()

  return data
}
console.log(await serverGetSudents());

let serverData = await serverGetSudents()

async function serverDeleteSudent(id) {
  let response = await fetch(SERVER_URL + '/api/students/' + id, {
      method: "DELETE",
  })

  let data = await response.json()

  return data
}


// База данных

// const studentsList = [
//   {
//     name: 'Олег',
//     surname:'Иванович',
//     lastname: 'Мостин',
//     age: '1999.12.18',
//     faculty: 'Экономический',
//     studyStart: '2023'
//   },
//   {
//     name: 'Алина',
//     surname:'Хамитовна',
//     lastname: 'Амирова',
//     age: '1994.12.18',
//     faculty: 'Юридический',
//     studyStart: '2020'
//   },
//   {
//     name: 'Светлана',
//     surname:'Владимировна',
//     lastname: 'Бочарова',
//     age: '1997.12.18',
//     faculty: 'Экономический',
//     studyStart: '2020'
//   },
//   {
//     name: 'Степан',
//     surname:'Николаевич',
//     lastname: 'Юсипенко',
//     age: '1995.12.18',
//     faculty: 'Экономический',
//     studyStart: '2021'
//   },
//   {
//     name: 'Максим',
//     surname:'Иванович',
//     lastname: 'Бондаренко',
//     age: '1998.12.18',
//     faculty: 'Инженерный',
//     studyStart: '2021'
//   },
// ]


let studentsList = []

if (serverData) {
  studentsList = serverData
}

let sortColumnFlag = 'fio'
let sortDirFlag = true
// Создание элементов

const $app = document.getElementById('app'),
      $add = document.getElementById('add-form'),
      $nameInp = document.getElementById('add-form__name-inp'),
      $surnameInp = document.getElementById('add-form__surname-inp'),
      $lastnameInp = document.getElementById('add-form__lastname-inp'),
      $databirthInp = document.getElementById('add-form__birthday-inp'),
      $facultyInp = document.getElementById('add-form__faculty-inp'),
      $startInp = document.getElementById('add-form__studyStart-inp'),
      $table = document.createElement('table'),
      $tableHead = document.createElement('thead'),
      $tableBody = document.createElement('tbody'),

      $filterForm = document.getElementById('filter-form'),
      $fioFilterInp = document.getElementById('filter-form__fio-inp'),
      $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),
      $startFilterInp = document.getElementById('filter-form__startAge-inp'),
      $finishFilterInp = document.getElementById('filter-form__finishAge-inp'),

$tableHeadTr = document.createElement('tr'),
$tableHeadThFIO = document.createElement('th'),
$tableHeadThBirthday = document.createElement('th'),
$tableHeadThfaculty = document.createElement('th'),
$tableHeadThStudyStart = document.createElement('th'),
$tableHeadThDelete = document.createElement('th');

$table.classList.add('table', 'table-white')
$tableHeadThFIO.classList.add('fio')
$tableHeadThBirthday.classList.add('birthday')
$tableHeadThfaculty.classList.add('faculty')
$tableHeadThStudyStart.classList.add('studyStart')

$tableHeadThFIO.textContent = 'ФИО',
$tableHeadThBirthday.textContent = 'Дата рождения',
$tableHeadThfaculty.textContent = 'Факультет',
$tableHeadThStudyStart.textContent = 'Годы обучения',

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThBirthday)
$tableHeadTr.append($tableHeadThfaculty)
$tableHeadTr.append($tableHeadThStudyStart)
$tableHeadTr.append($tableHeadThDelete)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

function calculateAge(birthDate) {
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
}

function getStudentItem(oneUser) {
  const $userTr = document.createElement('tr'),
  $userFIO = document.createElement('th'),
  $userBirthday = document.createElement('th'),
  $userFaculty = document.createElement('th'),
  $userStudyStart = document.createElement('th'),
  $userDeleteBtn = document.createElement('button');
  $userDeleteBtn.classList.add("btn", "btn-light", "w-100", "border-secondary-subtle")

  $userFIO.textContent = oneUser.fio,
  $userBirthday.textContent = `${oneUser.birthday}, ${calculateAge(oneUser.birthday)} лет`,
  $userFaculty.textContent = oneUser.faculty,
  $userStudyStart.textContent = oneUser.studyStart;
  $userDeleteBtn.textContent = "Удалить"

  $userDeleteBtn.addEventListener("click", async function() {
    await serverDeleteSudent(oneUser.id)
    $userTr.remove()
})

  const startYear = parseInt(oneUser.studyStart);
  const currentYear = new Date().getFullYear();
  const yearsSinceStart = currentYear - startYear;

  if (yearsSinceStart >= 4) {
    $userStudyStart.textContent = 'закончил';
  } else {
    const endYear = startYear + 4;
    const course = yearsSinceStart + 1;
    $userStudyStart.textContent = `${startYear}-${endYear} (${course} курс)`;
  }


  $userTr.append($userFIO)
  $userTr.append($userBirthday)
  $userTr.append($userFaculty)
  $userTr.append($userStudyStart)
  $userTr.append($userDeleteBtn)
  return $userTr
}

function filter(arr, prop, value) {
  return arr.filter(function(oneUser) {
    if(oneUser[prop].includes(value.trim())) return true
  })
}

function renderStudentsTable(arrData) {
    // Подготовка
    $tableBody.innerHTML = '';
    let copyListData = [...arrData]


    for (const oneUser of copyListData) {
      oneUser.fio = oneUser.name + ' ' + oneUser.surname + ' ' + oneUser.lastname
      oneUser.finish = new String(+(oneUser.studyStart) + 4)
    }

      // Сортировка
    copyListData = copyListData.sort(function(a,b) {
      let sort = a[sortColumnFlag] < b[sortColumnFlag]
      if(sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
      if(sort) return -1
    });

      // Фильтрация
    if($fioFilterInp.value.trim() !== ''){
      copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
    }

    if($facultyFilterInp.value.trim() !== ''){
      copyListData = filter(copyListData, 'faculty', $facultyFilterInp.value)
    }

    if($startFilterInp.value.trim() !== ''){
      copyListData = filter(copyListData, 'study', $startFilterInp.value)
    }

    if($finishFilterInp.value.trim() !== ''){
      copyListData = filter(copyListData, 'finish', $finishFilterInp.value)
    }

    // отрисовка
    for (const oneUser of copyListData) {
      const $newTr = getStudentItem(oneUser)
      $tableBody.append($newTr)
  }
}

renderStudentsTable(studentsList)

// Добавления
$add.addEventListener('submit', async (event) => {
  event.preventDefault()

// Валидация
let yearDate = new Date(),
    yearStartDate = new Date('1900, 1, 1'),
    enterDate = new Date($databirthInp.value)

  if($nameInp.value.trim() =='') {
    $nameInp.classList.add('form-red')
    return
  } else {
    $nameInp.classList.remove('form-red')
  }

  if($surnameInp.value.trim() =='') {
    $surnameInp.classList.add('form-red')
    return
  } else {
    $surnameInp.classList.remove('form-red')
  }
  if($lastnameInp.value.trim() =='') {
    $lastnameInp.classList.add('form-red')
    return
  }else {
    $lastnameInp.classList.remove('form-red')
  }
  if($databirthInp.value.trim() =='' || enterDate < yearStartDate || enterDate > yearDate) {
    $databirthInp.classList.add('form-red')
    return
  }else {
    $databirthInp.classList.remove('form-red')
  }
  if($facultyInp.value.trim() =='') {
    $facultyInp.classList.add('form-red')
    return
  } else {
    $facultyInp.classList.remove('form-red')
  }
  if($startInp.value.trim() =='' || $startInp.value.trim() < 2000 || $startInp.value.trim() > yearDate.getFullYear()) {
    $startInp.classList.add('form-red')
    return
  } else {
    $startInp.classList.remove('form-red')
  }

  let newStudentObj = {
      name: $nameInp.value.trim(),
      surname:$surnameInp.value.trim(),
      lastname: $lastnameInp.value.trim(),
      birthday: $databirthInp.value.trim().replace(/\-/g, '.'),
      faculty: $facultyInp.value.trim(),
      studyStart: $startInp.value.trim()
    }

    let serverDataObj = await serverAddSudent(newStudentObj);

    serverDataObj.birthday = new Date(serverDataObj.birthday)
    // let serverDataObj = await serverAddSudent(newStudentObj[newStudentObj.length - 1]);
    studentsList.push(serverDataObj)

    renderStudentsTable(studentsList)

})

// клики сортировки

$tableHeadThFIO.addEventListener('click', () => {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThBirthday.addEventListener('click', () => {
  sortColumnFlag = 'birthday'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThfaculty.addEventListener('click', () => {
  sortColumnFlag = 'faculty'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThStudyStart.addEventListener('click', () => {
  sortColumnFlag = 'studyStart'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})


//Фильтр
$filterForm.addEventListener('submit', (event) => {
  event.preventDefault()
})

$fioFilterInp.addEventListener('input', (event) => {
  renderStudentsTable(studentsList)
})

$facultyFilterInp.addEventListener('input', (event) => {
  renderStudentsTable(studentsList)
})

$startFilterInp.addEventListener('input', (event) => {
  renderStudentsTable(studentsList)
})

$finishFilterInp.addEventListener('input', (event) => {
  renderStudentsTable(studentsList)
})


