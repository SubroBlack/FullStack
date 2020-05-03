const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");

require("dotenv").config();

mongoose.set("useFindAndModify", false);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error Connecting to MongoDB: ", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({});
      // If quieried for specific genre
      if (args.genre) {
        //result = Book.find({ genres: { $in: args.genre } });
        result = result.filter((b) => b.genres.includes(args.genre));
        console.log("Genre req ", result);
      }
      // If quieried for specific Author
      if (args.author) {
        const reqAuthor = await Author.find({ name: { $in: args.author } });
        const reqId = reqAuthor[0].id;
        result = result.filter((b) => b.author.toString() === reqId);
        console.log("Author req ", result);
      }
      return result;
    },
    allAuthors: () => Author.find({}),
  },
  Book: {
    // Custom Field resolver for Book item with author object
    author: async (root) => {
      const author = await Author.findById({ _id: root.author });
      return {
        name: author.name,
        born: author.born,
      };
    },
  },
  Author: {
    // Custom filed bookCount for author
    bookCount: (root) => {
      const bookNo = Book.collection.countDocuments({
        author: { $in: [root._id] },
      });
      return bookNo;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = {};
      // CHeck if Author already exists in the database
      author = await Author.findOne({ name: args.author });
      if (author === null) {
        // Create the new Author object if needed
        const newAuthor = new Author({ name: args.author, born: null });
        author = await newAuthor.save();
      }
      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      });
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      console.log("Edit AUTHOR: ", author);
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
