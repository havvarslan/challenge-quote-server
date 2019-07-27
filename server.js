const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load the quotes JSON
const Quotes = require("./quotes.json");
const lodash = require('lodash');


const cors = require('cors');
app.use(cors());


// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)


app.get("/", function(request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

app.get("/quotes", (req,res)=>{
  console.log("quotes")
  res.send(Quotes)
});

app.get("/quotes/random", (req,res)=>{
  var randomQuotes = pickFromArray(Quotes)
  console.log(randomQuotes)
  res.send(randomQuotes)
});

// app.get("/quotes/search", (req,res)=>{
//   console.log(req.query.search);
//   if(req.query.search){ //check the query string has something
//     let searchResults = Quotes.filter(o => o.quote.author.toLowerCase().includes(req.query.search.toLowerCase()) 
//     || o.quote.toLowerCase().includes(req.query.search.toLowerCase())) //check quotes match with query string
//     if(searchResults.length === 0){ //if the result is empty array which means there is no match
//       res.send("Not found") //return not found if query string doesnt match with any quotes
//        }else {
//         res.send(searchResults) //return not found if the query string doesnt have anything
//          }
//           }else {
//     res.send("Not found") //if there is nothing in query string
//   }
// });

app.get('/quotes/search', (request, response)=>{
  if(request.query.search === undefined){
    response.send("Not Found")
  }else {
    let searchedQuote = Quotes.filter(quote => quote.author.toLowerCase().includes(request.query.search.toLowerCase()) 
    || quote.quote.toLowerCase().includes(request.query.search.toLowerCase()) )

    if(searchedQuote.length === 0){
      response.send({
        Message:"No Result FOUND"
      })
    }else{
      response.send(searchedQuote)
    }
  
  }
})

// app.get("/quotes/search", (req, res) => {
//   if (req.query.term) {
//     const term = req.query.term.toUpperCase();
//     const quotesList = Quotes.filter(quote => {
//       return (
//         quote.quote.toUpperCase().includes(term) ||
//         quote.author.toUpperCase().includes(term)
//       );
//     });
//     res.json(quotesList);
//   } else {
//     res.send("there is an error");
//   }
// });


function pickFromArray(arr) {
  // return arr[Math.floor(Math.random() * arr.length)];
   return lodash.sample(arr)
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
