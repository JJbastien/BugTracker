const mongoose = require ('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const dbConnect = async () => {

   try {
       mongoose.connect(db);
      console.log('database connected') 
   } catch (error) {
       console.error(err.message);
       process.exit(1)
       
   }
}
module.exports = dbConnect
