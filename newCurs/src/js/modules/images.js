const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

          imgPopup.classList.add('popup');

          imgPopup.style.justifyContent = 'center';
          imgPopup.style.alignItems = 'center';
          imgPopup.style.display = 'none';
          imgPopup.append(bigImage);
          workSection.append(imgPopup);
          workSection.addEventListener('click', (e) => {
            e.preventDefault();

            let target = e.target;

            if(target && target.classList.contains){
                imgPopup.style.display = 'flex';
                const path = target.parentNode.getAttribute('href');
                bigImage.setAttribute('src', path);
            }

            if(target && target.matches('div.popup')){  //target.matches('div.popup')- есть ли совпадение с этим блоком div.popup
                imgPopup.style.display = 'none';
            }
          })

};

export default images