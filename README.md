# PROJECT ZN

# Persyaratan

- Nodejs v21+

# Teknologi yang di pakai

- Javascript
- ORM Prisma
- ExpressJs
- DB Postgresql Supabase

# Instalasi Paket

1. clone repository

```javascript
https://github.com/cepot-blip/project-zn-be.git
```

2. Install package

```javascript
npm install
```

3.  Setting database

- buat database baru di postgresql
- setting database di file .env

```javascript
DATABASE_URL = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE";
```

4. migrate database prisma dengan menggunakan perintah berikut

- setiap menambah table baru di schema jangan lupa lakukan pertintah di bawah ini

```javascript
npx prisma db push
```

5. Running server

```javascript
npm run dev (untuk development)
npm run start (untuk production)
```
