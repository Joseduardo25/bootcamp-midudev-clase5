import Note from './Note.js'
import { useState } from 'react'


function App(props) {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    setNotes(prevNotes => prevNotes.concat(noteToAddToState))
    setNewNote('')
  }
  
  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? 'Show all important' : 'Show all'}</button>
      <ol className="App">
        {
          notes
          .filter((note) => {
            if (showAll === true)
            return true
            return note.important === true
          })
          .map(note => <Note key={note.id} content={note.content} date={note.date} />)
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
