import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from './supabase';
import { Contact } from './types/supabaseTypes';

const ContactForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    created_at: null
  });

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
        setContact(data as Contact);
      } else {
        console.error('Error fetching contact:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      console.log('Updating contact' + id);
      // Update existing contact
      const { data, error } = await supabase
        .from('contacts')
        .update({
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
        })
        .eq('id', parseInt(id))
        .select();

      if (error) {
        console.error('Error updating contact:', error);
      } else {
        navigate(`/contact/${data[0].id}`);
      }
    } else {
      console.log('Creating contact');
      // Create new contact
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
        }])
        .select();

      if (error) {
        console.error('Error creating contact:', error);
      } else {
        navigate(`/contact/${data![0].id}`);
      }
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Contact' : 'Create Contact'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={contact.first_name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={contact.last_name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={contact.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={contact.phone || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{id ? 'Update Contact' : 'Create Contact'}</button>
      </form>
    </div>
  );
};

export default ContactForm;
