import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';

interface User {
  _id: string;
  clerkId: string;
  name?: string; // Optional
  email?: string; // Optional
  transcriptions: ObjectId[];
}

interface Transcription {
  _id: ObjectId;
  fileName: string;
  content: string;
  uploadDate: Date;
  userId: string;
}

// MongoDB connection string and database details
const client = new MongoClient("mongodb+srv://vvansh739:6yBJaTsURRTZPZGT@cluster0.dztso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const dbName = 'yoomdb';
const usersCollectionName = 'users';
const transcriptionsCollectionName = 'transcriptions';

// Generate a unique ID based on the current date and time
function generateDateBasedId(): string {
  const now = new Date();
  return now.toISOString().replace(/[-:.]/g, ''); // Example: "20230914T123456"
}
export async function POST(request: Request) {
  const { transcription, fileName, userId, name = '', email = '' } = await request.json();

  console.log('Received request with transcription, fileName, userId, name, and email:', { transcription, fileName, userId, name, email });

  if (!transcription || !fileName || !userId) {
    console.error('Transcription, fileName, or userId is missing');
    return NextResponse.json({ error: 'Transcription, fileName, and userId are required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection<User>(usersCollectionName);
    const transcriptionsCollection = db.collection<Transcription>(transcriptionsCollectionName);

    // Find user by clerkId
    let user = await usersCollection.findOne({ clerkId: userId });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found. Creating new user.');
      const newUser: User = {
        _id:userId, // Convert ObjectId to string
        clerkId: userId,
        name,
        email,
        transcriptions: []
      };

      const insertResult = await usersCollection.insertOne(newUser);
      console.log('New user created with ID:', insertResult.insertedId);
      user = newUser;
    }

    // Insert transcription
    const transcriptionDoc: Transcription = {
      _id: new ObjectId(),
      fileName,
      content: transcription,
      uploadDate: new Date(),
      userId: user._id
    };
    const transcriptionResult = await transcriptionsCollection.insertOne(transcriptionDoc);
    console.log('Transcription inserted with ID:', transcriptionResult.insertedId);

    // Update user's transcriptions array
    await usersCollection.updateOne(
      { _id: user._id },
      { $push: { transcriptions: transcriptionResult.insertedId } }
    );
    console.log('Updated user with new transcription ID');

    return NextResponse.json({ message: 'Transcription uploaded successfully', id: transcriptionResult.insertedId });
  } catch (error) {
    console.error('Error uploading transcription:', error);
    return NextResponse.json({ error: 'Error uploading transcription' }, { status: 500 });
  } 
}// app/api/upload-transcription/route.ts


export async function GET(request: Request) {
  try {
    const userId = request.headers.get('X-User-Id');

    console.log('Received request with userId:', userId);
    
    if (!userId || typeof userId !== 'string') {
      console.error('Invalid or missing userId');
      return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection<User>(usersCollectionName);
    const transcriptionsCollection = db.collection<Transcription>(transcriptionsCollectionName);

    // Find user by clerkId
    const user = await usersCollection.findOne({ clerkId: userId });
    console.log('User found:', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Retrieve user's transcriptions
    const transcriptions = await transcriptionsCollection.find({ userId: user._id }).toArray();

    return NextResponse.json({ transcriptions });
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    return NextResponse.json({ error: 'Error fetching transcriptions' }, { status: 500 });
  } 

}
