const startBtn = document.querySelector('#start') //СОЗДАНИЕ ПЕРЕМЕННЫХ, ЧТОБЫ РАБОТАТЬ С ЭЛЕМЕНТАМИ
const screens = document.querySelectorAll('.screen')//МАССИВ ДАННЫХ, тк много блоков
const timeList = document.querySelector('#time-list')
const colors = ['BlueViolet', 'Crimson', 'SpringGreen', 'LightSeaGreen', 'DarkOrange', 'Khaki', 'DodgerBlue', 'Beige']
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {// добавляем событие на кнопку
  event.preventDefault()// отмена ивента по умолчанию
  screens[0].classList.add('up')// обращаемся к 1му массиву и добавляем к нему класс 'UP'
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {// задаем условие при клике внутри СПИСКА С КНОПКАМИ
    time = parseInt(event.target.getAttribute('data-time'))// вносим в переменную числовое значение
    screens[1].classList.add('up')// обращаемся к 2му массиву и добавляем к нему класс 'UP'
    startGame()
  }
})

board.addEventListener('click', event => {//добавление события при клике на кружок в доске
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)//в ОСТАЛОСЬ задаем отображаемое время при выборе
}

function decreaseTime() {
  if (time === 0) {
    finishGame()

  } else {
  let current = --time
  if (current < 10) {
    current = `0${current}`
  }
  setTime(current)//в ОСТАЛОСЬ задаем отображаемое время при выборе
  }
}


function setTime(value) {// вынос отдельной функции для таймера
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
  board.innerHTML += '<a href="" class="start">Заново</a>';
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0 , width - size)
  const y = getRandomNumber(0 , height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = getRandomColor()

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return colors [Math.floor(Math.random() * colors.length)]
}