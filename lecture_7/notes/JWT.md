Sure! Here's a **simple and clean `.md` (Markdown) format** of JWT (JSON Web Token) information — perfect for your notes, quick reference, or interview prep:

---

```markdown
# 🔐 JWT (JSON Web Token) – Quick Notes

## ✅ What is JWT?

JWT stands for **JSON Web Token**. It's a secure way to represent **user identity and claims** between a client and server, using a **signed token**.

---

## 🧱 Structure of a JWT

A JWT has **3 parts**, separated by dots (`.`):

```

<HEADER>.<PAYLOAD>.<SIGNATURE>
```

### 1. 📄 Header

Contains metadata about the token, including the signing algorithm.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

* `alg`: Algorithm used for signing (e.g., HS256)
* `typ`: Type of token (always "JWT")

---

### 2. 📦 Payload

Contains the **claims** (data) about the user or session.

```json
{
  "userId": "abc123",
  "email": "user@example.com",
  "role": "admin",
  "exp": 1712345678
}
```

* `exp`: Expiry timestamp (UNIX time)
* ⚠️ This data is **not encrypted** — only base64-encoded

---

### 3. 🔏 Signature

Used to verify that the token was **not tampered with**.

Generated using:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)
```

If the signature is valid, the server knows the data hasn't been changed.

---

## 🔄 How JWT Works

1. User logs in → Server creates JWT with user info
2. JWT is sent to the client (stored in cookie or localStorage)
3. Client sends JWT in **Authorization header**:

```
Authorization: Bearer <token>
```

4. Server verifies token and grants access

---

## 🛡️ Best Practices

* ✅ Use short expiration time (`exp`)
* ✅ Store in `HttpOnly` cookie for security
* ❌ Don’t store sensitive info in payload (it's readable)
* ✅ Always verify token on server using secret key

---

## 🧾 Summary Table

| Part      | What it does           | Is it secure? |
| --------- | ---------------------- | ------------- |
| Header    | Algorithm & token type | ✅ Public      |
| Payload   | User info (claims)     | ❌ Visible     |
| Signature | Validates authenticity | ✅ Signed      |

---

## 🧪 Example Token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0NTUiLCJyb2xlIjoiYWRtaW4ifQ.
dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

You can decode it at 👉 [https://jwt.io](https://jwt.io)

---

