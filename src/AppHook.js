import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

export default function App() {
    const [photos, setPhotos] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list")
            .then(response => response.json())
            .then(data => setPhotos(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const photosLiked = photos.filter(photo => photo.like);
        setLikes(photosLiked.length);
    }, [photos]);

    function handleLike(id) {
        const newPhotos = photos.map(photo => {
            return photo.id === id
                ? { ...photo, like: !photo.like }
                : { ...photo };
        });
        setPhotos(newPhotos);
    }

    return (
        <Container>
            <Alert variant="primary">You have {likes} likes</Alert>
            <Row className="mt-3">
                {photos.map(photo => (
                    <Col md={4} key={photo.id} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src={photo.download_url} />
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
                                        onClick={() => handleLike(photo.id)}
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
