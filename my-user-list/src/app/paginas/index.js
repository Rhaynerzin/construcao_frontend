import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Lista de Usuários</h1>
      <Row>
        {users.map(user => (
          <Col md={4} key={user.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <Card.Body>
                <Card.Title>
                  <Link href={`/user/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </Card.Title>
                <Card.Text>Idade: {user.age}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
