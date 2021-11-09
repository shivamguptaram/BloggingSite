var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
mongoose.connect('mongodb+srv://shivamgupta_ram:Mukti%4015feb@shivamgupta.lwygp.mongodb.net/BlogTesting')
.catch((error)=>{
    console.log("error in mongo",error);
});
const Blog = mongoose.model('Blog',{
    title: { type: String },
    description: { type: String },
    date : { type: String }
});



// const User = mongoose.model('User',{
//     name: { type: String },
//     age: { type: Number }
// });
  
// var new_user = new User({
//     name: 'Manish',
//     age:34
// })
  
// new_user.save(function(err,result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log(result)
//     }
// });

function UploadDataInMongodb(title_data,descr_data,date_data)
{
    console.log(title_data,descr_data,date_data);
    var new_blog = new Blog({
    title:title_data,
    description:descr_data,
    date:date_data
})
  
new_blog.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
});


}

// index page
app.get('/', function(req, res) {
    Blog.find((err, docs) => {
        if (!err) {
            console.log(docs[0]);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
        res.render('Home',{data:docs});

    });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.post('/save',async(req,res)=>{
    console.log("Title",req.body.Title);
    console.log("Desc",req.body.Description);
    console.log("Date_type",typeof(req.body.Date));
    console.log("Date",req.body.Date);
    await UploadDataInMongodb(req.body.Title,req.body.Description,req.body.Date)
    res.redirect('/');
    // console.log(req.body);
    // console.log("Title",req.body.Title);


});
app.listen(8080);
console.log('Server is listening on port 8080');