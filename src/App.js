import Note from './Note.js'
import { useEffect, useState } from 'react'
import { getAllNotes } from './services/notes/getAllNotes.js'
import { createNote } from './services/notes/createNotes.js'


function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect')
    setLoading(true)
    getAllNotes()
      .then(notes => {
        setNotes(notes)
        setLoading(false)
      })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('crear nota')
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }
    
    createNote(noteToAddToState)
      .then(newNote => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })
    
    setNewNote('')
  }

  console.log('render')

  return (
    <div>
      <h1>Notes</h1>
      {loading ? 'cargnado...' : ''}
      <ol className="App">
        {
          notes
          .map(note => <Note key={note.id} title={note.title} body={note.body} />)
        }
      </ol>
      <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type='text' value={newNote}/>
          <button type='submit' >
            Crear Nota
          </button>
      </form>
    </div>
  );
}

export default App;
