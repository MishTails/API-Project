
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkPutGroup, thunkLoadGroups } from '../../store/group'
import "../Navigation/Navigation.css"
const GroupUpdate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const {groupId} = useParams()
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [type, setType] = useState('In Person')
  const [priv, setPriv] = useState('Private')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  const groupsObj = useSelector(state => state.groups.allGroups)
  let groups

  useEffect(() => {
    const errors = []
    if (name.length === 0) {
      errors.push("Name is required")
    }
    if (about.length < 50) {
      errors.push("About must be longer than 50 characters")
    }
    if (city.length === 0) {
      errors.push("City is required")
    }
    if (state.length === 0) {
      errors.push("State is required")
    }
    setValidationErrors(errors)
  }, [name, about, city, state])

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])

  useEffect(() => {
    setName(groupsObj[groupId].name)
    setAbout(groupsObj[groupId].about)
    setType(groupsObj[groupId].type)
    setPriv(groupsObj[groupId].priv)
    setCity(groupsObj[groupId].city)
    setState(groupsObj[groupId].state)
  }, [groupId, groupsObj])

  if(groupsObj) {
    groups = Object.values(groupsObj)
    console.log(groups)
  }
  if (!groupsObj) {
    return null
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    let group = {
      id: groupId,
      organizerId: user.id,
      name,
      about,
      type,
      private: priv === 'Private',
      city,
      state,
    }
    await dispatch(thunkPutGroup(group))
    history.push('/groups')
  }

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      <h2>Update a Group</h2>
      <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        About
        <input
          type="text"
          name="About"
          onChange={(e) => setAbout(e.target.value)}
          value={about}
        />
      </label>
      <label>
        <input
          checked={type === 'In Person'}
          type="radio"
          value="In Person"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        In Person
      </label>
      <label>
        <input
          checked={type === 'Online'}
          type="radio"
          value="Online"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        Online
      </label>
      <label>
        <input
          type="checkbox"
          value="Private"
          name="priv"
          onChange={(e) => setPriv(e.target.value)}
        />
        Would you like to make this Group Private
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </label>
      <label>
        State
        <input
          type="text"
          name="state"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </label>

      <button
      className='formButton'
        type="submit"
        disabled={!!validationErrors.length}
      >
        Submit
      </button>
    </form>
  );
}

export default GroupUpdate
