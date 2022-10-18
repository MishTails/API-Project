
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkRemoveEvent, thunkLoadEvents, thunkLoadOneEvent } from '../../store/event'

const EventDelete = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const eventsObj = useSelector(state => state.events.allEvents)
  const {eventId} = useParams()


  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if (!eventsObj) {
    return null
  }
  const deleteEvent = () => {

    dispatch(thunkRemoveEvent(eventId))
    history.push(`/events`)
  }
  const goBack = () => {
    console.log('hi')
    dispatch(thunkLoadOneEvent(eventId))
    history.push(`/events/${eventId}`)
  }

  return (
    <div>
      <h2>Are you sure you want to Delete this Event?</h2>
      <button
        onClick={deleteEvent}
        type="submit"
      >
        Yes
      </button>

      <button
        onClick={goBack}
        type="submit"
      >
        No
      </button>
    </div>
  );
}

export default EventDelete
