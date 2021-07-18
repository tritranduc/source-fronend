import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { Spinner } from 'react-bootstrap'
import ShowPost from '../components/layout/ShowPost'
import { Container, Row, Col } from 'react-bootstrap'
import ModelCreateNewPost from '../components/layout/CreateNewPost'
import AlertMessage from '../components/layout/alertMessage'
import { useDispatch } from 'react-redux'
import { hideError } from '../reducers/PostReducer'
import { getAllPost } from "../reducers/PostReducer"

const Dashboard = () => {
  var { postState } = useContext(PostContext)
  var [showModel, setShowModel] = React.useState(false)
  var dispatch = useDispatch()
  var post = postState.posts
  useEffect(() => dispatch(getAllPost()), [dispatch])
  if (postState.postLoading)
    return (
      <div class="spinner-container">
        <Spinner animation="border" role="primary"></Spinner>
      </div>
    )
  else if (!postState.success) {
    setTimeout(() => {
      dispatch(hideError())
    }, 10000)
    return <AlertMessage info={postState} />
  } else
    return (
      <div>
        <Container>
          <Row xs="1">
            {post.map((item) => (
              <Col key={item._id}>
                <ShowPost {...item} />
                <br />
              </Col>
            ))}
          </Row>
          <div class="btn-group-fab" role="group" aria-label="FAB Menu">
            <div>
              <button
                type="button"
                class="btn btn-main btn-primary has-tooltip"
                data-placement="left"
                title="Menu"
                onClick={() => setShowModel(true)}
              >
                {' '}
                <i class="bi bi-plus"></i>{' '}
              </button>
            </div>
          </div>
          <ModelCreateNewPost
            show={showModel}
            onHide={() => setShowModel(false)}
          ></ModelCreateNewPost>
        </Container>
      </div>
    )
}

export default Dashboard
// 0906338191
