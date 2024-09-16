import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      setUser(response.data);
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          <Card.Text>
            Email: {user.email}<br />
            Telefone: {user.phone}<br />
            Gênero: {user.gender}<br />
            Idade: {user.age}<br />
            Data de Nascimento: {user.birthDate}<br />
            Universidade: {user.university}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetail;