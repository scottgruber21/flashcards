const submitButton = document.querySelector('#submitButton')
const clock = document.querySelector('#clock')
const timeSelect = document.querySelector('#timeSelect')
const chord = document.querySelector('#chord')
const timeDisplay = document.querySelector('#time-display')
const addItem = document.querySelector('#addItem')
const addItemForm = document.querySelector('#addItemForm')
const listItems = document.querySelector('#listItems')
const del = document.querySelector('#del')
const clear = document.querySelector('#clear')
const addMultipleForm = document.querySelector('#addMultipleForm')
const addMultiple = document.querySelector('#addMultiple')
const close = document.querySelector('#close')
const edit = document.querySelector('#edit')
const body = document.querySelector('body')

let chordsList = localStorage.getItem('arr') ? JSON.parse(localStorage.getItem('arr')) : []

let toDelete = []

function rand(max){
    return Math.floor(Math.random() * max)
}

timeSelect.addEventListener('input', function(){
    document.querySelector('#time-display').innerHTML = `${timeSelect.value}s`
})


function timer(){
    let choice = chordsList.filter((item) => {
        return item != chord.textContent
    })
    chord.innerText = choice[rand(choice.length)]
}

function pickList(){
    let fullList = chordsList.map((item, index) => {
    return `
    <div class="checkbox-control">
<input type="checkbox" id="item-${item}" name="item-${item}" value="${item}">
<label for="item-${item}">${item}</label>
</div>`
}).join('')
listItems.innerHTML = fullList
localStorage.setItem('arr', JSON.stringify(chordsList))
}

addEventListener('load', function(){
    document.querySelector('#time-display').innerHTML = `${timeSelect.value}s`
    pickList();
})


submitButton.addEventListener('click', function(e){
    e.preventDefault();
    chord.innerText = chordsList[rand(chordsList.length)]
    countdown = setInterval(timer, timeSelect.value * 1000)
    this.disabled = true
    timeSelect.disabled = true
}
)

 document.querySelector('#stop').addEventListener('click', function(){
        clearInterval(countdown)
        submitButton.disabled = false
        timeSelect.disabled = false
        chord.innerText = 'Click Start'
    })

addItemForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(addItem.value){
        chordsList.push(addItem.value)
        pickList();
        addItem.value=''
    }
})

listItems.addEventListener('change', function(e){
    if(e.target.checked){
        toDelete.push(e.target.value)
        console.log(toDelete)
    }
    else{
        toDelete = toDelete.filter(item => item != e.target.value)
        console.log(toDelete)
    }
    if(toDelete.length > 0){
        del.disabled = false
    }
    else{
        del.disabled = true
    }
   
})

del.addEventListener('click', function(){
    chordsList = chordsList.filter((item) => !toDelete.includes(item)
    )
    toDelete = []
    pickList();
})

clear.addEventListener('click', function(){
    chordsList = []
    pickList();
})

addMultipleForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(addMultiple.value){
        const temp = addMultiple.value.split(/,|\n/)
        temp.forEach(item => chordsList.push(item))
        pickList();
        addMultiple.value=''
    }
})

close.addEventListener('click', function(){
    document.querySelector('#dropdown').style.height = '0px';
	body.style.overflow = 'initial';
})

edit.addEventListener('click', function(){
    document.querySelector('#dropdown').style.height = '100%';
    body.style.overflow = 'hidden';
})