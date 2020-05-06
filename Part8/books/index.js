const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

require("dotenv").config();

mongoose.set("useFindAndModify", false);
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "secret";

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    me: (root, args, context) => {
      return context.currentUser;
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({});
      // If quieried for specific genre
      if (args.genre) {
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
    // To Create a User
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return await user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    //TO Handle Login
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "password") {
        throw new UserInputError("Wrong Credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      // OPeration only allowed for logged in Users
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = {};
      // CHeck if Author already exists in the database
      author = await Author.findOne({ name: args.author });
      if (author === null) {
        // Create the new Author object if needed
        const newAuthor = new Author({ name: args.author, born: null });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      });
      try {
        book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      // OPeration only allowed for logged in Users
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      // Find the author to change the date of birth
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      console.log("Edit AUTHOR: ", author);
      try {
        author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
