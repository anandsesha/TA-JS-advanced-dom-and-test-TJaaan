// Step 1: When you add a new item it should add it to the card
// Step 2: Add support for Local Storage
// Step 3: Make cards EDITABLE
// Step 4: Handle Blur event

let form = document.querySelector('form')
let ul = document.querySelector('.addCards')

let cardsData = JSON.parse(localStorage.getItem('cards')) || [];

form.addEventListener('submit',(event) => {
    event.preventDefault();

    let title = event.target.title.value;
    let category = event.target.category.value;
    console.log(title,category)
    // After you've collected the data from title and category add it to an array above.
    cardsData.push({title,category}) 

    localStorage.setItem('cards',JSON.stringify(cardsData))

    createUI(cardsData,ul)
})

function handleEdit(event,info,id,label){
    // Whenever user double clicks on 'p' elemnt we have to replace it with 'input' element where user can edit the field
    let elm = event.target;  // p
    let input = document.createElement('input')
    input.value = info;
    input.addEventListener('keyup',(event) => {
        if(event.keyCode === 13){
            let updatedValue = event.target.value;
            cardsData[id][label] = updatedValue;
            createUI()
            localStorage.setItem('cards',JSON.stringify(cardsData))
        }
    })
    // For Blur event
    input.addEventListener('blur',(event) => {
        let updatedValue = event.target.value;
        cardsData[id][label] = updatedValue;
        createUI()
        localStorage.setItem('cards',JSON.stringify(cardsData))
    })



    // Now to replace p with input we need access to p's parent i.e li
    let parent = event.target.parentElement;
    parent.replaceChild(input,elm)
}

{/* <li class="each-card flex-45">
    <p>Daily Needs</p>
    <h2>Get banana from the next shop</h2>
</li> */}

// Now after collecting and adding data to the cardsData array, Display the card
function createUI(data = cardsData,root = ul){ 
    root.innerHTML = "";
    // displays UI for each added card in the cardsData array

    // Since DOM is less efficient and appending a card data (as we do ususlly) after a loop runs once takes multiple appends, hence using fragment we only append once
    var fragment = new DocumentFragment();
    data.forEach((cardInfo,index) => {
        let li = document.createElement('li')
        li.classList.add("each-card","flex-45")
        let p = document.createElement('p')
        p.innerText = cardInfo.category;
        p.addEventListener('dblclick',(event) =>
            handleEdit(event,cardInfo.category,index,'category')
        )
        let h2 = document.createElement('h2')
        h2.innerText = cardInfo.title;
        h2.addEventListener('dblclick',(event) =>
            handleEdit(event,cardInfo.title,index,'title')
        )
        
        li.append(p,h2)
        fragment.appendChild(li)
    })
    root.append(fragment)
    // Hence we did not append DOM on every element of the array
}

createUI(cardsData,ul);