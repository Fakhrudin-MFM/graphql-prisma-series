const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  helloWorld: String!
}
`;

const resolvers = {
  Query: {
    helloWorld: () => `Hello World! What a day!`,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
