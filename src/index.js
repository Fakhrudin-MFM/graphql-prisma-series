const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateManyTodos(parent, args, context, info) {
  for (let i = 0; i < args.newPositions.length; ++i) {
    const todo = await context.prisma.todo.update({
      where: {
        id: parseInt(args.newPositions[i].todoId),
      },
      data: { order: args.newPositions[i].newPosition },
    });
  }
  return { count: args.newPositions.length }; // This is probably not good in case of errors.
}

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
    lists: (parent, args, context, info) => {
      return context.prisma.list.findMany();
    },
    list: (parent, args, context, info) => {
      return context.prisma.list.findOne({
        where: {
          id: parseInt(args.listId),
        },
      });
    },
  },
  Mutation: {
    updateManyTodos,
    createList: (parent, args, context, info) => {
      return context.prisma.list.create({
        data: {
          name: args.name,
        },
      });
    },
    deleteList: (parent, args, context, info) => {
      return context.prisma.list.delete({
        where: { id: parseInt(args.listId) },
      });
    },
    resetTodos: (parent, args, context, info) => {
      let newIds = args.todoIds.map((id) => {
        return parseInt(id);
      });
      return context.prisma.todo.updateMany({
        where: {
          AND: [
            {
              id: {
                in: newIds,
              },
            },
            {
              isCompleted: false,
            },
          ],
        },
        data: { isCompleted: true },
      });
    },
    deleteTodos: (parent, args, context, info) => {
      let newIds = args.todoIds.map((id) => {
        return parseInt(id);
      });
      return context.prisma.todo.deleteMany({
        where: {
          id: {
            in: newIds,
          },
        },
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
