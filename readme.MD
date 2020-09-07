clone repository.

1. Run npm install

2. setup the database if there is no database file:

$ npx prisma migrate save --experimental
(select yes to create new sqlite database)
name migration whatever you want.

$ npx prisma migrate up --experimental
$ npx prisma generate

 visit localhost:4000
