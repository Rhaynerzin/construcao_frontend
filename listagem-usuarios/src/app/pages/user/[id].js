import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fazendo a requisição para pegar os detalhes do usuário
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar detalhes do usuário:', error);
        });
    }
  }, [id]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Img variant="top" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <Card.Body>
          <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Telefone: {user.phone}</Card.Text>
          <Card.Text>Gênero: {user.gender}</Card.Text>
          <Card.Text>Idade: {user.age}</Card.Text>
          <Card.Text>Data de Nascimento: {user.birthDate}</Card.Text>
          <Card.Text>Universidade: {user.university}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
