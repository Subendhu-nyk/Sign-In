const express=require('express')
const server=express()
const path=require('path')
const bodyParser=require('body-parser')
const sequelize=require('./util/signup')
const Sequelize = require('./models/signup')
server.use(express.json());
const cors=require('cors');
server.use(cors())
server.use(express.static(path.join(__dirname,'public')))
server.use(bodyParser.urlencoded({extended:false}))

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})

let newUserdata = {};
server.post('/user', async (req, res) => {
    try {
      
      const email = req.body.email;     
      const password=req.body.password
      
      if(email==undefined ||email.length===0|| password==undefined || password.length===0){
        return res.status(400).json({message:"Bad parameter or something is missing"})
      }      
      const data = {
        email:email,     
        password: password
      }
      newUserdata=data;    
          
      res.status(201).json({ newUserdata: data });
      console.log(data)

    } catch (err) {       
    res.status(500).json({ error:"some error", err }) 
    }
  });

  server.get('/user',async(req,res)=>{
    try{
    const allUserdata=await Sequelize.findAll();     
   
    let success = false;
    allUserdata.forEach((user) => {
      if (newUserdata.email === user.email && newUserdata.password === user.password) {
        success = true;
      }
    });

    if (success) {
      console.log("success");
      res.send('success');
    } else {
      console.log('Failure');
      res.redirect('/');
    }

    }catch(err){
        console.log('get user is failing', JSON.stringify(err))
        res.status(500).json({error:err })
    }
})


sequelize.sync().then((result)=>{
    console.log(result)
})




server.listen(3000,()=>{
    console.log('server is running')
})
