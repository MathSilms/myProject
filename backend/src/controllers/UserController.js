const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt_token = require('../../variables');

module.exports = {

    async create( req, res ) {
        try{
        const { name, surname, cpf, email, password } = req.body
        const userEmail = await User.findOne({email:email})
        const userCpf = await User.findOne({cpf:cpf})

        if( userEmail ) { return res.status(401).json('erro de autenticação, email já cadastrado!'); } 
        if( userCpf ) { return res.status(401).json('erro de autenticação, cpf já cadastrado!'); } 
        
        bcrypt.hash(password, 10, async ( errBcrypt, password ) => {
            if(errBcrypt) { return res.status(500).json(`error:${errBcrypt}`)  }

            await User.create({
                name,
                surname,
                cpf,
                email,
                password
            })
        })
    
        return res.status(200).json('Cadastro efetuado com sucesso!');

       } catch(err) {
            console.log(err);
            return res.status(400).json('Ouve algum problema, tente novamente mais tarde');;
      
       }

    },

    async index( req, res ) {
       try{
        const users = await User.find()
        return res.json(users);

       } catch(err){
        return res.send(err)
       }
    },
     async login( req, res ) {

       try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) { 
                return res.status(401).json('erro de autenticação'); 
        }

        const result = await bcrypt.compareSync(password, user.password) 

        if ( result ) { 

            const token = jwt.sign({
                name: user.name,
                isAdmin:user.isAdmin,
                id: user.id,
            }, jwt_token, {
                expiresIn: "1h"
            })

            return res.status(200).send({messagem:'autenticação efetuada com sucesso!', token:token});
        }

        return res.status(401).json('Usuário/senha inválidos')

       } catch(err){
           console.log(err);
        return res.status(400).send(err);
       }
    },

    async put( req, res ) {
        const id = req.params;
        const body = req.body;

        return res.status(201).send({id , body})
    },
    async delete( req, res ) {
        const reqs = req.body
        return res.status(201).send(reqs)
    }
}