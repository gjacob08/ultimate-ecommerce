import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
  {
    name: "Merchant",
    email: "merchant@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "merchant",
  },
  {
    name: "Customer",
    email: "customer@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "customer",
  },
];

export default users;
  