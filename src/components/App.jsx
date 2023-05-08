import { ContactForm } from "./ContactForm/ContactForm";

import React, { Component } from 'react'
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import toast, { Toaster } from 'react-hot-toast';
import css from "./App.module.css"


export class App extends Component {
  state = {
    contacts: [],
    filter: ""
  }
handleAddContact = (contact) => {
  if (this.state.contacts.some((item) => item.name === contact.name)){
    toast.error("Contact already exists");
    return true
  }
this.setState ((prevState)=> {
return {
  contacts : [...prevState.contacts, contact]
}
})
return false
}
handleDeleteContact = (id) => {
this.setState((prevState)=> {
  return {
    contacts: prevState.contacts.filter((contact => contact.id !== id))
  }
})
}
handleChangeFilter = (e) => {
  this.setState ({filter: e.target.value})
}
handleFilterContacts = () => {
  return this.state.contacts.filter(contact=> contact.name.toLowerCase().includes(this.state.filter.toLowerCase().trim()))
}
componentDidMount () {
  const contactsFromLocalStorage = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(contactsFromLocalStorage);
  if (parsedContacts){
    this.setState({ contacts: parsedContacts });
  }
  


}

componentDidUpdate (prevProps, prevState) {
  if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

  render() {
    return (
      <>
     <h1 className={css.title}>Phonebook</h1>
    <ContactForm addContact = {this.handleAddContact}/>
    <h2 className={css.title}> Contacts</h2>
    <Filter value = {this.state.filter} handleChange={this.handleChangeFilter}/>
    <ContactsList contacts={this.handleFilterContacts()} deleteContact ={this.handleDeleteContact} />
    <Toaster/>
    </>
    )
  }
}


