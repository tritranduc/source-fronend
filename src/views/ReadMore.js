import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { PostContext } from '../contexts/PostContext'

import { Button, Col, Row } from 'react-bootstrap'
import { ServerHost } from './../constion'
import likeIcon from '../assets/thumb-up.png'

const ReadMore = () => {
  var { postState, addLike } = useContext(PostContext)
  var onClickLikeButton = (postId) => {
    addLike(postId)
  }
  var body
  if (!postState.PostReading) return <Redirect to="dashboard" />
  else
    body = (
      <div className="container">
        <div className="text-center">
          <br />
          <h1>{postState.PostReading.title}</h1>
        </div>
        <p>{postState.PostReading.content}</p>
        <div className="float-right">
          <br />
          <span>{postState.PostReading.likeCount}</span>
          <Button
            variant="light"
            onClick={() => onClickLikeButton(postState.PostReading._id)}
          >
            <img src={likeIcon} alt="likeIcon" width={30} />
          </Button>
        </div>
        <div className="text-center">
          ========================================================
          <Row xs="4">
            {postState.PostReading.attachment.length >= 1 &&
            postState.PostReading.attachment[0] !== ''
              ? postState.PostReading.attachment.map((image) => (
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
      </div>
    )
  return (
    <div>
      {body}
      <br />
    </div>
  )
}

export default ReadMore
