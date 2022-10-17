import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'



const HomeIndex = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events)
  let events

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])
  if(eventsObj) {
    events = Object.values(eventsObj)
  }
  return ( <h1>Welcome to Catchup</h1>)
}



export default HomeIndex
