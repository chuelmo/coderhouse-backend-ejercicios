const options = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite3'
    },
    useNullAsDefault: true
};

module.exports = { options };