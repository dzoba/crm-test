import React, { useState } from 'react';
import { Contact } from './types/supabaseTypes';
import supabase from './supabase';

import './types/supabaseTypes'

const SearchContacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);

    if (error) {
      console.error('Error searching contacts:', error);
    } else {
      setContacts(data || []);
    }
  };

  return (
    <div>
      <h1>Search Contacts</h1>
      <input
        type="text"
        placeholder="Search by first or last name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.first_name} {contact.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchContacts;
