import 'dotenv/config';
import { MongoClient } from 'mongodb';

// MongoDB connection configuration
const DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  connectTimeoutMS: 5000, // 5 second timeout
  socketTimeoutMS: 45000, // 45 second timeout
};

// Create MongoDB client instance with configuration
const createMongoClient = () => {
  if (!process.env.MongoUrl) {
    throw new Error('MongoDB connection URL not found in environment variables');
  }

  return new MongoClient(process.env.MongoUrl, DB_CONFIG);
};

// Singleton client instance
let mongoClient = null;

/**
 * Connects to MongoDB and returns client instance
 * @returns {Promise<MongoClient>} MongoDB client instance
 * @throws {Error} If connection fails
 */
export async function connectDb() {
  try {
    if (mongoClient) {
      return mongoClient;
    }

    mongoClient = createMongoClient();
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB');

    return mongoClient;

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

/**
 * Safely disconnects from MongoDB
 * @param {MongoClient} client - MongoDB client instance to disconnect
 * @returns {Promise<void>}
 */
export async function disconnectDb(client) {
  try {
    if (!client) {
      console.warn('No MongoDB client provided for disconnection');

      return;
    }

    await client.close();
    mongoClient = null;
    console.log('Successfully disconnected from MongoDB');

  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error);
    throw error;
  }
}

