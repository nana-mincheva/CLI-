const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {listContacts, getContactById, addContact, removeContact} = require("./contacts");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
       console.table(list);
      break;

    case "get":
       const contactById = await getContactById(id);
        console.table(contactById);
      break;

    case "add":
      const newContactsList = await addContact(name, email, phone);
        console.table(newContactsList);
      break;

    case "remove":
      const deleteContacts = await removeContact(id);
        console.table(deleteContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);