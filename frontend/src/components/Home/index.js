import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'
import "./index.css"


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
  return (
    <div className='fullsite'>
    <link href="./index.css" rel="stylesheet"/>
    <h1>Welcome to Catchup</h1>
    </div>

  )
}



export default HomeIndex
