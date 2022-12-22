import React from 'react'
import {useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents, thunkLoadOneEvent } from '../../store/event'
import { thunkLoadAttendees, thunkPostAttendee, thunkRemoveAttendee} from '../../store/attendance'
import "../Navigation/Navigation.css"
import "./events.css"

const EventPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { eventId } = useParams()
  let session = useSelector(state => state.session.user)
  const event = useSelector(state => state.events.singleEvent)
  const myEvent = useSelector(state => state?.events?.allEvents)
  const ImageEvent = useSelector(state => state.events.allEvents)
  // const EventImages = useSelector(state => state.EventImages)

  const joinEvent = async () => {
    await dispatch(thunkPostAttendee(eventId, {}))
    history.push('/myevents')
  }

  const leaveEvent = async () => {
    await dispatch(thunkRemoveAttendee(eventId, {memberId: session.id}))
    history.push(`/myevents`)
  }

  useEffect(() => {
    dispatch(thunkLoadOneEvent(eventId))
    dispatch(thunkLoadEvents())
    dispatch(thunkLoadAttendees(eventId))
  }, [dispatch, eventId ])

  if (!event || !ImageEvent) {
    return null
  }


  if (!session) {
    session = {id: "not logged in"}
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
        {console.log("ImageEvent ==>",ImageEvent[eventId])}

        <img className='eventPageImage' src={ImageEvent[eventId].previewImage} alt="myImage"></img>
      {/* <img src={ImageEvent[eventId].previewImage?ImageEvent[parseInt(eventId)].previewImage:EventImages[parseInt(eventId)]} alt="myImage" width={200}></img> */}
        <div className='bubbleBorder'>
            <p>{getFormattedDate(event.startDate)} to {getFormattedDate(event.endDate)}</p>
            <p>{event.type} Event</p>
            {session.id=== event.Group.organizerId && <NavLink to={`/events/${eventId}/attendees`}>Click Here to See Attendees</NavLink>}
            {!myEvent[eventId].Attendees[session.id] && <button className='eventPageButton' onClick={() => joinEvent()}>Join this Event</button>}
            {myEvent[eventId].Attendees[session.id] && <button className='eventPageButton' onClick={() => leaveEvent()}>Leave this Event</button>}

        </div>
      </div>

      <h3>Details</h3>
        <div className='fullsite'>
          <p>{event.description}</p>
          {/* I'll hide these buttons when someone can not edit when I can edit my backend */}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/addImage`}>Create an Image</NavLink>: ""}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/update`}>Edit this Event</NavLink> : ""}
          {session.id===event.Group.organizerId ? <NavLink to={`/events/${eventId}/delete`}>Delete this Event</NavLink> : ""}

        </div>
      <div>
    </div>
    </div>

  </div>)
}



export default EventPage
