import React from 'react'
import {useParams} from 'react-router-dom'
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

  return (
  <div>
    <h1>{event.name}</h1>
    <div>
      <img src = {event.EventImages[1].url} alt="pokeball"></img>
    </div>
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
  </div>)
}



export default EventPage
