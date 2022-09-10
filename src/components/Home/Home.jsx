import { useSelector } from 'react-redux';

export default function Home() {
  const token = useSelector(state => state.phonebook.token);

  return (
    <>
      {!token && (
        <h3>
          Hello, your contacts book is on the board ! <br />
          Pass the authorization, please :)
        </h3>
      )}
    </>
  );
}
