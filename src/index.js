const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // users: () => users, // We could do this since it's such a simple query
    users: async (parent, args, context, info) => {
      return context.prisma.user.findMany();
    },
    user: (parent, args, context, info) => {
      return context.prisma.user.findOne({
        where: {
          id: parseInt(args.userId),
        },
      });
    },
    todos: (parent, args, context, info) => {
      return context.prisma.todo.findMany();
    },
  },
  Mutation: {
    updateUser: (parent, args, context, info) => {
      return context.prisma.user.update({
        where: {
          id: parseInt(args.userId),
        },
        data: { ...args.input },
      });
    },
    createUser: (parent, args, context, info) => {
      const newUser = context.prisma.user.create({
        data: {
          email: args.email,
          firstName: args.firstName,
        },
      });
      return newUser;
    },
    deleteUser: (parent, args, context, info) => {
      return context.prisma.user.delete({
        where: { id: parseInt(args.userId) },
      });
    },
    createTodo: (parent, args, context, info) => {
      return context.prisma.todo.create({
        data: {
          name: args.name,
          isCompleted: args.isCompleted,
          order: args.order,
        },
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
