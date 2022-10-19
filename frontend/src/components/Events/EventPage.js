import React from 'react'
import {useParams, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadOneEvent } from '../../store/event'





const EventPage = () => {
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const event = useSelector(state => state.events.singleEvent)

  useEffect(() => {
    dispatch(thunkLoadOneEvent(eventId))
  }, [dispatch, eventId])

  if (!event) {
    return null
  }


  //need to replace "hi" with a placeholder image
  if (!event.EventImages[1]) {
    event.EventImages[1] = {url: 'hi'}
  }

  return (
  <div>
    <h1>{event.name}</h1>
    <NavLink to={`/events/${eventId}/update`}>Edit this Event</NavLink>
    <NavLink to={`/events/${eventId}/delete`}>Delete this Event</NavLink>
    <div className='eventCardFull'>
      <img src = {event.EventImages[1].url} alt="pokeball"></img>

    <div>
      <h2>Details</h2>
      <p>{event.description}</p>
    </div>
    <div>
      <div>
        <h2>Meeting Time</h2>
        <p>{event.startDate}</p>
      </div>
      {event.type === 'Online' ? <h2>online</h2>: <h2>inperson</h2>}
    </div>
    </div>
  </div>)
}



export default EventPage
