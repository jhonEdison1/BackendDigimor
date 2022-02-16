const db = {
    'user': [
        {id:1, name: 'juan' },
        {id:2, name: 'pedro' },
    ],
};

async function list (table) {
    return db[table] || [];

};

async function get(table,id){
    let col = await list(table)
    return col.find(item => item.id == id) || null
}




async function upsert(table, data){
    if(!db[table]){
        db[table] = [];
    }
    db[table].push(data);
    console.log(db);

}
async function remove(table, id){
    return true;
}

async function query(table, q){
    let col = await list(table)
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null ;
}
module.exports = {
    list,
    get,
    upsert,
    remove,
    query
};