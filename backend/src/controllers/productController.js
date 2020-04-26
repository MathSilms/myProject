const Product = require('../models/products');

module.exports = {

    async create( req, res ) {
       try{
        const { title, description, slug, price,active, tags } = req.body;
       
        const request  = await Product.create({
            title, 
            description,
            slug,
            price,
            active,
            tags
        })
        return res.json(request)

       } catch(err){

        return res.status(400).json('Erro ao cadastrar produto, tente novamente!')
       }

    },

    async index( req, res ) {
       try{
        const  { slug }  = req.params;
        let Products = '';
        if(slug){   
            Products = await Product.find({
                slug:slug,
                active:true
            });

            return res.status(200).json(Products);
        }

        Products = await Product.find({active:true}, 'title price slug tags');

        return res.json(Products);

       } catch(err){
            console.log(err);
            return res.status(401).json(`erro ao cadastrar produto: ${err}`);
       }
    },
    async put( req, res ) {
        const id = req.params;
        const body = req.body;

        return res.status(201).send({id , body})
    },
    async delete( req, res ) {
        try{
            const { slug } = req.params
            let products = await Product.findOneAndDelete({slug:slug})
            console.log(products)
            return res.status(201).send(products);
            
        }catch(err){
            console.log(err);
            return res.status(400).send("error")
        }
    } 
}