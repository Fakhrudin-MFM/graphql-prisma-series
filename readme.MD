clone repository.

1. Run npm install

If dev.db does not exist, run the following commands:

$ npx prisma migrate save --experimental
$ npx prisma migrate up --experimental
$ npx prisma generate

Then startup server when ready:

$ node src/index.js

 visit localhost:4000
