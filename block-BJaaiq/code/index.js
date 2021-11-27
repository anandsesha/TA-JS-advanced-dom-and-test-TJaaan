let ul = document.querySelector('.quotes-box')

alert('The content of DOM is loaded')

function loadMore(){
    quotes.forEach((elm) => {
        
        let parentDiv = document.createElement("div");
        parentDiv.classList.add("parentDiv");
        let quote = document.createElement('h2');
        quote.innerText = elm.quoteText;
        let author = document.createElement('span');
        author.innerText = `author => ${elm.quoteAuthor}`;
        
        parentDiv.append(quote,author);
        listElm.append(parentDiv);

    })
}

ul.addEventListener('scroll',() => {
    if(ul.scrollTop + ul.clientHeight >= ul.scrollHeight){
        loadUI();
    }
})

loadMore();