// pages/user/[id].js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://dummyjson.com/users/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
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
  );
};

export default UserDetails;