import React, { useState } from 'react'
import { Nav, Button, Form, FormControl } from 'react-bootstrap'

const FormSearchNavbar = () => {
  var [data, setData] = useState({
    searchKey: '',
  })
  var OnFormChange = (e) =>
    setData((state) => ({ ...state, [e.target.name]: e.target.value }))
  return (
    <div>
      <Nav className="mr-auto container">
        <Form inline className="font-weight-bolder text-white d-flex">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            required
            value={data.searchKey}
            onChange={OnFormChange}
          />
          <Button variant="success">Search</Button>
        </Form>
      </Nav>
    </div>
  )
}

export default FormSearchNavbar
