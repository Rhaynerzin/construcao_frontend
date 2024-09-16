// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Row>
      {users.map(user => (
        <Col key={user.id} md={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src={user.image} />
            <Card.Body>
              <Card.Title>{user.firstName} {user.lastName}</Card.Title>
              <Card.Text>
                Idade: {user.age}
              </Card.Text>
              <Card.Link href={`/user/${user.id}`}>Ver Detalhes</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Home;