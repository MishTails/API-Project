
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkPutEvent, thunkLoadEvents } from '../../store/event'
import "../Navigation/Navigation.css"

const EventUpdate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const eventsObj = useSelector(state => state.events.allEvents)
  const {eventId} = useParams()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('In Person')
  const [capacity, setCapacity] = useState(10)
  const [price, setPrice] = useState(0)
  const [validationErrors, setValidationErrors] = useState([])
  let events
  useEffect(() => {
    const errors = []
    if (name.length < 5) {
      errors.push("Name must be 5 characters or more")
    }
    if (startDate.length === 0) {
      errors.push("Start Date is required")
    }
    if (endDate.length === 0) {
      errors.push("End Date is required")
    }
    if (description.length < 20) {
      errors.push("Description must be longer than 20 characters")
    }
    if (capacity.length === 0) {
      errors.push("Capacity is required")
    }
    if (price.length === 0) {
      errors.push("Price is required")
    }


    setValidationErrors(errors)
  }, [name, startDate, endDate, description,capacity,price])

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])

  useEffect(() => {
    setName(eventsObj[eventId].name)
    setStartDate(eventsObj[eventId].startDate)
    setEndDate(eventsObj[eventId].endDate)
    setDescription(eventsObj[eventId].description)
    setType(eventsObj[eventId].type)
    setCapacity(eventsObj[eventId].capacity)
    setPrice(eventsObj[eventId].price)
  }, [])

  if (!eventsObj) {
    return null
  }

  const submitHandler = (e) => {
    e.preventDefault()
    events= Object.values(eventsObj)
    let event = {
      id: eventId,
      venueId: 2,
      // need to come back and fix this hardcode
      groupId: 1,
      name,
      description,
      type,
      capacity,
      price,
      startDate,
      endDate
    }
    dispatch(thunkPutEvent(event))
    history.push('/events')
  }


  return (
    <form
    className='form'
      onSubmit={submitHandler}
    >
      <h2>Update an Event</h2>
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
        Start Date
        <input
          type="text"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>
      <label>
        End Date
        <input
          type="text"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
        Capacity
        <input
          type="number"
          name="capacity"
          onChange={(e) => setCapacity(e.target.value)}
          value={capacity}
        />
      </label>
      <label>
        Price
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
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

export default EventUpdate
