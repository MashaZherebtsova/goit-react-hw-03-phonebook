import { ContactForm } from "./ContactForm/ContactForm";

import React, { Component } from 'react'
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
state = {
  contacts: [],
  filter: ""
}
handleAddContact = (contact) => {
  if(this.state.contacts.some((item)=> item.name === contact.name)){
    toast.error("Contacts already exist")
    return true
  }
this.setState((prevState)=>{
  return{
    contacts:[...prevState.contacts, contact]
  }

})
return false
}
componentDidMount () {
  const contactsFromLocalStorage = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(contactsFromLocalStorage);

  this.setState({ contacts: parsedContacts });


}

componentDidUpdate (prevProps, prevState) {
  if (this.state.contacts !== prevState.contacts) {
    console.log ('обновилось')
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

handleDeleteContact = (id) => {
this.setState((prevState)=> {
  return{
    contacts: prevState.contacts.filter(contact => contact.id !== id)
  }
})
}
handleChangeFilter = (e) => {
  this.setState({filter: e.target.value})
}
handleFilterContacts = () => {
  return  this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase().trim()))
    
  
}
  render() {
    return (
      <>
    <ContactForm addContact={this.handleAddContact}/>
    <Filter value={this.state.filter} handleChange={this.handleChangeFilter}/>
    <ContactsList contacts={this.handleFilterContacts()} deleteContact = {this.handleDeleteContact}/>
    <Toaster/>
    </>
    )
  }
}
