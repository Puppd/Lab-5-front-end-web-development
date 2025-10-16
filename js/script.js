"use strict";

const MAX_LENGTH = 200;

const authors = ['Tyrone', 'Ava', 'Elijah', 'Lucas', 'Ebony', 'Keisha', 'Jemila', 'Daniel'];

const articles = [
  {
    title: 'CSS Selectors',
    author: 'Tyrone',
    date: new Date(2023, 1, 20),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },

  {
    title: 'Cascading',
    author: 'Jemila',
    date: new Date(2023, 2, 1),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.'
  },

  {
    title: 'CSS Grid',
    author: 'Keisha',
    date: new Date(2023, 2, 12),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.'
  }
];

articles.forEach(article=>{
  addEntry(article);
});


/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {

  const newArticle = document.createElement(article.forEach);
  newArticle.classList.add('article-container');
  const articlesWrapper = document.querySelector('.articles-wrapper');
  articlesWrapper.appendChild(newArticle);


  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('delete-btn');
  newArticle.appendChild(deleteButton);




  const divHeader = document.createElement('div');
  divHeader.classList.add('article-header');

  const avatarHeader = document.createElement('img');
  avatarHeader.classList.add('avatar');


  console.log(article.author);

  let avatarFilename = "default.jpeg";
  const authorIndex = authors.indexOf(article.author);

 

  if (authorIndex !== -1) {
    avatarFilename = `avatar${authorIndex + 1}.png`;
  }

   console.log(avatarFilename);

  avatarHeader.src = `images/${avatarFilename}`;
  avatarHeader.alt = 'avatar picture';

  const infoDiv = document.createElement('div');
  infoDiv.textContent = '${newArticle.author} · ${newArticle.date.toDateString()}';

  divHeader.appendChild(avatarHeader);
  divHeader.appendChild(infoDiv);

}

function submitForm() {
    document.forms["postForm"].addEventListener("submit", (formEvent) => {
        const valid = document.forms["postForm"].reportValidity();
        if(valid){
            let titleInput = document.querySelector("#title");
            let authorInput  = document.querySelector("#author");
            let contentInput  = document.querySelector("#content");
            let title = titleInput.value;
            titleInput.value = "";
            let author= authorInput.value;
            authorInput.value = "";
            let content = contentInput.value;
            contentInput.value = "";
            const date = Date();
            const article = {title, author, content, date};
            articles.add(article);
            addEntry(article);
            formEvent.preventDefault();
        }
    });
}

const postButton = document.querySelector("form>button");
postButton.addEventListener("click", submitForm(clickEvent));
