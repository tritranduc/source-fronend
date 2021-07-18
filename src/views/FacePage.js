import React from "react";
import { Card, Row, Col, Spinner, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ShowPost from "../components/layout/ShowPost";
import { getUser } from "./../reducers/AppReduces";
import AlertMessage from "./../components/layout/alertMessage";
import { hideErrorApp } from "./../reducers/AppReduces";

const FacePage = () => {
  const dispatch = useDispatch();
  var appState = useSelector((state) => state.app);
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  var post = appState.userInfo.posts;
  console.log(appState.userInfo);
  if (appState.userInfo.loading)
    return (
      <div class="spinner-container">
        <Spinner animation="border" role="primary"></Spinner>
      </div>
    );
  else if (!appState.userInfo.success) {
    setTimeout(() => {
      dispatch(hideErrorApp());
    }, 10000);
    return <AlertMessage info={appState.userInfo} />;
  } else
    return (
      <Container>
        <div>
          <Card style={{ width: "18rem" }} className="text-center">
            <Card.Body>
              <Card.Title>{appState.userInfo.user.username}</Card.Title>
              <Card.Text>
                <p>{appState.userInfo.user.email}</p>
                <p>{`0${appState.userInfo.user.phone}`}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Row xs="1">
            {post.map((item) => (
              <Col key={item._id}>
                <ShowPost {...item} />
                <br />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
};

export default FacePage;
