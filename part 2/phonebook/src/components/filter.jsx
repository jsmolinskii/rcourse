const Persons = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}

export default Persons
