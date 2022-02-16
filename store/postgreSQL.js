const {Pool} = require('pg');

const config = require('../config');


const SCHEMA = config.postgres.schema;

const dbconf = {
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
};

const pool = new Pool(dbconf);


function handleCon(){
    pool.connect((err) => {
        if(err){
            console.log('[error]', err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('Database connected');
        }
    });
}

handleCon();

function list(table) {
    return pool.query(`SELECT * FROM ${SCHEMA}.${table}`)
      .then(res => {
        return res.rows;
      });
}

function get(table , id) {
    return pool.query(`SELECT * FROM ${SCHEMA}.${table} WHERE id = '${id}'`)
      .then(res => {
        return res.rows;
      });
}

function insert(table, data) {
    return pool.query(` INSERT INTO ${SCHEMA}.${table} (id, email, nombre) VALUES ('${data.id}', '${data.email}', '${data.name}')`)
      .then(res => {
        return res.rows;
      });
}
function insertAuth(table, data) {
    console.log(table);
    console.log(data);
    return pool.query(` INSERT INTO ${SCHEMA}.${table} (id, email, password) VALUES ('${data.id}', '${data.email}', '${data.password}')`)
    .then(res => {
            return res.rows;
        });
}

/*function insert(table, data) {
    return pool.query(`INSERT INTO ${SCHEMA}.${table} SET ?  `, {data})
      .then(res => {
        return res.rows;
      });
}

/*function insert(table, data) {
    return new Promise((resolve, reject)=>{
        console.log(`GOING TO MAKE AN INSERT INTO TABLE: ${table} with data: ${data}`)
        pool.query(`INSERT INTO ${SCHEMA}.${table} SET ?`, [data], (err, result) => {
            if(err) {
                console.error("### ERR ###: ",err)
                return reject(err)
            } else {
                resolve(result)
            }
        })
    })
}*/

function upsert(table, data){
    return insert(table, data);
}
  
  module.exports = {
    list,
    get,
    upsert,
    insertAuth
  };



