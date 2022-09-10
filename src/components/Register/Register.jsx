import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useSignUpMutation } from 'redux/phonebookApi';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp] = useSignUpMutation();

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    signUp({ name, email, password });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        rowGap: 2,
        my: 2,
      }}
    >
      <TextField
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        required
        helperText="7 symbols at least for password"
      />
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </Box>
  );
}
