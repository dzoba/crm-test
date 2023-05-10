import { Route, Routes } from 'react-router-dom';
import ContactsList from './ContactsList';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import SearchContacts from './SearchContacts';
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" Component={ContactsList} />
        <Route path="/contact/new" Component={ContactForm} />
        <Route path="/contact/:id" Component={ContactDetails} />
        <Route path="/edit/:id" Component={ContactForm} />
        <Route path="/search" Component={SearchContacts} />
      </Routes>
    </div>
  );
}

export default App;
