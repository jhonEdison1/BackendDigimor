const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';
 

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/postgreSQL');
    }
    function list () {
        return store.list(TABLE);
    }
    function get (id) {
        console.log(id)
        return store.get(TABLE, id);
    }
   async function upsert(body){
        const user = {
            email: body.email,
            name: body.name,
            password: body.password,
        }
        if(body.id){
            user.id = body.id
        }else{
            user.id = nanoid();
        }
        if(body.password || body.email){
            await auth.upsert({
                id: user.id,
                email: user.email,
                password: body.password
                
            })

        }

        return store.upsert(TABLE, user);
    }
    
    return {
        list,
        get,
        upsert
    };
}

