import React, { useState, useContext } from 'react'
import { Form, FormGroup, Label, Input, InputGroup, Button } from 'reactstrap'

import { Link } from 'react-router-dom'
import { ButtonToggle } from 'reactstrap'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/alertMessage'

const RegisterForm = () => {
  var { stateAuth, registerUser } = useContext(AuthContext)
  var [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    confirmPassword: '',
  })
  var onChangeForm = (event) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }
  const [alert, setAlert] = useState(null)
  var { password, confirmPassword } = formData

  var onsubmit = async (event) => {
    try {
      event.preventDefault()
      if (password !== confirmPassword) {
        setAlert({ type: stateAuth.type, message: 'Passwords do not match' })
        setTimeout(() => setAlert(null), 10000)
        return
      }
      var dataServer = await registerUser(formData)
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
              placeholder="email"
              id="email"
              name="email"
              required
              type="email"
              value={formData.email}
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
            placeholder="password placeholder"
            value={formData.password}
            onChange={onChangeForm}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="username">confirmPassword</Label>
          <InputGroup>
            <Input
              placeholder="confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              required
              type="password"
              value={formData.confirmPassword}
              onChange={onChangeForm}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <InputGroup>
            <Input
              placeholder="phone"
              id="phone"
              name="phone"
              required
              type="tel"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={onChangeForm}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="username">username</Label>
          <Label for="username">&nbsp;you can use the email</Label>
          <InputGroup>
            <Input
              placeholder="username"
              id="username"
              name="username"
              required
              type="text"
              value={formData.username}
              onChange={onChangeForm}
            />
          </InputGroup>
        </FormGroup>
        <br />
        <Button color="success">Register </Button>
      </Form>
      <p>
        if you have the account
        <Link to="/login">
          <ButtonToggle color="primary">login</ButtonToggle>
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
