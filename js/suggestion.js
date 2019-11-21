const target = document.getElementById('target')
const scoreLavel = document.getElementById('score')
const missLabel = document.getElementById('miss')
const timerLabel = document.getElementById('timer')

const TIME_LIMIT = 5 * 1000
const REFRESH_RATE = 60
let interval
let state

const start = () => {
  resetState()
  updateStatsTexts()
  state.isPlaying = true
  interval = window.setInterval(() => {
    countDown()
  }, REFRESH_RATE)
}

const stop = () => {
  clearInterval(interval)
  showResult()
  resetState()
  updateRemainingTimeText()
  updateStatsTexts()
  target.innerText = 'click to start'
}

target.addEventListener('click', () => {
  if (state && state.isPlaying) return
  start()
})

window.addEventListener('keydown', e => {
  if (!state || !state.isPlaying) return
  typeWord(e.key)
  updateStatsTexts()
})

/////////////////////////////////////////////////////////////////////

const getRandomWord = () => {
  const words = ['red', 'blue', 'gray', 'gold', 'silver']
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

const getNewWord = () => {
  state.word = getRandomWord()
  state.wordPosition = 0
}

const resetState = () =>
  (state = {
    isPlaying: false,
    score: 0,
    missed: 0,
    remainingTime: TIME_LIMIT,
    word: getRandomWord(),
    wordPosition: 0,
  })

const updateRemainingTimeText = () =>
  (timerLabel.innerText = (state.remainingTime / 1000).toFixed(2))

const countDown = () => {
  state.remainingTime = state.remainingTime - REFRESH_RATE
  updateRemainingTimeText()
  if (state.remainingTime < 0) stop()
}

const typeWord = char => {
  const isCorrect = char === state.word[state.wordPosition]
  const isLastWord = state.word[state.wordPosition] === state.word[state.word.length - 1]

  if (isCorrect) {
    state.score++
    if (isLastWord) return getNewWord()
    return state.wordPosition++
  }
  state.missed++
}

const updateStatsTexts = () => {
  target.innerText = state.word
    .split('')
    .map((char, i) => (i < state.wordPosition ? '_' : char))
    .join('')
  scoreLavel.innerText = state.score
  missLabel.innerText = state.missed
}

const showResult = () => {
  const totalTyped = state.score + state.missed
  const accuracy = ((state.score / totalTyped) * 100).toFixed(2)

  alert(`
  ${state.score} letters, 
  ${state.missed} miss,
  ${totalTyped ? accuracy : 0}% accuracy`)
}
