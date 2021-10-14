const express = require('express');
const router = express.Router();
const{check, validationResult}= require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile')

//route to list post

router.post('/' , [
    auth,
    [
        check('text', 'text is required')
        .not()
        .isEmpty(),
        
    ]
], 
   async (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()){
           return res.status(400).json({errors: errors.array()})
       }
       try {
           const user = await User.findById(req.user.id).select('-password');
           const newPost = new Post({
               text: req.body.text,
               name: user.name,
               user: req.user.id
           })
           const post = await newPost.save();

           res.json(post)
           
       } catch (err) {
           console.error(err.message);
           res.status(500).send('server error')
       }

    }
    
    );

    //Route to get all posts. it is a public route
    router.get('/', async(req, res) => {
       try {
           const posts = await Post.find();
           res.json(posts)
           
           
       } catch (err) {
           console.error(err.message);
           res.status(500).send('server error')
           
       } 
});
    //Route to get a single post by ID
    router.get('/:id', async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.json(post);

            if (!post){
                return res.status(404).send('Post not found')
            }
            
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error')
            
        } 
 });

module.exports = router;