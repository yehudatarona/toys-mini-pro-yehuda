const express = require('express');
const router = express.Router();
const { toysModel,validToy} = require("../models/toys_model")

// testing connection to db for fun
toysModel.find({})
    .then(data => {
        console.log("then", data);
    })
    .catch(err => {
        console.log(err);
    })

/* GET home page. */
// all toys in the db domain/toys

router.get('/', (req, res, next) => {
    toysModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

// search query domain/toys/search/?s=<searched item>

router.get("/search/",(req,res) => {
    const mySearch = new RegExp(`${req.query.s}`);
    toysModel.find({$or:[{name:mySearch},{category:mySearch}]})
    .then(data => {
      res.json(data)
    })
  })

// In the below query string we decide how many toys will display in one page ( limit per page and also the sort order)
  router.get('/limit/:pageNum', (req, res) => {
    let perPage = Number(req.query.perPage) || 4;
   
    // limit -> the max amount to be display on apage
    // SKIP -> how many to skip and display then rest.
    toysModel.find({})
    .limit(perPage)
    .skip(req.params.pageNum * perPage)
    .sort({_id:-1})
    .then(data => {
      res.json(data)
    })
  });


 // to get the amount of toys all in the db

  router.get('/countToys',(req,res) => {
    toysModel.countDocuments({})
    .then(data => {
      res.json({doucuments:data})
    })
  })
  

 
  // filter out toys by category for the  db domain/toys/cat/<cat name>
  
router.get("/catCount/:catId",(req,res) => {
    let catId = req.params.catId;
    toysModel.countDocuments({category:catId})
    .then(data => {
      res.json({doucuments:data})
    })
  })



  
   // to get the amount of toys in categoery
  router.get("/cat/:catId",(req,res) => {
    let catId = req.params.catId;
    let pageNum = req.query.pageNum || 0;
    let perPage = Number(req.query.perPage) || 5;
    toysModel.find({category:catId})
    .skip(pageNum * perPage)
    .limit(perPage)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err)
    })
  })


router.get('/single/:id', (req, res, next) => {

    toysModel.findOne({_id:req.params.id})
    .then(data => {
      res.json(data)
      
    })
    .catch(err => {
      res.status(400).json(err)
    })
  });


 
  router.post("/add",async(req,res) => {
    let dataBody = req.body;
    let toy = await validToy(dataBody);
    if(toy.error){
      res.status(400).json(toy.error.details[0])
    }
    else{
      try{
        let updateData = await toysModel.insertMany([req.body]);
        res.json(updateData)
        
      }
      catch(err){
        console.log(err);
        res.status(400).json({ message: "error insert new toy, already in data" })
      }
    }
  })

  router.post("/edit",async(req,res) => {
    let dataBody = req.body;
    let toy = await validToy(dataBody);
    if(toy.error){
      res.status(400).json(toy.error.details[0])
    }
    else{
      try{
        let updateData = await toysModel.updateOne({_id:req.body.id},req.body);
        res.json(updateData)
        
      }
      catch{
        res.status(400).json({ message: "error cant find id" })
      }
    }
  })

  router.post("/del",(req,res) => {
    let delId = req.body.del
    toysModel.deleteOne({_id:delId})
    .then(data => {
      if(data.deletedCount > 0 ){
        res.json({message:"deleted"});
      }
      else{
        res.status(400).json({error:"error id not found"});
      }
    })
  })

 
  // router.get("/prices",(req,res) => {
  //   // https://docs.mongodb.com/manual/reference/operator/query/
  //   //gte == greate equal >=
  //   //http://localhost:3000/toys/price/?min=10
  //   // or
  //   //llte == less than equal <=
  //   //http://localhost:3000/toys/price/?max=10

  //   toysModel.find({ $or: [ {price:{$gte:req.query.min }}, { price:{$lte:req.query.max }} ] })
  //   .then(data => {
  //     res.json(data);
  //   })
  // })

  router.get("/prices",(req,res) => {
    // https://docs.mongodb.com/manual/reference/operator/query/
    //gte == greate equal >=
    // or
    //lte == less than equal <=
    //http://localhost:3000/toys/prices/?min=10&max=65

    let min = req.query.min||0;
    if(min <0){
      min=0;
    }
    let max= req.query.max||99999;

    toysModel.find({price:{$gte:min , $lte:max }})
    .then(data => {
      res.json(data);
    })
  })

  

module.exports = router;
