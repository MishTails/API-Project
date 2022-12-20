import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents, thunkPostEventImage } from '../../store/event'
import "../Navigation/Navigation.css"



const AddEventImage = () => {
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const history = useHistory()
  let events

  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []
    if (image.length === 0) {
      errors.push("Image is required")
    }
    setValidationErrors(errors)
  }, [image])

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])

  const eventsObj = useSelector(state => state.events.allEvents)

  if(eventsObj) {
    events = Object.values(eventsObj)
    console.log(events)
  }
  if (!eventsObj) {
    return null
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    let preview = {
      eventId,
      url: image,
      preview: true
    }
    await dispatch(thunkPostEventImage(preview))

    history.push(`/events/${eventId}`)
  }

  return (
    <form className="form"
      onSubmit={submitHandler}
    >
      <h2>Add an Image</h2>
      <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Image
        <input
          type="text"
          name="image"
          onChange={(e) => setImage(e.target.value)}
          value={image}
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

export default AddEventImage
