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

const generateNote = (note) => {
  return `
    <article class="note">
      <span class="note-name">${note.name}</span>
      <div class="note-id">${note.id}</div>
      <button class="delete-button">
        <i class="fa fa-trash trashcan"></i>
      </button>
    </article>
  `
}

const getNotes = () => {
  const savedNotes = getItem('notes')
  const notes = savedNotes.map((note) => generateNote(note)).join('')
  noteList.innerHTML = notes
  return savedNotes
}

let notes = getNotes()

const addNote = (value) => {
  notes.push({ id: crypto.randomUUID(), name: value.trim() })
  setItem('notes', notes)
  getNotes()
  input.value = ''
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const { value } = input
  if (!value) return
  addNote(value)
})
