const fs = require("fs").promises;
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('db', 'contacts.json');


async function listContacts() {
   try {
        const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
        return data;
    } catch (error) {
      console.log(error);
    }
}

async function getContactById(contactId) {
 try {
        const data = await listContacts();
        const requiredContact = data.find((contact) => contact.id === contactId);
        console.log(requiredContact);
        return requiredContact ? requiredContact : 0;
    } catch (error) {
      console.log(error);
    }
}

async function removeContact(contactId) {
  try {
        const data = await listContacts();
        const removedContact = data.filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));
        console.log(`${contactId} has been removed`);
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
     const data = await listContacts();
     const contact = { id: uuidv4(), name, email, phone };      
        data.push(contact);
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
        return contact;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {listContacts, getContactById, addContact, removeContact};