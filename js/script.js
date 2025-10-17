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
  newArticle.appendChild(divHeader);

  const avatarHeader = document.createElement('img');
  avatarHeader.classList.add('avatar');


  let avatarFilename = "default.jpeg";
  const authorIndex = authors.indexOf(article.author);

 

  if (authorIndex !== -1) {
    avatarFilename = `avatar${authorIndex}.png`;
  }


  avatarHeader.src = `images/${avatarFilename}`;
  avatarHeader.alt = 'avatar picture';

  const infoDiv = document.createElement('div');
  infoDiv.textContent = `${article.author} · ${article.date.toDateString()}`;

  divHeader.appendChild(avatarHeader);
  divHeader.appendChild(infoDiv);


  const divBody = document.createElement('div');
  divBody.classList.add('article-body');
  newArticle.appendChild(divBody);

  const h3Body = document.createElement('h3');
  h3Body.textContent = `${article.title}`;

  const pBody = document.createElement('p');
  pBody.textContent = `${article.content}`;

  
  


  if(pBody.textContent.length <= MAX_LENGTH){
    divBody.appendChild(h3Body);
    divBody.appendChild(pBody);

  }else{
    pBody.textContent = pBody.textContent.substring(0, MAX_LENGTH);
    const endSpan = document.createElement('span');
    endSpan.textContent = '...';

    const hiddenSpan = document.createElement('span');
    hiddenSpan.classList.add('hidden');
    hiddenSpan.textContent = article.content.substring(MAX_LENGTH);

    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('btn');
    readMoreButton.textContent = 'Read More';

    divBody.appendChild(h3Body);
    divBody.appendChild(pBody);
    divBody.appendChild(readMoreButton);
    pBody.appendChild(endSpan);
    pBody.appendChild(hiddenSpan);
    
  }


}

function submitForm(clickEvent) {
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
            const date = new Date();
            const article = {title, author, content, date};
            articles.push(article);
            addEntry(article);
            formEvent.preventDefault();
        }
    });
}

const postButton = document.querySelector("form>button");
postButton.addEventListener("click", (clickEvent) => submitForm(clickEvent));

function deleteArticle(clickEvent) {
    if(clickEvent.target.className === 'delete-btn'){
        const parentElement = clickEvent.target.parentElement;
        const titleElement = parentElement.querySelector("h3").innerText;
        const index = articles.findIndex(article => article.title === titleElement);
        if(index != -1){
            articles.splice(index, 1);
        }
        clickEvent.target.parentElement.remove();
    }
}

const articleWrapper = document.querySelector(".articles-wrapper");
articleWrapper.addEventListener("click", (clickEvent) => deleteArticle(clickEvent));

function readMore(clickEvent) {
    if(clickEvent.target.innerText === 'Read More'){
        const parentElement = clickEvent.target.parentElement;
        const moreText = parentElement.querySelectorAll("p span");
        moreText.forEach(span => {
            span.classList.toggle("hidden");
        });
        clickEvent.target.innerText = "Read Less";
    } else {
        const parentElement = clickEvent.target.parentElement;
        const moreText = parentElement.querySelectorAll("p span");
        moreText.forEach(span => {
            span.classList.toggle("hidden");
        });
        clickEvent.target.innerText = "Read More";
    }
}

articleWrapper.addEventListener("click", (clickEvent) => readMore(clickEvent));
