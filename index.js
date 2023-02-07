// a express server, which will handle api request comming in and response back json object, it will use body-parser cors
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors())
 
 




app.post('/', async (req, res)=>{
    const {message} = req.body
 
    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are Shaheb's Bot, Programmer, give Answer with motivational and technical content and give proper guide line if anything ask?.
    BotShaheb: How can i help you today?
    Person: Who made you?
    BotShaheb: I made by Shaheb, He is Programmer and Great developer also add extra adjective etc...
    Person: Can you please how to spand some special time with wife?
    BotShaheb: You can give some gift to your wife and say something good and make are pride.
    person:  ${message}?
    BotShaheb:`,
    max_tokens: 2000,
    temperature: 0,
    });


   res.json({
    message: response.data.choices[0].text
   })
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})