const express = require('express');
const Person = require("../models/Person");
const router = express.Router();

//post route to add a person
router.post('/',async(req,res)=>{
    try{

            const data = req.body;// assembling the request body contains the person data
  //create a new person document using the mongoose model
        const newPerson = new Person(data);
 // newPerson.data = data.name;
 // newPerson.data = data.age;
 // newPerson.data = data.mobile;
 // newPerson.email = data.email;
 // newPerson.address = data.address;
 

 //save the new person to the database
     const savedPerson = await newPerson.save();
     console.log('data save successfully');
     res.status(200).json(savedPerson);


    }
    catch(err){
       console.log(err);
       res.status(500).json({eoror: "Internal server error"});
       
    }

})

//get
router.get('/',async (req,res)=>{
    try{
           const data = await Person.find();
           console.log('data fetched');
           res.status(200).json(data);
           
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"internal error"})
      
    }
  })

  router.get('/:workType',async(req,res)=>{
    try{
               const workType  = req.params.workType;
               if(workType=='chef' || workType=='manager' || workType=='waiter'){
                const response = await Person.find({work: workType});
                console.log('response fetched');
                res.status(200).json(response);
                
               }
               else{
                res.status(404).json({error:'invalid work type'})
               }
    }
    catch(err){
            res.status(500).json({error:'invalid work type'});
    }
  })

router.put('/:id',async(req,res)=>{
    try{
            const person_id = req.params.id; 
            const updatedPersonData = req.body;

            const response = await Person.findByIdAndUpdate(person_id,updatedPersonData,{
                new: true,
                newValidators: true,
            })

            if(!response){
                return res.status(404).json({error:'person not found'})
            }

            console.log('data updated');
            res.status(200).json(response);            
    }
    catch(err){
        console.log(err);
        res.status(500).json({eoror: "Internal server error"});
        
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const person_id = req.params.id; 
        const response = await Person.findByIdAndDelete(person_id);

          if(!response){
                return res.status(404).json({error:'person not found'})
            }
            console.log('data deleted');
            res.status(200).json({message: 'person data deleted'})
            


    }
    catch(err){
        console.log(err);
        res.status(500).json({eoror: "Internal server error"});
        
    }
})

module.exports = router;