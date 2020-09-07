const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let users = [
  {
    id: "123",
    firstName: "Cindy",
    email: "cindy@cindy.com",
  },
  {
    id: "456",
    firstName: "Todd",
    email: "todd@todd.com",
  },
];

const resolvers = {
  Query: {
    helloWorld: () => `Hello World! What a day!`,
    // users: () => users, // We could do this since it's such a simple query
    users: async (parent, args, context, info) => {
      return context.prisma.user.findMany();
    },
    user: (parent, args, context, info) => {
      return users.find((user) => {
        if (user.id == args.userId) {
          return user;
        }
      });
    },
  },
  User: {
    id: (parent) => parent.id,
    firstName: (parent) => {
      console.log("What is parent: ", parent);
      return parent.firstName;
    },
    // firstName: (parent) => parent.firstName, // simple version. above to illustrate
    email: (parent) => parent.email,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
