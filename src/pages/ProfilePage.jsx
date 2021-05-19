import React, {useRef,useState, useEffect} from 'react'
import {Row,Image, Col,Form,Container,Button,Card,Alert}  from 'react-bootstrap/'
import { getUserInfo, UpdateUser } from "../lib/api"
import { useAuth } from '../context/AuthContext'

function ProfilePage() {
  const auth = useAuth()
  const [initialized, SetInitialized] = useState(true)
  const phoneRef = useRef()
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [stylerun, setStylerun] = useState("")
  const addressRef = useRef()
  const [distance, setDistance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState("")
  const [error, setError] = useState("")
useEffect(() => {
    SetInitialized(false)
    getUserInfo(auth.token)
      .then(user => {
        setUser(user)


      });
    SetInitialized(true)

  }, []);


  const handleChange = (val) => {   
    setStylerun(val.target.value)   
    };

async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    
    await UpdateUser(
  firstnameRef.current.value,
  lastnameRef.current.value,
  emailRef.current.value, 
  passwordRef.current.value,
  passwordConfirmRef.current.value,
  phoneRef.current.value,
  stylerun,
  parseInt(distance),
  addressRef.current.value, 
  auth.token)
  
    alert('Profile has been updated successfully');
  }


       if (initialized && user) {
    return (
      <>
        <Container>
          <Card >
            <Card.Body >
    <div className="text-center mb-4"><Image className="ml-4" src={user.picture} roundedCircle fluid/></div>
              <h2 className="text-center mb-4"> Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  {user && <Form.Control
                    type="email"
                    ref={emailRef}
                    defaultValue={user.email}
                    required
                  />}
                </Form.Group>
                <Form.Group id="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={firstnameRef}
                    defaultValue={user.first_name}

                  />
                </Form.Group>
                <Form.Group id="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={lastnameRef}
                    defaultValue={user.last_name}

                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"

                    ref={passwordConfirmRef} />
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    format="+972 ###-####"
                    mask="_"
                    ref={phoneRef}
                    defaultValue={user.telephone}
                  />
                </Form.Group>
              
 <Form.Group id="runningpref">
              <Form.Label>Running preferences:</Form.Label>
            </Form.Group>
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
     
    <Form.Label as="legend" column >Distance</Form.Label>
<Form.Group as={Col}  controlId="formBasicRange">
<Form.Control 
value={distance}/>

    <Form.Control 
    min={1}
    max={44}
    value={distance}
    onChange={e => setDistance(e.target.value)}
    type="range" /> 
    
  </Form.Group>
    
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control
    defaultValue={user.sports[0].running.location}
    ref={addressRef} placeholder="1234 Main St" />
  </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Update
            </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </>
    )
  } else { return (<><div>"Loading"</div>  </>) }
    
}

export default ProfilePage