const User = require('../models/users');
const bcrypt = require ('bcrypt-nodejs');
const jwtService = require ('../services/jwt.services');

const userCtrl = {};

userCtrl.getUsers = async(req,res) => {
    const users = await User.find();
    res.json(users);
};
userCtrl.getUser = async(req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};


userCtrl.createUser = (req,res) =>{

    
    const user = new User({
        name: req.body.name,
        subname: req.body.subname,
        DNI: req.body.DNI,
        direction: req.body.direction,
        email: req.body.email,
        password: req.body.password,
        CP: req.body.CP,
        role: 'ROLE_USER',
        telephone: req.body.telephone
    });
    
    if(user.password){
        // Crypt and save data
        bcrypt.hash(user.password, null , null,(err,hash)=>{
            user.password = hash;
            if(user.name!=null && user.subname!=null && user.DNI!=null && user.direction!=null && 
                user.email!=null && user.password!=null && user.CP!=null && user.telephone!=null){
                // save user
                user.save()
                    .then( user => {
                        res.status(200).send({user:user});
                    })
                    .catch( error => {
                        res.status(500).send({error:err+"//"+user});
                    });
            }else{
                res.status(200).send({message:'Fill out form'});
            }
        });
    }else{
        res.status(200).send({message:'Enter de pass.'});
    }


};

userCtrl.editUser = async(req,res) => {
    const {id} = req.params;
    const user = {
        name: req.body.name,
        subname: req.body.subname,
        DNI: req.body.DNI,
        direction: req.body.direction,
        email: req.body.email,
        CP: req.body.CP,
        role: req.body.role,
        telephone: req.body.telephone
    };
    await User.findByIdAndUpdate(id,{$set:user}, {new:true});
    res.json({status: "User update"});
};
//HACER FUNCION PARA RESTABLECER CONTRASEÑA
userCtrl.deleteUser = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({status:"User deleted"});
};

userCtrl.loginUser = (req,res) =>{
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email:email.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500).send({message:'Server error'});
        }else{
            if(!user){
                res.status(404).send({message:'User not found.'});
            }else{
                bcrypt.compare(password,user.password, (err, check)=>{
                    if(check){
                        if(params.gethash){
                            //Here return token crypt
                            res.status(200).send({token:jwtService.createToken(user)});

                        }else{
                            res.status(200).send({user});
                        }

                    }else{
                        res.status(404).send({message:'User not login.'});
                    }
                });
            }
        }
    });
}



module.exports = userCtrl;