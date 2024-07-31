import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../../redux/contactsSlice';
import PropTypes from 'prop-types';

const Phonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const loading = useSelector(state => state.contacts.loading);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = () => {
    if (name && number) {
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    }
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="button" onClick={handleAddContact}>Add contact</button>
      </div>
      <h2>Contacts</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <p>{contact.name}: {contact.number}</p>
              <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string
};

export default Phonebook;