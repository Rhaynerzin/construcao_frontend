import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import api from '../../utils/api';

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await api.get(`/users/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Detalhes do Usuário</h1>
      <Row>
        <Col md={4}>
          <Image src={user.image} fluid />
        </Col>
        <Col md={8}>
          <p>Nome: {`${user.firstName} ${user.lastName}`}</p>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.phone}</p>
          <p>Gênero: {user.gender}</p>
          <p>Idade: {user.age}</p>
          <p>Data de Nascimento: {user.birthDate}</p>
          <p>Universidade: {user.university}</p>
        </Col>
      </Row>
    </Container>
  );
}