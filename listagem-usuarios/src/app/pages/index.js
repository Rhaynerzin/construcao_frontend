import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para pegar a lista de usuários
    axios.get('https://dummyjson.com/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Lista de Usuários</h1>
      <Row>
        {users.map(user => (
          <Col key={user.id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Text>Idade: {user.age}</Card.Text>
                <Link href={`/user/${user.id}`} passHref>
                  <Card.Link>Ver detalhes</Card.Link>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
