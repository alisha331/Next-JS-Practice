import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    image: String
  }
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'Node.js',
    author: 'author1',
    image: 'https://via.placeholder.com/150x200?text=Node.js',
  },
  {
    title: 'Next.js',
    author: 'author2',
    image: 'https://via.placeholder.com/150x200?text=Next.js',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at: ${url}`);
