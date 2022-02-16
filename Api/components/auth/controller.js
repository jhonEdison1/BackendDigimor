
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';
module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/postgreSQL');
    }

    async function login(email, password) {
      const data = await store.query(TABLE, {email: email});
    
      return bcrypt.compare(password, data.password).then(isEquals => {
        if(isEquals === true) {
            //generar token
            return auth.sign(data);
        }else{
              throw new Error('Credenciales incorrectas');
        }

      });

      
      
    }

       /* async function upsert(data){
        
        const authData ={
            id: data.id
        }
        if(data.email) {
            authData.email = data.email;

        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.upsert(TABLE, authData);
    }*/

    async function upsert(data){
        
        const authData ={
            id: data.id
        }
        if(data.email) {
            authData.email = data.email;

        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.insertAuth(TABLE, authData);
    }

    return{
        upsert,
        login
    };
}