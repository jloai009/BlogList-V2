import React from 'react'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  const style = {
    color: props.errorOcurred ? 'red' : 'green',
    border: 3,
    borderStyle: 'solid',
    borderColor: props.errorOcurred ? 'red' : 'green',
    borderRadius: 4,
    backgroundColor: 'silver',
    padding: 9,
    fontSize: 20
  }

  return (
    <div id="notification">
      <p style={style}>
        {props.notification}
      </p>
    </div>
  )
}

export default Notification
