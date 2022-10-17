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
      return <div key={event.id}>
          <div>{'Event: '} {event.name} </div>
          <p>{'Description: '}{event.description} </p>
          <p>{'Time: '} {event.startDate}</p>
        </div>
    })}
  </ul>)
}



export default EventIndex
