import React from 'react'
import { useSelector } from 'react-redux'

const Notification = (props) => {
  const { text, isError } = useSelector((state) => state.notification)

  const style = {
    color: isError ? 'red' : 'green',
    border: 2,
    borderStyle: 'solid',
    borderColor: isError ? 'red' : 'green',
    borderRadius: 4,
    backgroundColor: 'silver',
    fontSize: 20,
    margin: 4,
    minHeight: '46px',
    visibility: text ? 'visible' : 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <section id="notification">
      {true ? <p style={style}>{text}</p> : null}
    </section>
  )
}

export default Notification
