import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'
import './myevents.css'

const MyEventsIndex = () => {

  const dispatch = useDispatch()
  let session = useSelector(state => state.session.user)
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
  function getFormattedDate(date) {
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8, 10)
      return month + '-' + day + '-' + year
  }

  return (
    <div >
      <h2 className='text'> My Events </h2>
      <div className='eventCardFull'>
        {events.map(event => {
          console.log(session.id, event.Attendees)
          if (event.Attendees[session.id]) {
            return <div key={event.id} className="contentCard">
              <div>
                <NavLink to={`/events/${event.id}`}>
                <img src={event.previewImage} alt={event.previewImage} width="150"></img>
                </NavLink>
              </div>
              <div className='cardText'>
                <p className='timeColor'>{`Time: ${event.startDate ?getFormattedDate(event.startDate): event.startDate}`}</p>
                <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
                <p className="aboutMems">{`${event.Group.name } * ${event.Group.city}, ${event.Group.state}`} </p>
                <div className='attendees'>
                  <p className='aboutMems' >{`${event.numAttending} Attendees,  ${event.capacity - event.numAttending} spots left`}</p>
                  <p className="important">{}</p>
                </div>
              </div>
              <button>Leave Event</button>

            </div>
          }
        })}
        </div>
  </div>)
}

export default MyEventsIndex
