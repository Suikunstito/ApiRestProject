// controllers/userController.ts
import { Request, Response } from 'express';
import { connectToDatabase } from '../database';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { id, email, password } = req.body;

  if (!id || !email || !password) {
    res.status(400).send('Missing user attributes');
    return;
  }

  let dbConnection;
  try {
    dbConnection = await connectToDatabase();
    console.log('Connected to Oracle Database');

    const query = 'INSERT INTO Usuarios (id, email, password) VALUES (:id, :email, :password)';
    const binds = { id, email, password };
    await dbConnection.execute(query, binds, { autoCommit: true });

    res.status(201).send('User added successfully');
  } catch (error: any) {
    console.error('Error adding user to the database:', error.message);
    res.status(500).send('Error adding user to the database');
  } finally {
    if (dbConnection) {
      await dbConnection.close();
      console.log('Database connection closed');
    }
  }
};
