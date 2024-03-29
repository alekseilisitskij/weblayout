(()=>{"use strict";function t(t){return t.toString().padStart(2,"0")}function e(e,n="-"){return[t(e.getDate()),t(e.getMonth()+1),e.getFullYear()].join(n)+" "+[t(e.getHours()),t(e.getMinutes())].join(":")}function n(t,e,n,a){const l=document.body;l.addEventListener("click",(c=>{const d=c.target,o=d.closest(t),s=document.querySelector(e),i=d.closest(n),r=d.closest(a);o&&(c.preventDefault(),s.style.display="block",l.style.overflow="hidden"),(i||s&&d===s)&&(s.style.display="none",l.style.overflow=""),r&&(s.style.display="none",l.style.overflow="")}))}function a(t,e,n,a){const l=document.querySelector(t),c=document.createElement("div"),d=document.createElement("select"),o=document.createElement("input"),s=document.createElement("button"),i=document.createElement("img"),r=document.querySelector(e);c.classList.add(n),d.classList.add("form-select","form-select-sm"),d.setAttribute("aria-label",".form-select-sm"),o.classList.add("form-control","modal__form-control"),o.setAttribute("name","data_input"),o.setAttribute("required","true"),o.setAttribute("type","text"),o.setAttribute("placeholder","Введите данные контакта"),s.classList.add("btn-reset","form-delete_btn"),i.setAttribute("src","assets/img/cancelsmall.svg"),i.setAttribute("alt","cancelsmall"),r.style.padding="15px 0 15px 0",["phone","AdditionalPhone","mail","vk","fb"].forEach(((t,e)=>{const n=document.createElement("option");n.classList.add("modal__input_option"),n.value=t,n.text=t,0===e&&(n.selected=!0),d.append(n)})),a&&a.forEach(((t,e)=>{const n=document.createElement("option");n.classList.add("modal__input_option"),n.value=t.type,n.text=t.type,o.value=t.value,0===e&&(n.selected=!0),d.append(n)})),s.append(i),c.innerHTML="",c.append(d),c.append(o),c.append(s),l.append(c),l.insertBefore(c,r),s.addEventListener("click",(t=>{t.preventDefault(),r.style.padding="0",c.remove()}))}function l(t){document.querySelector(t).style.display="none",document.body.style.overflow=""}function c(t,e){let n=document.querySelectorAll(e),a=document.querySelector(t);n.forEach((t=>{t.remove()})),a.style.padding="0"}const d="http://localhost:3000",o=document.querySelector(".block__list"),s=document.querySelector(".block__spin");async function i(){s.style.display="block",o.style.display="none";try{let t=await fetch(d+"/api/clients",{method:"GET",headers:{"Content-Type":"application/json"}});return await t.json()}catch(t){console.error("Ошибка в serverAddSudent:",t);const e=document.querySelector(".block__list"),n=document.createElement("div");throw n.classList.add("failed"),n.textContent="Что то не так",e.append(n),t}finally{o.style.display="block",s.style.display="none"}}[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(t){return new bootstrap.Tooltip(t)})),$((function(){$('[data-toggle="tooltip"]').tooltip()}));let r=[];const m=/^[а-яА-ЯёЁa-zA-Z]+(\s[а-яА-ЯёЁa-zA-Z]+)?(\s[а-яА-ЯёЁa-zA-Z]+)?$/,u=async function(){let t,o="fio",s=!0,u=await i();u&&(r=u);const _=async()=>{t&&(await async function(t){let e=await fetch(d+"/api/clients/"+t,{method:"DELETE"});return await e.json()}(t.id),r=r.filter((e=>e.id!==t.id)),l(".modal__deleteClient"),l(".modal__changeClient"),Q(r),t=null)},p=t=>{t.preventDefault();const e=document.querySelector(".modal__form_btnChange");document.querySelectorAll(".modal__inputChange").length<=10?a(".modal__btnChange","#addChangeContactBtn","modal__inputChange"):e.disabled="true"},h=async()=>{const e=Array.from(document.querySelectorAll(".modal__inputChange")).map((t=>{const e=t.querySelector(".form-select"),n=t.querySelector(".modal__form-control");return{type:e.value,value:n.value}})),n={name:J.value,surname:G.value.trim(),lastName:Y.value.trim(),contacts:e};await async function(t,e){let n=await fetch(d+"/api/clients/"+t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await n.json()}(t.id,n);const a=r.findIndex((e=>e.id===t.id));-1!==a&&(r[a]={...r[a],...n}),l(".modal__changeClient"),Q(r)},g=document.querySelector(".block__list"),L=document.getElementById("user_name"),v=document.getElementById("user_surname"),f=document.getElementById("user_lastname"),b=document.getElementById("filter__form"),y=document.getElementById("filter__inp"),w=document.createElement("table"),E=document.createElement("thead"),C=document.createElement("tbody"),k=document.createElement("tr"),A=document.createElement("th"),x=document.createElement("th"),B=document.createElement("th"),S=document.createElement("th"),M=document.createElement("th"),q=document.createElement("th"),T=document.createElement("button"),D=document.createElement("button"),$=document.createElement("button"),I=document.createElement("button"),H=document.createElement("img"),P=document.createElement("img"),F=document.createElement("img"),Z=document.createElement("img"),j=document.getElementById("addContactBtn"),N=document.querySelector(".block__btn"),V=document.getElementById("changeBtn"),z=document.getElementById("saveBtn"),O=document.getElementById("addChangeContactBtn"),J=document.getElementById("user_nameChange"),G=document.getElementById("user_surnameChange"),Y=document.getElementById("user_lastnameChange");function K(l){const d=document.createElement("tr"),o=document.createElement("td"),s=document.createElement("td"),i=document.createElement("td"),r=document.createElement("td"),m=document.createElement("td"),u=document.createElement("td"),g=document.createElement("button"),L=document.createElement("button");o.classList.add("td__id"),s.classList.add("td__fio"),i.classList.add("td__data"),r.classList.add("td__clear"),m.classList.add("td__contacts"),u.classList.add("td__move"),g.classList.add("block__btn_change","btn-reset"),L.classList.add("block__btn_delete","btn-reset"),o.textContent=l.id,s.textContent=l.fio,i.textContent=e(new Date(l.createdAt),"."),r.textContent=e(new Date(l.updatedAt),".");const v=function(t){const e={vk:"Вконтакте",fb:"Facebook",mail:"Почта",phone:"Телефон",AdditionalPhone:"Доп.телефон"},n=document.createElement("span");for(let a=0;a<Math.min(t.length,4);a++){const l=t[a],c=document.createElement("a"),d=document.createElement("span"),o=`../assets/img/${l.type}.svg`;n.classList.add("contacts"),c.classList.add(`${l.type}`),c.style.backgroundImage=`url(${o})`,c.href=`${l.value}`,d.classList.add("tooltip"),d.setAttribute("data-toggle","tooltip"),new bootstrap.Tooltip(c,{placement:"top",title:`${e[l.type]}: ${[l.value]}`}),c.append(d),n.append(c)}if(t.length>4){const a=document.createElement("button");a.classList.add("btn"),a.classList.add("btn-reset"),a.classList.add("btn__contacts"),a.innerHTML=`<svg class="contacts__svgNumber" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <circle cx="8" cy="8" r="7.5" stroke="#9873FF"/>\n        <text x="50%" y="50%" font-size="8" text-anchor="middle" alignment-baseline="middle" fill="#333333">+${t.length}</text>\n        </svg>`,a.addEventListener("click",(function(){!function(){n.innerHTML="";for(let a=0;a<t.length;a++){const l=t[a],c=document.createElement("a"),d=document.createElement("span"),o=`../assets/img/${l.type}.svg`;n.classList.add("contacts"),c.classList.add(`${l.type}`),c.style.backgroundImage=`url(${o})`,c.href=`${l.value}`,d.classList.add("tooltip"),d.setAttribute("data-toggle","tooltip"),new bootstrap.Tooltip(c,{placement:"top",title:`${e[l.type]}: ${[l.value]}`}),c.append(d),(!l.isHidden||a<4)&&n.append(c)}}()})),n.append(a)}return n}(l.contacts);return m.append(v),g.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="edit" opacity="0.7" clip-path="url(#clip0_216_219)"><path id="Vector" d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/></g><defs><clipPath id="clip0_216_219"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Изменить',L.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="cancel" opacity="0.7" clip-path="url(#clip0_216_224)"><path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g><defs><clipPath id="clip0_216_224"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Удалить',g.addEventListener("click",(async e=>{e.preventDefault(),n(".block__btn_change",".modal__changeClient",".btn-closed"),t=l,J.value=t.name,G.value=t.surname,Y.value=t.lastName,O.addEventListener("click",p),c("#addChangeContactBtn",".modal__inputChange"),t.contacts.forEach((t=>{a(".modal__btnChange","#addChangeContactBtn","modal__inputChange",[t])})),V.removeEventListener("click",h),V.addEventListener("click",h);const d=document.getElementById("btnDeleteChange");d.removeEventListener("click",_),d.addEventListener("click",_),O.disabled=!1})),L.addEventListener("click",(e=>{e.preventDefault(),n(".block__btn_delete",".modal__deleteClient",".btn-closed",".modal__content_close"),t=l;const a=document.querySelector(".modal__content_btn-delete");a.removeEventListener("click",_),a.addEventListener("click",_)})),u.append(g,L),d.append(o,s,i,r,m,u),d}function Q(t){C.innerHTML="";let e=[...t];for(const t of e)t.fio=` ${t.surname} ${t.name} ${t.lastName}`,t.updatedAt=new Date(t.updatedAt),t.createdAt=new Date(t.createdAt);var n,a;e=e.sort((function(t,e){let n=t[o]<e[o];if(0==s&&(n=t[o]>e[o]),n)return-1})),""!==y.value.trim()&&(n=e,"fio",a=y.value,e=n.filter((function(t){if(t.fio.includes(a.trim()))return!0})));for(const t of e){const e=K(t);C.append(e)}}w.classList.add("table","block__head"),A.classList.add("col","block__id"),x.classList.add("col","block__fio"),B.classList.add("col","block__data"),S.classList.add("col","block__clear"),M.classList.add("col","block__contacts"),q.classList.add("col","block__move"),T.classList.add("btn-reset","btn__th","btn__th_id"),D.classList.add("btn-reset","btn__th","btn__th_fio"),$.classList.add("btn-reset","btn__th","btn__th_data"),I.classList.add("btn-reset","btn__th","btn__th_clear"),H.classList.add("btn__th_svg"),P.classList.add("btn__th_svg"),F.classList.add("btn__th_svg"),Z.classList.add("btn__th_svg"),T.innerHTML='ID<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>',D.innerHTML='Фамилия Имя Отчество<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg><span class="fio-span">А-Б</span>',$.innerHTML='Дата и время<br>создания<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>',I.innerHTML='Последние<br>изменения<svg  class ="btn__th_svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="arrow_downward" clip-path="url(#clip0_211_4865)"><path id="Vector" d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></g><defs><clipPath id="clip0_211_4865"><rect width="12" height="12" fill="white" transform="translate(12 12) rotate(-180)"/></clipPath></defs></svg>',M.innerHTML="Контакты",q.innerHTML="Действия",A.append(T),x.append(D),B.append($),S.append(I),k.append(A,x,B,S,M,q),E.append(k),w.append(E,C),g.append(w),N.addEventListener("click",(t=>{t.preventDefault(),L.value="",v.value="",f.value="",c("#addContactBtn",".modal__input"),c("#addChangeContactBtn",".modal__inputChange"),Q(r)})),j.addEventListener("click",(t=>{t.preventDefault(),document.querySelectorAll(".modal__input").length<=10?a(".modal__btn","#addContactBtn","modal__input"):j.disabled=!0})),n(".block__btn",".modal__newClient",".btn-closed",".modal__content_close"),z.addEventListener("click",(async function(t){t.preventDefault();let e=document.querySelectorAll(".form-select"),n=document.querySelectorAll(".modal__form-control"),a=[];if(""==v.value.trim()||!m.test(v.value.trim()))return v.value="",void v.classList.add("form_red");if(v.classList.remove("form_red"),""==L.value.trim()||!m.test(L.value.trim()))return L.value="",void L.classList.add("form_red");if(L.classList.remove("form_red"),""==f.value.trim()||!m.test(f.value.trim()))return f.value="",void f.classList.add("form_red");f.classList.remove("form_red"),e.forEach((t=>{let e=t.options[t.selectedIndex],n=e?e.text:"";"Телефон"!==n&&a.push({type:n,value:""})})),a.length>0&&n.forEach(((t,e)=>{a[e]&&(a[e].value=t.value)}));let l={name:L.value,surname:v.value.trim(),lastName:f.value.trim(),contacts:[...a]};try{let t=await async function(t){let e=await fetch(d+"/api/clients",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await e.json()}(l);r.push(t),L.value="",v.value="",f.value="",Q(r)}catch(t){console.error("Ошибка при отправке данных на сервер:",t)}})),Q(r),T.addEventListener("click",(()=>{o="id",s=!s,Q(r),T.classList.toggle("btn__active",s)})),D.addEventListener("click",(()=>{o="fio",s=!s,Q(r),D.classList.toggle("btn__active",s)})),$.addEventListener("click",(()=>{o="createdAt",s=!s,Q(r),$.classList.toggle("btn__active",s)})),I.addEventListener("click",(()=>{o="updatedAt",s=!s,Q(r),I.classList.toggle("btn__active",s)})),b.addEventListener("submit",(t=>{t.preventDefault()})),y.addEventListener("input",(t=>{Q(r)}))};window.addEventListener("DOMContentLoaded",(function(){u(),document.querySelectorAll(".btn__th").forEach((t=>{t.addEventListener("click",(()=>{t.classList.toggle("btn__active")}))}))}))})();