import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function UserDetail() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query; // Obtém o ID do usuário a partir da rota

  useEffect(() => {
    if (id) {
      // Faz a requisição GET para buscar os detalhes do usuário
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setUser(response.data); // Armazena os dados no state
        })
        .catch(error => {
          console.error("Erro ao buscar detalhes do usuário:", error);
        });
    }
  }, [id]);

  return (
    <Container>
      <h1 className="my-4">Detalhes do Usuário</h1>
      {user && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Telefone:</strong> {user.phone} <br />
                  <strong>Gênero:</strong> {user.gender} <br />
                  <strong>Idade:</strong> {user.age} <br />
                  <strong>Data de Nascimento:</strong> {user.birthDate} <br />
                  <strong>Universidade:</strong> {user.university}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
