import React, { useContext, useState } from 'react'
import {
  Card,
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap'
import DeletePost from '../layout/DeletePost'
import { useDispatch } from 'react-redux'
import { addPostReading, findPost } from '../../reducers/PostReducer'
import { useHistory } from 'react-router-dom'
import { PostContext } from '../../contexts/PostContext'
import { ServerHost } from './../../constion'
import likeIcon from '../../assets/thumb-up.png'
import { AuthContext } from './../../contexts/authContext'
import { DeletePostReducer } from './../../reducers/PostReducer'
import ModelEditPost from './EditPost'

const ShowPost = (props) => {
  var { content, title, likeCount } = props
  var { addLike, postState } = useContext(PostContext)
  var { stateAuth } = useContext(AuthContext)
  var [deletes, setDelete] = useState(false)
  var [update, setUpdate] = useState(false)
  var history = useHistory()
  const dispatch = useDispatch()

  var addPostRead = (post) => {
    dispatch(addPostReading(post))
    history.push('/readmore')
  }
  var onClickLikeButton = (postId) => {
    addLike(postId)
  }
  var getTimeEdit = (datePostIsUpdate) => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var d = new Date(datePostIsUpdate)
    var day = days[d.getDay()]
    var hr = d.getHours()
    var min = d.getMinutes()
    if (min < 10) {
      min = '0' + min
    }
    var amp = 'am'
    if (hr > 12) {
      hr -= 12
      amp = 'pm'
    }
    var date = d.getDate()
    var month = months[d.getMonth()]
    var year = d.getFullYear()
    var dateFormat =
      day + ' ' + hr + ':' + min + amp + ' ' + date + ' ' + month + ' ' + year
    return dateFormat
  }

  var variant = 'Primary'
  var onDropDownClick = (e) => {
    if (e === '1') {
      console.log('Update Post')
      dispatch(findPost(props))
      setUpdate(true)
    } else {
      console.log('Delete Post')
      setDelete(true)
    }
  }
  var OnDeletePost = (e) => {
    dispatch(DeletePostReducer(props._id))
  }
  return (
    <div>
      <DeletePost
        show={deletes}
        onHide={() => setDelete(false)}
        text="delete"
        onDeletePost={OnDeletePost}
      >
        do you want to delete this post
      </DeletePost>
      {postState.postEdit !== null && (
        <ModelEditPost
          show={update}
          onHide={() => setUpdate(false)}
        ></ModelEditPost>
      )}
      <Card className="text-center">
        {stateAuth.user._id === props.users._id ||
        stateAuth.user._id === props.users ? (
          <Card.Header>
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant={variant.toLowerCase()}
              title={'...'}
              onSelect={onDropDownClick}
              align={'start' | 'end'}
            >
              <Dropdown.Item eventKey="1">Update Post</Dropdown.Item>
              <Dropdown.Item eventKey="2">Delete Post</Dropdown.Item>
            </DropdownButton>
          </Card.Header>
        ) : null}

        <Card.Body>
          <Card.Title>
            <div className="text-center">{title} </div>
          </Card.Title>
          <Card.Text>
            {content.length >= 60 ? (
              <div>
                {content.slice(0, 60)}
                <div class="p-2 bd-highlight">
                  <Button
                    variant="primary"
                    className="right"
                    onClick={() => addPostRead(props)}
                  >
                    see more
                  </Button>
                </div>
              </div>
            ) : (
              content
            )}
          </Card.Text>
          <div class="d-flex bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <Button
                variant="light"
                className="left"
                onClick={() => onClickLikeButton(props._id)}
              >
                <img src={likeIcon} alt={likeIcon} width={32} />
              </Button>
              {likeCount}
            </div>
          </div>
        </Card.Body>

        {props.attachment.length >= 1 && props.attachment[0] !== '' && (
          <div className="text-center">
            ========================================================
            <Row xs="4">
              {props.attachment.length >= 1 && props.attachment[0] !== ''
                ? props.attachment.map((image) => (
                    <Col>
                      <img
                        key={image}
                        src={`${ServerHost}${image}`}
                        alt="hi"
                        className="img-fluid"
                      />
                    </Col>
                  ))
                : null}
            </Row>
            ========================================================
          </div>
        )}
        <Card.Footer className="text-muted text-center">
          edit at {getTimeEdit(props.updatedAt)}
        </Card.Footer>
      </Card>
      <br />
    </div>
  )
}

export default ShowPost
