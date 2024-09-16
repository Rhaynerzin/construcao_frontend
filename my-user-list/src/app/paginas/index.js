import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://dummyjson.com/users');
      setUsers(response.data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Lista de Usuários</h1>
      <Row>
        {users.map(user => (
          <Col md={4} key={user.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={user.image} />
              <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Text>
                  Idade: {user.age}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}