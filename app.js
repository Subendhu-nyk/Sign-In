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
server.post('/user', async (req, res) => {
    try {
      
      const email = req.body.email;     
      const password=req.body.password
      
      if(email==null ||email.length===0|| password==null || password.length===0){
        return res.status(400).json({message:"Bad parameter or something is missing"})
      }
      
      const data = {
        email:email,     
        password: password
      }

      // const data = await Sequelize.create({
      //   name: name,
      //   email:email,
      //   phone:phone,
      //   password: password,
       
      // }); 
          
      res.status(201).json({ newUserdata: data });

    } catch (err) {       
    res.status(500).json({ error:"some error", err }) 
    }
  });

  server.get('/user',async(req,res)=>{
    try{
    const user=await Sequelize.findAll();
    
    res.status(200).json({allExpenses:expenses});
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
