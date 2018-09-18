    // I AM USING EXPRESS AS MY MAIN SERVER HANDLER
    var app = require('express')(),
        // USING BODY PARSER FOR MY API REQUEST MIDDLEWARE
        bp = require('body-parser'),
        // MONGOOSE FOR MY ORM AND MONGODDB CONNECTION
        mongoose = require('mongoose'),
        // IMPORTING THE PATH MODULE TO ASSIST WITH SERVING STATIC FILES
        path = require('path'),
        // IMPORTING THE DATABASE MODEL 
        item = require('./itemModel.js'),
        // USING AXIOS FOR MY HTTP SOLUTION
        axios = require('axios')

    // --- CONNECTING TO MONGODB ---
    /*
        Your connection will use this format =>
        db.connect('mongodb://User:Password@LocalHost:Port/Collection')
    */
    mongoose.connect('mongodb://localhost:27017/lvsf')

    // CHECK FOR DATABASE DATA
    item.find({}).exec((err, data) => {
        if (err) throw err
        // IF DATA DOES NOT EXIST
        if (data.length <= 0 || !data.length) {
            // CALL HACKER NEWS DATA
            axios
                .get('http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=50')
                .then((response) => {

                    // CACHE ITEMS IN TO A ARRAY
                    var news = response.data.hits

                    // FOR EACH ITEM IN NEWS ARRAY
                    for (var x = 0; x < news.length; x++) {

                        // INSTANTIATE NEW ITEM & POPULATE IT WITH REQUEST DATA
                        var newItem = new item({
                            id: news[x].objectID,
                            title: news[x].title,
                            user: news[x].author,
                            time: news[x].created_at_i,
                            time_ago: news[x].created_at,
                            comments_count: news[x].num_comments,
                            type: 'Item',
                            url: news[x].url,
                            domain: news[x].url,
                            points: news[x].points
                        })

                        // SAVE NEW ITEM TO THE DATABASE
                        newItem.save((err, theItem) => {
                            console.log('Item ' + theItem.id + ' has been saved to the database.')
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })

    // ALLOW FOR THE PARSING OF URL/HTTP BASED DATA
    app.use(bp.urlencoded({
        extended: false
    }))

    // ALLOW FOR THE PARSING OF JSON OBJECTS IN HTTP REQUEST
    app.use(bp.json())

    // ALLOW CROSS ORIGIN HTTP REQUEST
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // CHECK FOR 

    // --- SETTING UP ROUTES ---
    app

        .get('', (req, res) => {


            // SERVER FRONT END FILES
        
            res.send({status: true});
        

        })

        /*
            ==================
                API SET UP
            ==================
        */

        // GET RESULTS FROM DATABASE
        .get('/search/:search', (req, res) => {

            // CACHE LOCAL VARIABLE FOR SHORT HAND REFFERENCING
            var s = req.params.search

            // IF THE PARAM IS EMPTY
            if (s == '' || s == undefined || s == null) {

                // SEND BACK EMPTY ARRAY
                res.send([]);

            } else {

                // USE MODEL TO ACCESS DATABASE
                item.find()
                    // THE "AND" OPERATOR ALLOWS FOR MULTIPLE RESULTS
                    .and({
                        // THE OR OPERATOR CHECKS MULTIPLE FIELDS
                        $or: [
                            {
                                user: new RegExp(s, 'ig')
                            }, {
                                title: new RegExp(s, 'ig')
                            }, {
                                url: new RegExp(s, 'ig')
                            }
                    ]
                    })
                    // EXECUTE THE CALL
                    .exec((err, items) => {
                        // RETURN FOUND ITEMS
                        res.send(items);
                    })
            }
        })

        // CREATE NEW ITEM IN DATABASE
        .post('/create', (req, res) => {

            // INSTANTIATE NEW ITEM & POPULATE IT WITH REQUEST DATA
            var newItem = new item(req.body)
            // SAVE NEW ITEM TO THE DATABASE
            newItem.save((err, theItem) => {
                res.send(theItem)
            })

        })

        // DELETE SPECIFIC ITEM IN DATABASE
        .delete('/:id', (req, res) => {

            // USING URL STRING, FIND AND REMOVE ITEM
            item.findOneAndRemove({
                id: req.params.id
            }, (err) => {

                if (err) res.send(err);

                // RETURN A STATUS OF TRUE
                res.send({
                    status: true
                });

            })


        })

        // RUN APPLICATION ON PORT 5000
        .listen(5000, () => {
            console.log('The server is running on port 5000 :3')
        })
