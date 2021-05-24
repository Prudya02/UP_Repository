class AdLists {
  _adListMas = [];
  _lastDeleted;
  constructor(adList) {
    this._adListMas = adList.concat();
  }
  static _validate(adItem) {
    if (typeof adItem === 'object') {
      return typeof adItem.id === 'string' && adItem.id > 0 &&
        typeof adItem.description === 'string' && adItem.description !== '' && adItem.description.length <= 200 &&
        typeof adItem.vendor === 'string' && adItem.vendor !== '' &&
        typeof adItem.createdAt === 'object' && adItem.createdAt !== null &&
        typeof adItem.discount === 'string' && adItem.discount !== '' && adItem.discount.length <= 4 &&
        typeof adItem.hashTags === 'object' && adItem.hashTags !== null && adItem.hashTags.length <= 13 &&
        adItem.hashTags.every((tag) => (typeof tag === 'string' && tag.length <= 20));
    }
    return false;
  }
  _comparator(list1, list2) {
    return list1.createdAt - list2.createdAt;
  }
  clear() {
    this._adListMas = [];
  }
  getlength() {
    return this._adListMas.length;
  }
  add(adItem) {
    if (AdLists._validate(adItem)) {
      this._adListMas.push(adItem);
      return true;
    }
    return false;
  }
  undo() {
    if (this._lastDeleted === undefined)
      return false;
    this._adListMas.push(this._lastDeleted);
    return true;
  }
  get(id) {
    var Item;
    if (typeof id === 'string' && id > 0) {
      Item = this._adListMas.find((element) => element.id === id);
      if (Item) {
        return Item;
      }
    }
    return false;
  }
  getAll() {
    return this._adListMas;
  }
  edit(id, adItem) {
    if (typeof id === 'string' && id > 0 && id <= this._adListMas.length && typeof adItem === 'object') {
      if (adItem.id || adItem.createdAt || adItem.vendor) {
        return false;
      }
      var AdTemp = {};
      Object.assign(AdTemp, this.get(id));
      for (let param in adItem) {
        AdTemp[param] = adItem[param];
      }
      if (!AdLists._validate(AdTemp)) {
        return false;
      }
      this.remove(id);
      this.add(AdTemp);
      return true;
    }
  }
  getPage(skip, top, filterConfig) {
    var list, list1, list2;
    if (!filterConfig) {
      list = this._adListMas.sort((list1, list2) => {
        return new Date(list1.createdAt) - new Date(list2.createdAt);
      });
    } else if (typeof filterConfig === 'object') {
      if (filterConfig.vendor) {
        list1 = this._adListMas.filter(Item => Item.vendor === filterConfig.vendor);
      }
      if (filterConfig.hashTags) {
        list2 = this._adListMas.filter(Item => Item.hashTags.some(
          Item => filterConfig.hashTags.includes(Item)));
      }
      if (list = list1 && list2)
        list1.concat(list2);
      else if (list = list2)
        Object.assign(list2);
      else
        Object.assign(list1);
      list = list.sort(this._comparator);
    } else {
      return null;
    }
    return list.slice(skip, top + skip);
  }
  addAll(adList) {
    return adList.filter(adItem => !this.add(adItem));
  }
  remove(id) {
    if (typeof id === 'string' && id > 0 && id <= this._adListMas.length) {
      var index = this._adListMas.findIndex(item => item.id === id)
      if (index !== -1) {
        this._lastDeleted = this._adListMas[index];
        this._adListMas.splice(index, 1);
        return true;
      }
    }
    return false;
  }
}
let adLists1 = new AdLists([{
    id: '1',
    description: 'Курсы по java',
    createdAt: new Date('2021-04-23T24:00:00'),
    siteLink: 'https://teachmeskills.by/',
    vendor: 'TeachMeSkills',
    photoLink: 'pic/p1.jpg',
    hashTags: ['java', 'courses', 'allSummer'],
    discount: '15%',
    validUntil: new Date('2021-06-01T24:00:00'),
    rating: '4.7',
    reviews: ['Можно ли присоединиться к курсу в середине лета?']
  },
  {
    id: '2',
    description: 'IT-Инкубатор',
    createdAt: new Date('2021-04-05T22:10:00'),
    siteLink: 'https://it-incubator.by',
    vendor: 'ITINCUBATOR',
    photoLink: 'pic/p2.png',
    hashTags: ['incub', 'front', 'ReactJS'],
    discount: '10%',
    validUntil: new Date('2021-09-01T22:10:00'),
    rating: '4.5',
    reviews: ['Порадовала возможность оплаты только полсе части обучения']
  }
])
console.log('adLists1.get(\'1\')', adLists1.get('1'));
adLists1.addAll([{
    id: '3',
    description: 'Курс Python разработчик',
    createdAt: new Date('2021-04-01T10:30:00'),
    siteLink: 'https://teachmeskills.by',
    vendor: 'TeachMeSkillsa',
    photoLink: 'pic/p3.png',
    hashTags: ['python', 'allSummer'],
    discount: '15%',
    validUntil: new Date('2021-06-01T23:00:00'),
    rating: '4.0',
    reviews: ['Приятная атмосфера', 'Много воды...']
  },
  {
    id: '4',
    description: 'Интенсив «Язык C++: создаём сервер за 3 дня»',
    createdAt: new Date('2021-01-01T21:00:00'),
    siteLink: 'https://tproger.ru',
    vendor: 'Tproger',
    photoLink: 'p4.png',
    hashTags: ['c++', 'server', 'intensive'],
    discount: '30%',
    validUntil: new Date('2021-07-01T21:00:00'),
    rating: '4.5',
    reviews: ['Полезные знания, однако без скидки слишком дорого)']
  },
  {
    id: '5',
    description: 'Java для начинающих',
    createdAt: new Date('2021-04-04T19:00:00'),
    siteLink: 'https://www.udemy.com/course/beginners-java/',
    vendor: 'Udemy',
    photoLink: 'p5.jpg',
    hashTags: ['java', 'forBeginners'],
    discount: '89%',
    validUntil: new Date('2021-10-01T23:00:00'),
    rating: '4.6',
    reviews: ['Немного накрученная цена, но материал хороший']
  },
  {
    id: '6',
    description: 'Java.От простого к сложному.',
    createdAt: new Date('2021-04-04T20:00:00'),
    siteLink: 'https://www.udemy.com/course/java-simple2advanced/',
    vendor: 'Udemy',
    photoLink: 'pic/p6.jpg',
    hashTags: ['java', 'learnMore'],
    discount: '67%',
    validUntil: new Date('2021-10-01T23:00:00'),
    rating: '4.7',
    reviews: ['Одна только часть про многопоточность отбивает стоимость курса)']
  },
  {
    id: '7',
    description: 'iOS-разработчик',
    createdAt: new Date('2021-09-01T23:00:00'),
    siteLink: 'https://teachmeskills.by/',
    vendor: 'TeachMeSkills',
    photoLink: 'pic/p7.jpg',
    hashTags: ['iOS, swift'],
    discount: '20%',
    validUntil: new Date('2022-09-01T23:00:00'),
    rating: '4.5',
    reviews: ['Хороший курс!']
  },
  {
    id: '8',
    description: 'Онлайн-Курс Аналитик Данных',
    createdAt: new Date('2020-02-01T20:00:00'),
    siteLink: 'https://skillfactory.ru/data-analyst-pro',
    vendor: 'SkillFactory',
    photoLink: 'p8.jpg',
    hashTags: ['sql', 'analyst'],
    discount: '15%',
    validUntil: new Date('2020-08-01T12:00:00'),
    rating: '4.8',
    reviews: ['Отличный курс, нашёл после него работу!']
  },
  {
    id: '9',
    description: 'Введение в Java',
    createdAt: new Date('2020-12-01T12:00:00'),
    siteLink: 'https://ru.hexlet.io/courses/java_101',
    vendor: 'Хекслет',
    photoLink: 'p8.jpg',
    hashTags: ['java', 'forBeginners'],
    discount: '15%',
    validUntil: new Date('2021-12-01T12:00:00'),
    rating: '4.0',
    reviews: ['Очень много воды...']
  },
  {
    id: '10',
    description: 'Learn To Program with Pascal',
    createdAt: new Date('2021-01-28T11:05:30'),
    siteLink: 'https://www.udemy.com/course/learn-to-program-with-pascal/',
    vendor: 'Udemy',
    photoLink: 'pic/p10.jpg',
    hashTags: ['Pascal', 'pro'],
    discount: '89%',
    validUntil: new Date('2021-09-01T23:00:00'),
    rating: '4.5',
    reviews: ['Хороший курс, объясняющий сложные вещи простым языком!']
  },
  {
    id: '11',
    description: 'Обучение Java c нуля.',
    createdAt: new Date('2020-08-13T12:00:00'),
    siteLink: 'https://javarush.ru',
    vendor: 'JavaRush',
    photoLink: 'pic/p11.jpg',
    hashTags: ['java', 'easy'],
    discount: '25%',
    validUntil: new Date('2021-09-01T12:00:00'),
    rating: '4.0',
    reviews: ['Довольно десткая форма обучения', 'Мало практических задач']
  },
  {
    id: '12',
    description: 'Jet Brains academy 1 year acsess',
    createdAt: new Date('2020-12-10T9:00:00'),
    siteLink: 'https://www.jetbrains.com/ru-ru/academy/',
    vendor: 'JetBrains',
    photoLink: 'pic/p12.jpg',
    hashTags: ['JBA', 'Java', 'Python'],
    discount: '55%',
    validUntil: new Date('2021-12-01T9:00:00'),
    rating: '5.0',
    reviews: ['Лучшие курсы по программированию', 'Однозначно стоит своих денег']
  },
  {
    id: '13',
    description: 'Профессия Frontend-разработчик pro',
    createdAt: new Date('2021-05-10T21:00:00'),
    siteLink: 'https://skillbox.ru/course/by/frontend-pro/',
    vendor: 'Skillbox',
    photoLink: 'pic/p13.jpg',
    hashTags: ['front', 'pro', 'ReactJS'],
    discount: '30%',
    validUntil: new Date('2022-05-10T21:00:00'),
    rating: '4.3',
    reviews: ['Неплохой материал, но рассказчик унылый(']
  },
  {
    id: '14',
    description: 'Курс “Ruby on Rails (веб-разработка)”',
    createdAt: new Date('2021-03-02T24:00:00'),
    siteLink: 'https://www.it-courses.by/courses/ruby-on-rails-web-development/',
    vendor: 'StormNet',
    photoLink: 'pic/p14.jpg',
    hashTags: ['Ruby', 'RoR'],
    discount: '45%',
    validUntil: new Date('2022-03-01T24:00:00'),
    rating: '4.0',
    reviews: []
  },
  {
    id: '15',
    description: 'Профессия 1C-разработчик',
    createdAt: new Date('2015-05-15T04:00:00'),
    siteLink: 'https://skillbox.ru/course/by/profession-1c/?',
    vendor: 'Skillbox',
    photoLink: 'pic/p15.jpg',
    hashTags: ['1С', 'online'],
    discount: '40%',
    validUntil: new Date('2025-05-24T23:00:00'),
    rating: '4.6',
    reviews: ['Спокойно нашёл работу после этого курса']
  },
  {
    id: '16',
    description: 'Курс “Программирование Python/Django”',
    createdAt: new Date('2020-11-18T03:00:00'),
    siteLink: 'https://www.it-courses.by/courses/programming-with-python/',
    vendor: 'StormNet',
    photoLink: 'pic/p16.jpg',
    hashTags: ['Py', 'Django'],
    discount: '45%',
    validUntil: new Date('2021-11-01T23:00:00'),
    rating: '3.5',
    reviews: ['Недостаточно практики за такие деньги']
  },
  {
    id: '17',
    description: 'Промышленное программирование на Java',
    createdAt: new Date('2021-05-10T10:00:00'),
    siteLink: 'https://www.it-courses.by/courses/programming-with-python/0',
    vendor: 'IT-ACADEMY',
    photoLink: 'pic/p17.jpg',
    hashTags: ['Java', 'pro'],
    discount: '10%',
    validUntil: new Date('2022-05-01T13:00:00'),
    rating: '0.0',
    reviews: []
  },
  {
    id: '18',
    description: 'Разработка на С#',
    createdAt: new Date('2020-04-02T12:00:00'),
    siteLink: 'https://gb.ru/geek_university/csharp-developer',
    vendor: 'GeekBrains',
    photoLink: 'pic/p18.jpg',
    hashTags: ['CSharp', 'Web'],
    discount: '40%',
    validUntil: new Date('2020-09-01T12:00:00'),
    rating: '4.8',
    reviews: ['Помогают с трудоустройством после обучения']
  },
  {
    id: '19',
    description: 'Веб-разработчик с нуля',
    createdAt: new Date('2021-01-12T10:00:00'),
    siteLink: 'https://netology.ru/programs/web-developer',
    vendor: 'Netology',
    photoLink: 'p19.jpg',
    hashTags: ['Web', 'forBeginners'],
    discount: '40%',
    validUntil: new Date('2021-06-01T23:00:00'),
    rating: '4.8',
    reviews: ['Достойный курс за свои деньги']
  },
  {
    id: '20',
    description: 'Основы программирования на Python',
    createdAt: new Date('2021-02-01T02:00:00'),
    siteLink: 'https://www.instituteiba.by/courses/it/python/python-courses/the-basics-of-programming-in-python/',
    vendor: 'IBA_INSTITUTE',
    photoLink: 'pic/p20.jpg',
    hashTags: ['Python', 'IBA'],
    discount: '15%',
    validUntil: new Date('2021-08-01T02:00:00'),
    rating: '4.8',
    reviews: ['Много практики, одобряю)']
  }
])
console.log('adLists1.get(1)', adLists1.get('1'));
console.log('adLists1.get(10)', adLists1.get('10'));
console.log('adLists1.getAll()', adLists1.getAll());
console.log('adLists1.edit(15, {discount: 40)}');
adLists1.edit(15, {
  discount: '40%'
});
console.log(adLists1.get('15'));
console.log('adLists1.remove(15)', adLists1.remove('15'));
console.log('Количество оставшихся объявлений:', adLists1.getlength());
console.log('adLists1.get(15)', adLists1.get('15'));
console.log('Вернём последнее удаленное объявление', adLists1.undo(), adLists1.get('15'));
console.log('adList1.getPage(0,20, {hashTags: [Web, pro]})', adLists1.getPage(0, 20, {
  hashTags: ['Web', 'pro']
}));