import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'



const EventIndex = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events)
  console.log("eventsObj: ",eventsObj)
  let events

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if(eventsObj) {
    events = Object.values(eventsObj)
    console.log("events:", events)
  }
  return (
  <ul>

  
    {events.map(event => {
      console.log("event",event)
      return <h1 key={event.id}>{event.name}</h1>
    })}
  </ul>)
}



export default EventIndex
