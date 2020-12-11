// рабочий файл, который из библиотеки handlebars создает разметку по шаблону (template) и встраивает ее в браузер
// нужно создать сам шаблон и получить доступ через import к DOM-жлементу внутри html-файла

// ПОЛУЧАЕМ ДОСТУП К ДОМ-ЭЛЕМЕНТУ, КУДА ВСТРАИВАТЬ РЕЗУЛЬТАТЫ ШАБЛОНОВ
import postsRef from "./refs";
// с помоцью деструктуризации обращаюсь в refs.js к данным posts и postForm. И для удобства переименовываю post в postSection
const { posts: postSection, postForm } = postsRef;
// console.log(postSection, postForm);

// МАССИВ ДАННЫХ ДЛЯ ШАБЛОНА
import postsList from "../data/posts.js";
// console.log(postsList);

// ЗАТЯГИВАЕМ СОБСТВЕННО САМ ШАБЛОН
import postTemplate from "../templates/post.hbs";
// console.log(postTemplate); //на выходе будет функция, которую вызываем и передаем данные, которые функция перебирает и вставляет в указанный шаблон

// СОЗДАЕМ ПОСТЫ - ЭЛЕМЕНТЫ ПО ШАБЛОНУ
const newPost = postTemplate(postsList);
// console.log(newPost);

// ВСТРАИВАЕМ  newPost В HTML РЕЗУЛЬТАТ
postSection.insertAdjacentHTML("afterbegin", newPost);

// Варианты шаблонизации в случае если нужна простая разметка
// с помощью innerHTML недостатки способа: нельзя записывать внутрь innerHTML, т.к.в таком случае будет удалена вся предыдущая разметка из текущего элемента и  потом все элементы, даже те, которые не нужно трогать - пересоздает заново, в отличие от insertAdjacentHTML, который не удаляет всю предыдущую разметку
const tech = ["HTML", "CSS", "JS", "React"];
const galleryRef = document.querySelector(".posts");
// console.log(galleryRef);

const element = '<li><a href="">Hello</a></li>';
// galleryRef.innerHTML = element;

// шаблонизация с помощью insertAdjacentHTML, map и join
// const tech = ["HTML", "CSS", "JS", "React"];
// const galleryRef = document.querySelector(".posts");
const markup = tech.map((el) => `<li><a href="">${el}</a></li>`).join("");
galleryRef.insertAdjacentHTML("beforeend", markup);

// JSON
const user = {
  name: "Sandra",
  age: 30,
};
console.log(user);
console.log(JSON);

// преобразовать объект в формат JSON
const jsonUser = JSON.stringify(user);
console.log(jsonUser);

// преобразовать данные в формате JSON в объект
const newUser = JSON.parse(jsonUser);
console.log(newUser);

console.log(localStorage);
// вешаем слушателя событий на форму (postForm)
postForm.addEventListener("submit", (e) => {
  e.preventDefault(); //останавливаем первичную отправку формы

  //получаю доступ к input через обращение к атрибуту name
  console.log(e.currentTarget.elements.title);
  console.log(e.currentTarget.elements.post);

  // эти переменные нужны, чтобы брать получать данные, отправленные в этой форме, в local Storage
  const input = e.currentTarget.elements.title;
  const textarea = e.currentTarget.elements.post;

  // вызываю local Storage, чтобы получать и сохранять в нем введенные данные, для этого обращаеься к методу setItem и параметрами передаем свойство ключа и значение переменной input.value для input и textarea
  localStorage.setItem("input", input.value);
  localStorage.setItem("textarea", textarea.value);
});

// обращаемся с помощью метода getItem и можем получить значение ключа input и textarea
const inputValue = localStorage.getItem("input");
const textareaValue = localStorage.getItem("textarea");
console.log("inputValue: ", inputValue);
console.log("textareaValue: ", textareaValue);

// для удаления и очистки свойств в localStorage
localStorage.removeItem("input");
localStorage.clear();
