const books = require("./db/contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await books.listContacts();
      return allContacts;
    case "get":
      const findContact = await books.getContactById(id);
      return findContact;
    case "add":
      const addContact = await books.addContact({ name, email, phone });
      return addContact;
    case "remove":
      const removeContact = await books.removeContact(id);
      return removeContact;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);

// invokeAction({ action: "read" });
// invokeAction({ action: "find", id: "vza2RIzNGIwutCVCs4mCL" });
// invokeAction({
//   action: "add",
//   name: "Jef Besos",
//   email: "jefrey3484@mail.com",
//   phone: "(815) 998-5732",
// });
// invokeAction({
//   action: "remove",
//   id: "drsAJ4SHPYqZeG-83QTVW",
// });
// invokeAction({ action: "remove", id: "C9sjBfCo4UJCWjzBnOtxl" });
