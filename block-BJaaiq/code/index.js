let ul = document.querySelector('.quotes-box')

// Step 1: Display quotes in UI
// Step 2: Whenever you scroll down you need to add new quotes at the bottom (See diagram for this)

// Display 3 quotes
let max = 3;

// to add text inside blockqote and li below, we'll use this index
let index = 0;

// We need to loop over 3 times and create li and display it

function addQuotes(){

    for(i = 0; i< max; i++){
        let li = document.createElement('li')
        let blockquote = document.createElement('blockquote')
        blockquote.innerText = quotes[index].quoteText;
        blockquote.classList.add('quotes')
        // with the above quotes[index] we got acess to quoteText and quoteAuthor 
        let cite = document.createElement('cite')
        cite.innerText = quotes[index].quoteAuthor;
        cite.classList.add('author')

        // Now add this blockquote and cite inside the li as done in HTML
        li.append(blockquote,cite)
        ul.append(li)

        index++; // index has to increment everytime
    }
}

addQuotes();

document.addEventListener('scroll',() => {
    // scrollTop is , after you scroll for a bit, the portion of the page that goes above (disappears above) is the scrollTop 
    let scrollTop = document.documentElement.scrollTop;

    // The TOTAL height of the webpage, i.e including scrolling fully (from top to bottom)
    let scrollHeight = document.documentElement.scrollHeight;
    
    // clientHeight is the current height of the page that you are viewing. it'll always remain the same regardless if you scroll the page up and down. Its basically your page height at any point of time. 
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight >= scrollHeight && index < quotes.length){
        addQuotes();
    }
})

// Using the lifeCycle of DOM 

window.addEventListener('DOMContentLoaded',() => {
    alert('The content of DOM is loaded')
    addQuotes();
})