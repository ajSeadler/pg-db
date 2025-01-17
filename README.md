## 🏁 Getting Started

1. Add a `.env` file with your secret value for auth

```
JWT_SECRET='somesecretvalue'
```

2. Create the database

```bash
createdb your-database-name
```

3. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString =
  process.env.DATABASE_URL || "https://localhost:5432/your-database-name";
```

4. Seed the database

```bash
npm run seed
```

5. Start the server

```bash
npm run dev
```

6. Open your browser at `http://localhost:3000`
