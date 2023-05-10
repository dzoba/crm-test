import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Contact } from './types/supabaseTypes';
import supabase from './supabase';

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase.from('contacts').select('*');
    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      setContacts(data);
    }
  };

  const testFunction = async () => {
    const { data, error } = await supabase.functions.invoke('hello', {
      body: { name: 'Functions' },
    })
    if (error) {
      console.error('Error calling hello:', error)
    } else {
      console.log('Success:', data)
    }
  }

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>{contact.first_name} {contact.last_name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={testFunction}>Test function</button>
    </div>
  );
};

export default ContactsList;
