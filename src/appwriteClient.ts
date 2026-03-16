import { Client, Databases, ID } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!projectId) {
    console.warn('Appwrite module cannot initialize without a Project ID. Check your .env.local file.');
}

const client = new Client();

if (projectId) {
    client.setEndpoint(endpoint).setProject(projectId);
}

export const databases = new Databases(client);
export const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export { ID };
