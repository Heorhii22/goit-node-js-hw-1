const books = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const allContacts = await books.listContacts();
      console.log("Contacts list", allContacts);
      break;
    case "find":
      const findContact = await books.getContactById(id);
      console.log("Searched contact", findContact);
      break;
    case "add":
      const addContact = await books.addContact({ name, email, phone });
    //   console.log("Added contact", addContact);
  }
};

invokeAction({ action: "read" });
invokeAction({ action: "find", id: "C9sjBfCo4UJCWjzBnOtxl" });
invokeAction({
  action: "add",
  name: "Jef Besos",
  email: "jefrey3484@mail.com",
  phone: "(815) 998-5732",
});

// invokeAction({ action: "remove", id: "C9sjBfCo4UJCWjzBnOtxl" });
