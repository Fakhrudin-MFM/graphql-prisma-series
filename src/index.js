const { GraphQLServer } = require("graphql-yoga");

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

const typeDefs = `
type Query {
  helloWorld: String!
  users: [User!]!
  user(userId: ID!): User
}

type User {
    id: ID!
    firstName: String!
    email: String!
}
`;

const resolvers = {
  Query: {
    helloWorld: () => `Hello World! What a day!`,
    // users: () => users, // We could do this since it's such a simple query
    users: (parent, args, context, info) => {
      return users;
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
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
