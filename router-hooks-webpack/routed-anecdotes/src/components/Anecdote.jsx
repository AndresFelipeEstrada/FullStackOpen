const Anecdote = ({ anecdote }) => {
  return (
        <>
            <div key={anecdote.id}>
                <h2>{anecdote.content} by {anecdote.author}</h2>
                <p>has {anecdote.votes} votes</p>
                <span>for more info see <a href={anecdote.info}>{anecdote.info}</a></span>
            </div>
        </>
  )
}
export default Anecdote
// {
//     content: 'If it hurts, do it more often',
//     author: 'Jez Humble',
//     info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
//     votes: 0,
//     id: 1
//   },
