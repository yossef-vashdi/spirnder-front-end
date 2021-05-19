import React, { useRef, useState } from "react"
import {Col,Row,Form, Button, Card, Alert } from "react-bootstrap"
import {signup} from "../lib/api"
import { useAuth } from '../context/AuthContext'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const phoneRef = useRef()
  const firstnameRef = useRef()
  const [stylerun, setStylerun] = useState("")
  const lastnameRef = useRef()
  const addressRef = useRef()
  const [file, setFiles] = useState(null)
  const pictureUrl = useRef()


  const formData = new FormData()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [distance, setDistance] = useState(0)
 
  const handleChange = (val) => {
   console.log(val.target.value)
    setStylerun(val.target.value)   
    };


  async function handleSubmit(e) {
  e.preventDefault()
  formData.append('profile_picture', file)
  console.log(
  "email",emailRef.current.value,
  "firstname", firstnameRef.current.value,
  "lastname", lastnameRef.current.value,
  "phone", phoneRef.current.value,
  "password", passwordRef.current.value,
  "password confirm", passwordConfirmRef.current.value,
  "stylerun", stylerun,
  "distance", distance,
  "address", addressRef.current.value
  )


if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError('')
      const response1 = await signup(
  firstnameRef.current.value,
  lastnameRef.current.value,
  emailRef.current.value, 
  passwordRef.current.value,
  passwordConfirmRef.current.value,
  phoneRef.current.value,
  stylerun,
  parseInt(distance),
  addressRef.current.value
  )
  
  if (response1 && file){
      const response = await fetch(`http://0.0.0.0:4000/SignUp/picture_url`,
        {
          method: 'PUT',
          body: formData,
          headers:new Headers({'Authorization': response1.token}) 
        })
        
          const data = await response.json()
          console.log(data)
          alert('Account has been created successfully with picture');

        window.location.reload()}
else { 
  alert('Account has been created successfully');
  window.location.reload() }
  
      
    setLoading(true)
    } catch (err) {
      setError(err.response.data)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
        
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
             <Form.Group id="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstnameRef} required />
            </Form.Group>
            <Form.Group id="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastnameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control format="+972 ###-####" mask="_" ref={phoneRef} required />
            </Form.Group>
           
            <Form.Group id="runningpref">
              <Form.Label>Running preferences:</Form.Label>
            </Form.Group>
            <fieldset>
    <Form.Group  as={Row}  >
      <Form.Label as="legend" column sm={5}> Style of running </Form.Label>
      <Col sm={10}>
        
        <Form.Check
          onChange={handleChange}
          value="Slow"
          type="radio"
          label="Slow"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
        onChange={handleChange}
        value="Normal"
          type="radio"
          label="Normal"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
        onChange={handleChange}
          value="Fast"
          type="radio"
          label="Fast"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formBasicRange">
    
    <Form.Label as="legend" column sm={3}>Distance</Form.Label>
    <Col>
    <Form.Control 
    
min={1}
max={44}
value={distance}
    onChange={e => setDistance(e.target.value)}
    type="range" />
    </Col>
    <Col xs="3">
          <Form.Control value={distance}/>
        </Col>
  </Form.Group>
  </fieldset>            
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control ref={addressRef} placeholder="1234 Main St" />
  </Form.Group>
     <Form.Group>
              <Form.File id="exampleFormControlFile1" onChange={() => setFiles(pictureUrl.current.files[0])} ref={pictureUrl} label="Example file input" />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>

          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
      </div>
    </>
  )
}

