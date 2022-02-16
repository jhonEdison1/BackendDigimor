module.exports = {
    api:{
        port: process.env.API_PORT || 3000
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secret!'
    },
    postgres:{
        user: process.env.POSTGRES_USER || 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        database: process.env.POSTGRES_DB || 'Digimor',
        password: process.env.POSTGRES_PASSWORD || '1234',
        port: process.env.POSTGRES_PORT || 5432,
        schema: process.env.POSTGRES_SCHEMA || 'public'
    }
}