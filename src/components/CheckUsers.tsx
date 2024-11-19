import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: string;
}

export default function CheckUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Profile: {user.profile}</p>
        </div>
      ))}
    </div>
  );
}