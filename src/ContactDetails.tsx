import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from './supabase';
import { Contact } from './types/supabaseTypes';

const ContactDetails: React.FC = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (id) {
      fetchContact();
    }
  }, [id]);

  const fetchContact = async () => {
    if (id) {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (data) {
        console.log('data', data);
        setContact(data as Contact);
      } else {
        console.error('Error fetching contact:', error);
      }
    }
  };

  const generateImage = async () => {
    if (contact) {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      const { data, error } = await supabase.functions.invoke('image-gen', {
        body: { name: fullName, contactId: contact.id },
      });

      if (data) {
        console.log('Generated image data:', data);
      } else {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div>
      {contact ? (
        <>
          <h1>Contact Details</h1>
          <p>
            <strong>First Name:</strong> {contact.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {contact.last_name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
          <Link to={`/edit/${contact.id}`}>Edit</Link>
          <button onClick={generateImage}>Generate Image</button>
        </>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
};

export default ContactDetails;
