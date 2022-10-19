import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'
import './events.css'

const EventIndex = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events.allEvents)
  let events

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  if(!events) {
    return null
  }
  return (
    <div className='eventFull'>
      <h2> Today</h2>
      <div className='eventCardFull'>
        {events.map(event => {
          return <div key={event.id} className="contentCard">
            <div>
              <img src={event.previewImage} alt={event.previewImage} width="150"></img>
            </div>
            <div className='cardText'>
              <p>{`Time: ${event.startDate}`}</p>
              <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
              <p>{`${event.Group.name}`} </p>
              <p>{`${event.numAttending} Attendees`}</p>

            </div>

          </div>
        })}
        </div>
  </div>)
}



export default EventIndex
