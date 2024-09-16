import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from '../componentes/UserCard';
import api from '../utilidades/api';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Listagem de Usuários</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {users.map((user) => (
          <Col key={user.id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}