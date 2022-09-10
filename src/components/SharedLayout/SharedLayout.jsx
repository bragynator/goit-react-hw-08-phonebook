import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';
import UserMenu from '../UserMenu/UserMenu';

export default function SharedLayout() {
  const token = useSelector(state => state.phonebook.token);

  return (
    <>
      <AppBar position="static" mb={3}>
        <Toolbar>
          <Box component="nav" flexGrow="1">
            <Box
              component="ul"
              display="flex"
              columnGap={2}
              color="inherit"
              fontSize="18px"
            >
              {token ? (
                <li>
                  <Link to="/contacts">Contacts</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/register">Registration</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </Box>
          </Box>
          {token && <UserMenu />}
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>
    </>
  );
}
