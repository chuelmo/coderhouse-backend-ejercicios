const options = {
    client: 'sqlite3',
    connection: {
        filename: './DB/mydb.sqlite3'
    },
    useNullAsDefault: true
};

module.exports = { options };