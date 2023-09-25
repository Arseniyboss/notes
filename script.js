const form = document.querySelector('form')
const titleInput = document.querySelector('.title-input')
const noteInput = document.querySelector('.note-input')
const noteList = document.querySelector('.note-list')

const setItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

const getItem = (name) => {
  const savedItem = localStorage.getItem(name)
  return savedItem ? JSON.parse(savedItem) : []
}

const generateNote = ({ title, note, id }) => {
  return `
    <li class="note">
      <div class="note-details">
        ${title && `<h2>${title}</h2>`}
        ${note && `<span>${note}</span>`}
      </div>
      <div class="note-id">${id}</div>
      <button class="delete-button">
        <i class="fa fa-trash trashcan"></i>
      </button>
    </li>
  `
}

const getNotes = () => {
  const savedNotes = getItem('notes')
  const notes = savedNotes.map((note) => generateNote(note)).join('')
  noteList.innerHTML = notes
  return savedNotes
}

let notes = getNotes()

const addNote = (title, note) => {
  notes.push({ id: crypto.randomUUID(), title, note })
  setItem('notes', notes)
  getNotes()
  titleInput.value = ''
  noteInput.value = ''
  titleInput.focus()
}

const deleteNote = (node) => {
  const note = node.parentElement
  note.remove()
  const id = node.previousElementSibling.innerText
  const filteredNotes = notes.filter((note) => note.id !== id)
  notes = filteredNotes
  setItem('notes', notes)
}

const handleClick = (e) => {
  const node = e.target
  if (node.classList.contains('delete-button')) {
    deleteNote(node)
  }
  if (node.classList.contains('trashcan')) {
    deleteNote(node.parentElement)
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
  const title = titleInput.value.trim()
  const note = noteInput.value.trim()
  if (!title && !note) return
  addNote(title, note)
}

noteList.addEventListener('click', handleClick)
form.addEventListener('submit', handleSubmit)
