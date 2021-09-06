import Note from './Note.js'
import { useEffect, useState } from 'react'


function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect')
    setTimeout(() => {
      console.log('ahora')
      setLoading(true)
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((json) => {
          console.log('seteando las notas de la aplicacion')
          setNotes(json)
          setLoading(false)
        })
    }, 2000)
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote
    }
    setNotes(prevNotes => prevNotes.concat(noteToAddToState))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
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
