const form = document.querySelector('form')
const input = document.querySelector('input')
const noteList = document.querySelector('.note-list')

const setItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

const getItem = (name) => {
  const savedItem = localStorage.getItem(name)
  return savedItem ? JSON.parse(savedItem) : []
}
