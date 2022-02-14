import React from 'react'
import { useSelector } from 'react-redux'

const Notification = (props) => {

  const { text, isError } = useSelector(state => state.notification)

  if (text === "") {
    return null
  }

  const style = {
    color: isError ? 'red' : 'green',
    border: 3,
    borderStyle: 'solid',
    borderColor: isError ? 'red' : 'green',
    borderRadius: 4,
    backgroundColor: 'silver',
    padding: 9,
    fontSize: 20
  }

  return (
    <div id="notification">
      <p style={style}>
        {text}
      </p>
    </div>
  )
}

export default Notification
