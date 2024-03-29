// Сервер
const SERVER_URL = 'http://localhost:3000';

export async function serverAddSudent(obj) {

    let response = await fetch(SERVER_URL + '/api/clients', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
   })

    let data = await response.json();

    return data

}
const $block = document.querySelector('.block__list');
const $blockSpin = document.querySelector('.block__spin');
export async function serverGetSudents() {
  $blockSpin.style.display = 'block';
  $block.style.display = 'none';
  try {
    let response = await fetch(SERVER_URL + '/api/clients', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
  })

  let data = await response.json()
  return data
  } catch (error) {
    console.error('Ошибка в serverAddSudent:', error);
    const $block = document.querySelector('.block__list'),
          $failed = document.createElement('div');

          $failed.classList.add('failed')

    $failed.textContent = 'Что то не так'
    $block.append($failed)
    throw error;
  } finally {
    $block.style.display = 'block';
    $blockSpin.style.display = 'none'; // Скрываем блок загрузки независимо от результата запроса
  }

}

export async function serverDeleteSudent(id) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "DELETE",
    })
  
    let data = await response.json()
  
    return data
  }

export async function serverPatchSudent(id, obj) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    })
  
    let data = await response.json()

    return data
  }