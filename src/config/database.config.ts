import { config } from "mssql";

const DATABASE_CONFIG: config = {
    driver: 'mssql',
    user: 'sa',
    password: 'Dan123456',
    server: 'localhost',
    database: 'TutorialDB'
}

export { DATABASE_CONFIG };