clone repository.

Run npm install
If dev.db does not exist, run the following commands:

$ npx prisma migrate save --experimental <br/>
$ npx prisma migrate up --experimental <br/>
$ npx prisma generate <br/>

Then startup server when ready:

$ node src/index.js <br/>

visit localhost:4000
