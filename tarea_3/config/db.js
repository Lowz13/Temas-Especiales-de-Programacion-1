import mongoose from 'mongoose';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, DB_AUTH_SOURCE } = process.env;

// Se construye la URI de forma dinámica y explícita
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(` Conexión exitosa a MongoDB en ${DB_HOST}:${DB_PORT}`);
  } catch (error) {
    console.error(' Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

export default connectDB;
