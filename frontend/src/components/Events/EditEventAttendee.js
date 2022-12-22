
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkLoadEvents } from '../../store/event'
import { thunkPutAttendee , thunkLoadAttendees} from '../../store/attendance'
import "../Navigation/Navigation.css"
const EditEventAttendee = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const {eventId, attendeeId} = useParams()
  const [status, setStatus] = useState('')


  const eventsObj = useSelector(state => state.events.allEvents)
  let events

  useEffect(() => {
    dispatch(thunkLoadEvents())
    dispatch(thunkLoadAttendees(eventId))
  }, [dispatch])


  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  if (!eventsObj) {
    return null
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    let event = {
      userId: attendeeId,
      status
    }
    console.log(eventId)
    await dispatch(thunkPutAttendee(eventId, event))
    console.log('out')
    history.push(`/events/${eventId}/attendees`)
  }

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      <h2>Edit Attendee Status</h2>
      <label>
        Name
        <select name="status" id="status" onChange={e => setStatus(e.target.value)} >
          <option value="">--select a status--</option>
          <option value="waitlist">waitlist</option>
          <option value="attending">attending</option>
        </select>
      </label>


      <button
      className='formButton'
        type="submit"
        disabled={status===''}
      >
        Submit
      </button>
    </form>
  );
}

export default EditEventAttendee
