import { useSelector } from 'react-redux';
import { Stack, Typography, Button } from '@mui/material';
import { useLogOutMutation } from 'redux/phonebookApi';

export default function UserMenu() {
  const name = useSelector(state => state.phonebook.user.name);
  const [logout] = useLogOutMutation();

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      justifyContent="flex-end"
    >
      <Typography variant="h6" color="#fff">{`Welcome, ${name}!`}</Typography>
      <Button
        variant="outlined"
        type="button"
        onClick={logout}
        size="medium"
        color="inherit"
      >
        Logout
      </Button>
    </Stack>
  );
}
