# 📘 CRUD Operations According to HTTP Methods

## 🔁 CRUD = Create, Read, Update, Delete

| CRUD Operation | HTTP Method | What It Does                  | Example Endpoint    |
| -------------- | ----------- | ----------------------------- | ------------------- |
| Create         | POST        | Adds a new resource           | POST `/users`       |
| Read (All)     | GET         | Retrieves a list of resources | GET `/users`        |
| Read (Single)  | GET         | Retrieves a specific resource | GET `/users/:id`    |
| Update         | PUT / PATCH | Updates an existing resource  | PUT `/users/:id`    |
| Delete         | DELETE      | Deletes a specific resource   | DELETE `/users/:id` |

---

## 🧠 HTTP Method Breakdown

- **POST**  
  → Used to **create** a new item in the database.  
  ✅ Example: `POST /products` adds a new product.

- **GET**  
  → Used to **read/fetch** data from the server.  
  ✅ Example: `GET /products` gets all products.  
  ✅ Example: `GET /products/123` gets product with ID `123`.

- **PUT**  
  → Used to **completely update** an existing item.  
  ✅ Example: `PUT /products/123` replaces the entire product data.

- **PATCH**  
  → Used to **partially update** an existing item.  
  ✅ Example: `PATCH /products/123` updates just one field.

- **DELETE**  
  → Used to **remove** a resource.  
  ✅ Example: `DELETE /products/123` deletes the product.

---

## 🧪 Real World Example: `/users` API

| Action                 | HTTP Method | Endpoint   | Body (JSON)              |
| ---------------------- | ----------- | ---------- | ------------------------ |
| Create new user        | POST        | `/users`   | `{ "name": "Sujay" }`    |
| Get all users          | GET         | `/users`   | —                        |
| Get a single user      | GET         | `/users/1` | —                        |
| Update user completely | PUT         | `/users/1` | `{ "name": "New Name" }` |
| Update user partially  | PATCH       | `/users/1` | `{ "name": "Suj" }`      |
| Delete a user          | DELETE      | `/users/1` | —                        |

---

## ✅ Summary Table

| HTTP Method | CRUD Operation | Usage                   |
| ----------- | -------------- | ----------------------- |
| POST        | Create         | Add a new item          |
| GET         | Read           | Fetch one or many items |
| PUT         | Update         | Replace an item         |
| PATCH       | Update         | Modify part of an item  |
| DELETE      | Delete         | Remove an item          |
