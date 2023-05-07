import React from 'react'
import propTypes from 'prop-types';
import css from './ContactList.module.css'

    export function ContactsList({contacts, deleteContact}) {
        return (
          <ul className={css.contactList}>
            {contacts.map (contact => {
              return (
      <li key={contact.id} >
          <span>{contact.name}</span>:
          <span>{contact.number}</span>
          <button className={css.contactListBtn} onClick={()=> deleteContact(contact.id) }>Delete</button>
      </li>
              )
            } )}
          </ul>
        )
      }
  

ContactsList.propTypes = {
    contacts: propTypes.arrayOf(
      propTypes.exact({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        number: propTypes.string.isRequired,
      })
    ),
    deleteContact: propTypes.func.isRequired,
  };