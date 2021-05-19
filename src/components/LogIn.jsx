import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import {login} from "../lib/api"
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const auth = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (emailRef.current.value && passwordRef.current.value) {
      try {
        setError('')
        const { token }= await login(emailRef.current.value,passwordRef.current.value)
        await auth.saveToken(token)
        if (token){
        window.location.reload();}
        setLoading(true)
          
      } catch (err) {
        
        setError(err.response.data)
      }
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ?
        
      </div>

    </>
  )
}


