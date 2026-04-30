import PocketBase from 'pocketbase';

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

export const pocketbaseClient = new PocketBase(PB_URL);