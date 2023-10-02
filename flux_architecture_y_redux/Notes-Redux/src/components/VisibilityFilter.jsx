import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  return (
    <div>
      All
      <input type='radio' name='filter' onChange={() => dispatch(filterChange('all'))} />
      important
      <input type='radio' name='filter' onChange={() => dispatch(filterChange('important'))} />
      nonImpotant
      <input type='radio' name='filter' onChange={() => dispatch(filterChange('nonImpotant'))} />
    </div >

  )
}

export default VisibilityFilter
