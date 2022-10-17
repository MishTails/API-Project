import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'



const EventIndex = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state)
  console.log("eventsObj: ",eventsObj)
  let events
  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  return (<div>hi</div>)
}



export default EventIndex
