// База данных

const studentsList = [
  {
    name: 'Олег',
    surname:'Иванович',
    lastname: 'Мостин',
    age: '1999.12.18',
    faculty: 'Экономический',
    study: '2023'
  },
  {
    name: 'Алина',
    surname:'Хамитовна',
    lastname: 'Амирова',
    age: '1994.12.18',
    faculty: 'Юридический',
    study: '2020'
  },
  {
    name: 'Светлана',
    surname:'Владимировна',
    lastname: 'Бочарова',
    age: '1997.12.18',
    faculty: 'Экономический',
    study: '2020'
  },
  {
    name: 'Степан',
    surname:'Николаевич',
    lastname: 'Юсипенко',
    age: '1995.12.18',
    faculty: 'Экономический',
    study: '2021'
  },
  {
    name: 'Максим',
    surname:'Иванович',
    lastname: 'Бондаренко',
    age: '1998.12.18',
    faculty: 'Инженерный',
    study: '2021'
  },
]

let sortColumnFlag = 'fio'
let sortDirFlag = true
// Создание элементов

const $app = document.getElementById('app'),
      $add = document.getElementById('add-form'),
      $nameInp = document.getElementById('add-form__name-inp'),
      $surnameInp = document.getElementById('add-form__surname-inp'),
      $lastnameInp = document.getElementById('add-form__lastname-inp'),
      $databirthInp = document.getElementById('add-form__age-inp'),
      $facultyInp = document.getElementById('add-form__faculty-inp'),
      $startInp = document.getElementById('add-form__start-inp'),
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
$tableHeadThAge = document.createElement('th'),
$tableHeadThfaculty = document.createElement('th'),
$tableHeadThstart = document.createElement('th');

$table.classList.add('table', 'table-dark')
$tableHeadThFIO.classList.add('fio')
$tableHeadThAge.classList.add('age')
$tableHeadThfaculty.classList.add('faculty')
$tableHeadThstart.classList.add('start')

$tableHeadThFIO.textContent = 'ФИО',
$tableHeadThAge.textContent = 'Дата рождения',
$tableHeadThfaculty.textContent = 'Факультет',
$tableHeadThstart.textContent = 'Годы обучения',

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThAge)
$tableHeadTr.append($tableHeadThfaculty)
$tableHeadTr.append($tableHeadThstart)

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
  $userAge = document.createElement('th'),
  $userFaculty = document.createElement('th'),
  $userStart = document.createElement('th');

  $userFIO.textContent = oneUser.fio,
  $userAge.textContent = `${oneUser.age}, ${calculateAge(oneUser.age)} лет`,
  $userFaculty.textContent = oneUser.faculty,
  $userStart.textContent = oneUser.study;

  const startYear = parseInt(oneUser.study);
  const currentYear = new Date().getFullYear();
  const yearsSinceStart = currentYear - startYear;

  if (yearsSinceStart >= 4) {
    $userStart.textContent = 'закончил';
  } else {
    const endYear = startYear + 4;
    const course = yearsSinceStart + 1;
    $userStart.textContent = `${startYear}-${endYear} (${course} курс)`;
  }


  $userTr.append($userFIO)
  $userTr.append($userAge)
  $userTr.append($userFaculty)
  $userTr.append($userStart)
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
      oneUser.finish = new String(+(oneUser.study) + 4)
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
$add.addEventListener('submit', (event) => {
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

  studentsList.push({
      name: $nameInp.value.trim(),
      surname:$surnameInp.value.trim(),
      lastname: $lastnameInp.value.trim(),
      age: $databirthInp.value.trim().replace(/\-/g, '.'),
      faculty: $facultyInp.value.trim(),
      study: $startInp.value.trim()
    },)

    console.log(studentsList);
    renderStudentsTable(studentsList)
})

// клики сортировки

$tableHeadThFIO.addEventListener('click', () => {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThAge.addEventListener('click', () => {
  sortColumnFlag = 'age'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThfaculty.addEventListener('click', () => {
  sortColumnFlag = 'faculty'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

$tableHeadThstart.addEventListener('click', () => {
  sortColumnFlag = 'study'
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


