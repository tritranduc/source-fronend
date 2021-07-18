import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import React, { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UpdatePostError, UpdatePostSuccess } from '../../reducers/PostReducer'
import axios from 'axios'
import { ServerHost } from '../../constion'
import AlertMessage from './alertMessage'
import { PostContext } from './../../contexts/PostContext'
export default function ModelEditPost(props) {
  var { postState } = useContext(PostContext)

  var [formData, setFormData] = useState({
    ...postState.postEdit,
    DeleteImageUrl: [],
    imageShow: [...postState.postEdit.attachment],
  })
  console.log(formData)
  useEffect(
    () =>
      setFormData({
        ...postState.postEdit,
        DeleteImageUrl: [],
        imageShow: [...postState.postEdit.attachment],
      }),
    [postState.postEdit],
  )
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
    formData.attachment.map((dataTemp) => {
      data.append('PhotoUrl', dataTemp)
      return data
    })
    formData.DeleteImageUrl.map((item) => {
      data.append('DeleteImageUrl', item)
      return item
    })
    data.append('id', formData._id)
    data.append('likeCount', formData.likeCount)
    for (let index = 0; index < image.length; index++) {
      data.append('attachment', image[index])
    }

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
      var response = await axios.post(
        `${ServerHost}/post/update`,
        data,
        options,
      )
      dispatch(UpdatePostSuccess(response.data.post))
      console.log(response.data.post)
      setTimeout(() => {
        seValueProgress(0)
      }, 1000)
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(UpdatePostError(error.response.data))
        return error.response.data
      } else {
        dispatch(UpdatePostError({ success: false, message: error.message }))
        return { success: false, message: error.message }
      }
    }
    setImage([])
    props.onHide()
  }
  var onAddImageDelete = (imageUrl) => {
    setFormData((state) => ({
      ...state,
      DeleteImageUrl: [...state.DeleteImageUrl, imageUrl],
      imageShow: state.imageShow.filter((url) => url !== imageUrl),
    }))
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
            <p>if you want to use this image you don chose the file</p>
            {formData.imageShow.length >= 1 && formData.imageShow[0] !== '' && (
              <div className="text-center">
                ========================================================
                <Row xs="4">
                  {formData &&
                  formData.imageShow.length >= 1 &&
                  formData.imageShow[0] !== ''
                    ? formData.imageShow.map((image) => (
                        <Col>
                          <Button onClick={() => onAddImageDelete(image)}>
                            <img
                              key={image}
                              src={`${ServerHost}${image}`}
                              alt="hi"
                              className="img-fluid"
                            />
                            x
                          </Button>
                        </Col>
                      ))
                    : null}
                </Row>
                ========================================================
              </div>
            )}
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
            update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
