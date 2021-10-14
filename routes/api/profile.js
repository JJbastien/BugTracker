const express = require ('express');
const router  = express.Router();
const auth = require ('../../middleware/auth');
const Profile = require ('../../models/Profile');
const User  = require ('../../models/Users');
const {check, validationResult} =  require ('express-validator');
//Route to get profile

router.get('/me', auth, async (req, res) =>{

    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', 
        
            ['name']
        );

        if (!profile){
            return res.status(400).json({msg: 'there is no profile for this user'});
        }

        res.json(profile);


    } catch(err) {
        console.error(err.message);
        res.status(500).send( 'Server Error');
    }

    }
)// Route to create or update a user profile 

router.post('/', [auth, [
    check('department', 'department is required').not().isEmpty()
   
]],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({erros: errors.array()})
    }
    const{ department, title
        
    }= req.body

    //Build profile object:
    const  profileFields = {};
    profileFields.user = req.user.id;
    if (department) profileFields.department = department;
    if (title) profileFields.title = title;

    try { let profile = await Profile.findOne({user: req.user.id});
        
        if (profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, 
                {$set: profileFields},
                {new: true}
                );

                return res.json(profile);
        }

        // create new profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
            
        }


}
    
    
)

// route to get all profiles

router.get('/', async (req, res) => {
    try { const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

  }
)

//Route to delete user and profile

router.delete('/', auth, async (req, res) => {
   try{
    await  Profile.findOneAndDelete({user: req.user.id});

    await User.findOneAndDelete({_id: req.user.id});
    
    res.json({msg : "User deleted"})
   } catch (err){
       console.error(err.message);
       res.status(500).send("server error");
   }     
    
});






module.exports = router;