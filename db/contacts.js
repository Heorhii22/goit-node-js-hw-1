const { Console } = require("console");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contactList);
  console.table(parsedContacts);
  return parsedContacts;
}
async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  if (result) {
    console.log(result);
  } else {
    console.log("Контакт не знайдено");
  }
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    console.log("Контакт для видалення не знайдено");
  } else {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Deleted contact:", result);
  }
}

async function addContact(data) {
  const contacts = await listContacts();
  const isContactExists = contacts.some(
    (contact) => contact.name === data.name
  );

  const newContact = {
    id: nanoid(),
    ...data,
  };

  if (isContactExists) {
    console.log("Added contact:", newContact);
    return;
  }

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(newContact);
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
