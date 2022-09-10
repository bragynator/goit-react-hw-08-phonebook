import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from 'redux/phonebookApi';

export default function Contacts() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useGetContactsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [addContact] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const contacts = useSelector(state => state.phonebook.contacts);

  const normalizedFilter = filter.trim().toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      case 'filter':
        setFilter(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const existedContactName = contacts.find(contact => contact.name === name);

    if (name.trim() === '' || number.trim() === '') {
      toast.warning('Oops, some fields are empty! Please, check it!');
      return;
    }

    if (existedContactName) {
      toast.error('Oops, entered name is already existed - try to find it!');
      reset();
      return;
    }

    addContact({ name: name.trim(), number: number.trim() });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Box m={3}>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
          mb: 5,
        }}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <TextField
          label="Number"
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
        />
        <Button variant="outlined" type="submit" size="large">
          Add new contact
        </Button>
      </Box>

      <TextField
        label="Search"
        type="search"
        name="filter"
        size="large"
        helperText="Filter your contacts"
        variant="filled"
        autoComplete="off"
        value={filter}
        onChange={handleInputChange}
      />

      {contacts.length === 0 ? (
        <Typography variant="subtitle1">
          Sorry, but your contacts list is empty! Add new contact now!
        </Typography>
      ) : filteredContacts.length === 0 ? (
        <Typography variant="subtitle1">Matches not found!</Typography>
      ) : (
        <Box component="ul">
          {filteredContacts.map(({ id, name, number }) => (
            <li key={id}>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                mb={2}
                p={1}
              >
                <Typography>
                  {name} : {number}
                </Typography>
                <Button
                  variant="contained"
                  type="button"
                  size="small"
                  onClick={() => deleteContact(id)}
                >
                  Delete
                </Button>
              </Stack>
            </li>
          ))}
        </Box>
      )}
    </Box>
  );
}
