function filter(allList, blackList) {
  let whileList = [];
  for (let i = 0; i < allList.length; i++) {
    if (!blackList.includes(allList[i])) {
      whileList.push(allList[i]);
    }
  }
  return whileList;
}
let allListEmails = ['teterin@agriculture.ru', 'lawpro-707@list.ru', 'solowey011@yandex.ru', 'ahds@aol.com', 'akas@aol.com', 'gyu@emails.ru', 'workpost@fxt.ru', 'bolinir@googlemail.com'];

let blackListEmails = ['jlsgvqvh@kto.com', 'lawpro-6068@list.ru', 'lenkaalenka@mail.ru', 'tanja.albert@mail.ru', 'zarcas@narod.ru', 'atlantis@olvia.com.ua'];

filter(allListEmails, blackListEmails);

export default filter;
