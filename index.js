let state = 0
let matches = 0
let movements = 0
let remainingTime = 30
let timer = false
let interval = null
let matchesEl = document.getElementById('matches')
let movementsEl = document.getElementById('movements')
let timeEl = document.getElementById('r-time')

let images = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
images = images.sort(() => { return (Math.random() - 0.5) })

let winAudio = new Audio('sounds/win.wav')
let loseAudio = new Audio('sounds/lose.wav')
let rightAudio = new Audio('sounds/right.wav')
let wrongAudio = new Audio('sounds/wrong.wav')
wrongAudio.volume = 0.5

function show(card) {
    if (timer === false)
        countTime()
    let selectedButton = document.getElementById(card)
    selectedButton.innerHTML = `<img src="images/${images[card]}.png">`
    selectedButton.disabled = true

    if (state === 0) {
        card1 = card
        state++
    } else {
        card2 = card
        state = 0
        addMovement()
        if (images[card1] === images[card2])
            rightMatch()
        else 
            wrongMatch()
    }
}

function countTime() {
    timer = true
    interval = setInterval(() => {
        remainingTime--
        timeEl.innerText = `Remaining time: ${remainingTime} seconds`
        if (remainingTime === 0) {
            clearInterval(interval)
            loser()
        }
    }, 1000)
}

function addMovement() {
    movements++
    movementsEl.innerText = `Movements: ${movements}`
}

function rightMatch() {
    matches++
    matchesEl.innerText = `Matches: ${matches}`
    if (matches===8)
        winner()
    else 
        rightAudio.play()
}

function wrongMatch() {
    wrongAudio.play()
    setTimeout(function () {
        Button1 = document.getElementById(card1)
        Button2 = document.getElementById(card2)
        Button1.innerHTML = Button2.innerHTML = ""
        Button1.disabled = Button2.disabled = false
    }, 400)
}

function winner() {
    winAudio.play()
    clearInterval(interval)
    matchesEl.innerHTML += `<br>You Won!🎉🥳`
    timeEl.innerHTML = `Great! you made it in ${30 - remainingTime} seconds😎`
    if (movements<10)
        movementsEl.innerText += `😎 you are THE BEST`
    else if (movements < 20)
        movementsEl.innerText += `😊`
    else if (movements < 30)
        movementsEl.innerText += `🙂`
    else 
        movementsEl.innerText += `😥` 
}

function loser() {
    loseAudio.play()
    for (let i = 0; i < images.length; i++){
        let button = document.getElementById(i)
        button.innerHTML = `<img src="images/${images[i]}.png">`
        button.disabled = true 
    }
    matchesEl.innerHTML += `<br>Game Over😭`
    movementsEl.innerText += `😥`
    timeEl.innerText = `Time's Up! `
}