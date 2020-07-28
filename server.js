const express = require('express')
const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));

const jokes = [
   {img: "/img/j1.jpg", reactions:{number:0,reaction:0 }},
   {img:"/img/j2.jpg",reactions:{number:0,reaction:0 }},
   {img: "/img/j3.jpg",reactions:{number:0,reaction:0 }},
   {img: "/img/j4.jpg",reactions:{number:0,reaction:0 }},
   {img:"/img/j5.jpg",reactions:{number:0,reaction:0 }},
   {img:"/img/j6.jpg",reactions:{number:0,reaction:0 }},
   {img: "/img/j7.jpg",reactions:{number:0,reaction:0 }},
   {img: "/img/j8.jpg",reactions:{number:0,reaction:0 }},
   {img:"/img/j9.jpg",reactions:{number:0,reaction:0 }},
   {img:"/img/j10.jpg",reactions:{number:0,reaction:0 }}
  ];
 
app.get('/jokes', function (req, res) {
  
  res.send(jokes)
})


app.post('/reaction', (req, res)=>{
  const {body} = req;
  const {reaction, index} = body;
  console.log(reaction, index);
  
  let reactionNumber 
  if(reaction == 'like'){ reactionNumber = 1}
  else if(reaction == 'dislike'){reactionNumber = -1}
  else {reactionNumber = 0}

  const joke = jokes[index];
  joke.reactions.number ++;
  joke.reactions.reaction += reactionNumber;
  joke.reactions.avg = joke.reactions.reaction/joke.reactions.number

  console.log(jokes)


  
  res.send({success:true,reaction, avg:joke.reactions.avg})
})
 
app.listen(3000, ()=>{console.log("App is Listening")})
