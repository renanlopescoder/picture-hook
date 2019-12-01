import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

export default class App extends Component {
    state = {
        photos: [],
        likes: 0,
    };

    componentDidMount() {
        fetch("https://picsum.photos/v2/list")
            .then(response => response.json())
            .then(data => this.setState({ photos: data }))
            .catch(error => console.log(error));
    }

    componentDidUpdate(prevProps, prevState) {
        const photosLiked = this.state.photos.filter(photo => photo.like);
        if (prevState.likes !== photosLiked.length) {
            this.setState({ likes: photosLiked.length });
        }
    }

    handleLike(id) {
        const newPhotos = this.state.photos.map(photo => {
            return photo.id === id
                ? { ...photo, like: !photo.like }
                : { ...photo };
        });
        this.setState({ photos: newPhotos });
    }

    render() {
        return (
            <Container>
                <Alert variant="primary">
                    You have {this.state.likes} likes
                </Alert>
                <Row className="mt-3">
                    {this.state.photos.map(photo => (
                        <Col md={4} key={photo.id} className="mb-3">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={photo.download_url}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {photo.author}{" "}
                                        {photo.like && (
                                            <Badge pill variant="info">
                                                Liked
                                            </Badge>
                                        )}
                                    </Card.Title>
                                    <Card.Text>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() =>
                                                this.handleLike(photo.id)
                                            }
                                        >
                                            {photo.like ? "Deslike" : "Like"}
                                        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}
