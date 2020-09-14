clone repository.

Run npm install
If dev.db does not exist, switch to the branch you want to work in, and THEN run the following commands:

$ npx prisma migrate save --experimental <br/>
$ npx prisma migrate up --experimental <br/>
$ npx prisma generate <br/>

If you run migrations in master, (which is more complete than the branch you switch to) then master will bring migrations that shouldn't exist into the branches you're working on, and Prisma will complain.

Then startup server when ready:

$ node src/index.js <br/>

visit localhost:4000
