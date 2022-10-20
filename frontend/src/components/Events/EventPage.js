import React from 'react'
import {useParams, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents, thunkLoadOneEvent } from '../../store/event'
import "../Navigation/Navigation.css"
import "./events.css"



const EventPage = () => {
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const event = useSelector(state => state.events.singleEvent)
  const allEvents = useSelector(state => state.events.allEvents)
  useEffect(() => {
    dispatch(thunkLoadOneEvent(eventId))
    dispatch(thunkLoadEvents())

  }, [dispatch, eventId])

  if (!event) {
    return null
  }


  //need to replace "hi" with a placeholder image
  if (!event.EventImages[1]) {
    event.EventImages[1] = {url: 'hi'}
  }

  function getFormattedDate(date) {
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8, 10)
      return month + '-' + day + '-' + year
  }

  return (
  <div>
    <h1 className='eventTitle'>{event.name}</h1>
    <h3>Hosted by {event.Group.name}</h3>
    <div className='eventCardFull'>
      <div className='eventInfo'>
       <img src = {event.EventImages[1].url} alt="pokeball" width={200}></img>
        <div className='bubbleBorder'>
            <p>{getFormattedDate(event.startDate)} to {getFormattedDate(event.endDate)}</p>
            <p>{event.type} Event</p>
        </div>
      </div>

      <h3>Details</h3>
        <div className='fullsite'>
          <p>{event.description}</p>
          {/* I'll hide these buttons when someone can not edit when I can edit my backend */}
          <NavLink to={`/events/${eventId}/update`}>Edit this Event</NavLink>
          <NavLink to={`/events/${eventId}/delete`}>Delete this Event</NavLink>
        </div>
      <div>
    </div>
    </div>

  </div>)
}



export default EventPage
