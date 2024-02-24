const sql = require('mssql');

// Configuration for connecting to the local SQL Server database
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'localhost',
    database: 'your_database_name',
    options: {
        trustServerCertificate: true // For self-signed certificates
    }
};

// Function to execute a query
async function executeQuery(query) {
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    } catch (err) {
        console.error(err.message);
    } finally {
        sql.close();
    }
}

// Function to insert data into a table
async function insertData(tableName, data) {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        await request.query(`INSERT INTO ${tableName} VALUES (${data})`);
        console.log('Data inserted successfully');
    } catch (err) {
        console.error(err.message);
    } finally {
        sql.close();
    }
}

module.exports = { executeQuery, insertData };
