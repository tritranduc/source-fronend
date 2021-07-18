import { Modal, Button, Form } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { addPostError, addPostSuccess } from '../../reducers/PostReducer'
import axios from 'axios'
import { ServerHost } from '../../constion'
import AlertMessage from './alertMessage'
import { PostContext } from './../../contexts/PostContext'
function ModelCreateNewPost(props) {
  var [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  var { postState } = useContext(PostContext)
  var [image, setImage] = useState([])
  var dispatch = useDispatch()
  // attachment
  var [valueProgress, seValueProgress] = useState(0)
  var onchange = (e) =>
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
  const onFileChange = async ({ target: { files } }) => {
    await setImage(files)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append('title', formData.title)
    data.append('content', formData.content)
    for (let index = 0; index < image.length; index++) {
      data.append('attachment', image[index])
    }

    console.log(data)
    seValueProgress(0)
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        seValueProgress(percent)
      },
    }
    try {
      var response = await axios.post(`${ServerHost}/post/add`, data, options)
      dispatch(addPostSuccess(response.data))
      console.log(response)
      setTimeout(() => {
        seValueProgress(0)
      }, 1000)
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(addPostError(error.response.data))
        return error.response.data
      } else {
        dispatch(addPostError({ success: false, message: error.message }))
        return { success: false, message: error.message }
      }
    }
    setImage([])
    setFormData({
      title: '',
      content: '',
    })
    props.onHide()
  }
  return (
    <Modal show={true} {...props}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <AlertMessage info={postState} />
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={formData.title}
              onChange={onchange}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="content"
              name="content"
              value={formData.content}
              onChange={onchange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <h4>add photo to use</h4>
            <Form.File multiple={true} onChange={onFileChange} />
            <progress
              class="progress is-primary"
              value={valueProgress}
              max="100"
            >
              {valueProgress}%
            </progress>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ModelCreateNewPost
