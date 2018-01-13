import { config } from "mssql";

const DATABASE_CONFIG: config = {
    driver: 'mssql',
    user: 'sa',
    password: 'Dan123456',
    server: 'localhost',
    database: 'TutorialDB',
    pool: {
        max: 5,
        min: 1
    },
    options: {
        abortTransactionOnError: true
    }
}

export { DATABASE_CONFIG };