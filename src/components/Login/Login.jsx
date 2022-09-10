import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useLogInMutation } from 'redux/phonebookApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logIn] = useLogInMutation();

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
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

    logIn({ email, password });

    setEmail('');
    setPassword('');
  };

  return (
    <>
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
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </Box>
    </>
  );
}
