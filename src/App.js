import Note from './Note.js'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect')
    setLoading(true)
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((Response) => {
      const { data } = Response
      setNotes(data)
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

    axios.post('https://jsonplaceholder.typicode.com/posts', noteToAddToState)

    setNotes(prevNotes => prevNotes.concat(noteToAddToState))
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
