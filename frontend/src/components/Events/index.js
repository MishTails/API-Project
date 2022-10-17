import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'

const EventIndex = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events)
  let events

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  return (
  <ul>
    {events.map(event => {
      return <div key={event.id}>
          <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
          <p>{'Description: '}{event.description} </p>
          <p>{'Time: '} {event.startDate}</p>
        </div>
    })}
  </ul>)
}



export default EventIndex
