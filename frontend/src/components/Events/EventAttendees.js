import React from 'react'
import {useHistory, useParams,} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents} from '../../store/event'
import { thunkLoadAttendees } from '../../store/attendance'
import "../Navigation/Navigation.css"
import { NavLink } from 'react-router-dom'



const EventAttendees= () => {
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const history = useHistory()

  let events
  let attendees

  useEffect(() => {
    dispatch(thunkLoadEvents())
    dispatch(thunkLoadAttendees(eventId))
  }, [dispatch])

  const attendeesObj = useSelector(state=> state.attendees.allAttendees)
  const eventsObj = useSelector(state => state.events.allEvents)

  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  if (!eventsObj) {
    return null
  }
  if (attendeesObj) {
    attendees = Object.values(attendeesObj)
  }
  if (!attendeesObj) {
    return null
  }

  return (
    <div>
      <div className='text'>Event Attendeess</div>
      <div className='attendeeCard'>
        {attendees && attendees.map(attendee => {
          return <div>
            {attendee.firstName} {attendee.lastName} {attendee.Attendances[0].status}
            <NavLink to={`/events/${eventId}/attendees/${attendee.id}/edit`}>Edit</NavLink>
            </div>
        })}
      </div>
    </div>


  );
}

export default EventAttendees
