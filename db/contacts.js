const { Console } = require("console");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}
async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
}

async function addContact(data) {
  const contacts = await listContacts();
  const isContactExists = contacts.some(
    (contact) => contact.name === data.name
  );
  if (isContactExists) {
    console.log("Контакт з таким ім'ям вже існує");
    return;
  }

  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("Контакт успішно доданий");
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
