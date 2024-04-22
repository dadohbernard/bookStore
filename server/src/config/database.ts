
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'book',
    password: 'qwerty@123',
    port: 5432, // Default PostgreSQL port
});

export default pool;
