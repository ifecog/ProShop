import React from 'react'
import { Alert } from 'react-bootstrap'

function Message() {
  return (
    <>
      {'danger'.map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </>
  )
}

export default Message
