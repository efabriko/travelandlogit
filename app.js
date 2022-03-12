//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const articlesList = [
  {
    articleDate: '2022-03-11',
    articleTitle: 'Day 1 - Yenbuba',
    articleContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    articleGpsDataPoi1: '-0.570310, 130.657054',
    articleTimeOfPoi1: '09:49',
    articleNameOfPoi1: 'Yenbuba pier',
    articleGpsDataPoi2: '',
    articleTimeOfPoi2: '',
    articleNameOfPoi2: ''
  },
  {
    articleDate: '2022-03-12',
    articleTitle: 'Day 2 - Sauwandarek',
    articleContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    articleGpsDataPoi1: '-0.590012, 130.602324',
    articleTimeOfPoi1: '07:34',
    articleNameOfPoi1: 'Village',
    articleGpsDataPoi2: '-0.590036, 130.603140',
    articleTimeOfPoi2: '08:56',
    articleNameOfPoi2: 'Pier'
  }
];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {articlesList:articlesList});
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // console.log(req.body.articleDate);
  // console.log(req.body.articleTitle);

  const article = {
    articleDate: req.body.articleDate,
    articleTitle: req.body.articleTitle,
    articleContent: req.body.articleContent,
    articleGpsDataPoi1: req.body.gpsDataPoi1,
    articleTimeOfPoi1: req.body.timeOfPoi1,
    articleNameOfPoi1: req.body.nameOfPoi1,
    articleGpsDataPoi2: req.body.gpsDataPoi2,
    articleTimeOfPoi2: req.body.timeOfPoi2,
    articleNameOfPoi2: req.body.nameOfPoi2
  }

  // console.log(article);

  articlesList.push(article);
  // console.log(articlesList);

  res.redirect("/");

});


// Route to DELETE an item (using a POST HTTP Method... Maybe should use Delete HTTP Method instead...)
app.post("/article/delete", function(req, res){
  // We get the title of the article User wants to delete
  const deletedArticleTitle = req.body.deletedArticle;
  console.log("Article will be deleted:" + deletedArticleTitle);

  // We convert it to lower case
  const requestedArticleTitleToRemove = _.lowerCase(deletedArticleTitle);
  console.log("Title of article to be deleted: " + requestedArticleTitleToRemove)

  // We convert the requestedArticleTitleToRemove to each of the article Titles in the article Array

  var i = 0;
  articlesList.forEach(function(article) {

    // console.log(article.articleTitle);
    // console.log(_.lowerCase(article.articleTitle));

    // We convert stored article to lower case
    const storedArticle = _.lowerCase(article.articleTitle);

    console.log(storedArticle);

    if (storedArticle === requestedArticleTitleToRemove) {
      console.log("Match found!");
      console.log("This article will be removed from the List of Articles: " + article.articleTitle + " position: "+ i);
      // If there is a Match, we console log the corresponding article in order to check
      console.log("Article to be deleted: " + JSON.stringify(articlesList[i]));
      // Then we remove this Article Object from our articlesList
      const reducedArticlesList = articlesList.splice(i, 1);
      console.log(reducedArticlesList);
      } else {
        console.log("No match found!");
      };
      i++;

  });
  res.redirect("/");
});


// Thanks to express Route parameters functionalty, we create a route that allows to access parameters the User input inside the URL
// Express will create a JS Object from the parameter(s) the User will enter in the URL
app.get("/articles/:articleName", function(req, res){
  console.log("The Parameters received from the url are: " + req.params.articleName);

  articlesList.forEach(function(article) {
    console.log(article.articleTitle);
    console.log(_.lowerCase(article.articleTitle));

    const storedArticle = _.lowerCase(article.articleTitle);
    const requestedArticle = _.lowerCase(req.params.articleName) 

    if (storedArticle === requestedArticle) {
      console.log("Match found!");
      console.log(article);
      res.render("article", {article:article});
    } else {
      console.log("No match found!");
    };
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
