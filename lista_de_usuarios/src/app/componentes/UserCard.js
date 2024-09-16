import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function UserCard({ user }) {
  return (
    <Link href={`/users/${user.id}`} passHref>
      <Card className="h-100">
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
          <Card.Text>Idade: {user.age}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}