const express = require ('express');

const dbConnect = require('./config/db.js')

const app = express();

app.get('/', (req,res) => res.send('Server connected'));

// Initialize middleware

app.use(express.json({extended:false}))


app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));



dbConnect();

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`Server connected on port ${PORT}`));