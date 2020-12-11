// удобно хранить все доступы к DOM-элементам в отдельном файле js с export default
export default {
  header: document.querySelector(".header"),
  nav: document.querySelector(".headerNav"),
  navList: document.querySelector(".navList"),

  home: document.querySelector(".home"),
  about: document.querySelector(".about"),
  contacts: document.querySelector(".contacts"),

  posts: document.querySelector(".posts"),
  postForm: document.querySelector(".postForm"),
};
