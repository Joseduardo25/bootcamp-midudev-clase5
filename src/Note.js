const Note = ( {content, date} ) => {
  return(
    <li>
      <p>
        {content}
        <br/>
        <small>
          <time>{date}</time>
        </small>
      </p>
    </li>
  )
}


export default Note