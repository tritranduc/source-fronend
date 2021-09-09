import React, { useContext, useState } from 'react'
import {
  Form,
  Button,
  ButtonToggle,
  FormGroup,
  InputGroup,
  Input,
  Label,
} from 'reactstrap'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/alertMessage'

const LoginForm = () => {
  var { stateAuth, loginUser } = useContext(AuthContext)

  var [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  var onChangeForm = (event) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }
  var [alert, setAlert] = useState(null)
  var onsubmit = async (event) => {
    try {
      event.preventDefault()
      var dataServer = await loginUser(formData)
      if (!dataServer.success) {
        setAlert({ type: stateAuth.type, message: dataServer.message })
        setTimeout(() => {
          setAlert(null)
        }, 10000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="center">
      <AlertMessage info={alert} />
      <Form className="my-4" onSubmit={onsubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <InputGroup>
            <Input
              placeholder="username"
              id="email"
              name="username"
              required
              type="email"
              value={formData.username}
              onChange={onChangeForm}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            id="Password"
            placeholder="password"
            value={formData.password}
            onChange={onChangeForm}
            required
          />
        </FormGroup>
        <br />
        <Button color="success">login</Button>
      </Form>
      <p>
        if you don have the account
        <Link to="/register">
          <ButtonToggle color="primary">register</ButtonToggle>
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
