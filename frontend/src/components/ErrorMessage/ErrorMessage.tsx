import React, { ReactNode } from 'react'
import { Alert } from 'react-bootstrap'

type Props = {
  variant?: string
  children: ReactNode
}
const ErrorMessage: React.FC<Props> = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }} className="my-2">
      <strong>{children}</strong>
    </Alert>
  )
}

export default ErrorMessage
