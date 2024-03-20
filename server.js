const Post = require('./modele/post')
require('dotenv').config()
const Comment = require('./modele/comment')
const connectDB = require('./config/db')
const express = require('express');

const cors = require('cors');
const app = express();
app.use(express.json()); // Parse incoming JSON data

// Configuration CORS avec des options spécifiques
const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  // Utiliser le middleware cors avec les options spécifiques
  app.use(cors(corsOptions));

// Utiliser le middleware cors pour toutes les routes
app.use(cors());

// API posts
//somme des prix

app.get('/posts/price/sum', async (req, res) => {
    try {
        connectDB()
        const totalPrices = await Post.aggregate([
            { $match: { price: { $exists: true } } }, // Filter for documents with existing price
            { $group: { _id: null, totalPrice: { $sum: '$price' } } }, // Group and sum prices
          ]);
        if (!totalPrices) {
            return res.send([]);
        }
        res.json({"total":totalPrices}); // Send prices total as JSON response
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
});

//detail
app.get('/posts/:id', async (req, res) => {
    try {
        connectDB()
        const posts = await Post.findById(req.params.id).populate('comments')
        if (posts.length === 0) {
            return res.send([]);
        }
        res.json(posts); // Send the list of posts as JSON response
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
});
//récupération
app.get('/posts', async (req, res) => {
    try {
        connectDB()
        const posts = await Post.find().populate('comments')
        if (posts.length === 0) {
            return res.send([]);
        }
        res.json(posts); // Send the list of posts as JSON response
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
});
// Ajout
app.post('/posts', async (req, res) => {
    try {
        connectDB()        
        // Création d'un nouveau post
        entry = req.body.entry
        categories = req.body.categories
        price = req.body.price
        const newPost = new Post({
            entry,
            categories,
            price
        });
        //Enregistrement du post dans la base de données
        await newPost.save();
        if (newPost) {
            res.status(201).json(newPost); // Created status code
        } else {
            res.status(400).send('Bad request'); // Validation error
        }
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).send('Internal Server Error');
    }
});
//Mise à jour
app.put('/posts', async (req, res) => {
    try {
        connectDB()   
        const post = await Post.findOne({ _id: req.body._id })

        if (req.body.entry) {
			post.entry = req.body.entry
		}

		if (req.body.categories) {
			post.categories = req.body.categories
		}

        if (req.body.comments) {
			post.comments = req.body.comments
		}

        if (req.body.price) {
			post.price = req.body.price
		}

        
        //Enregistrement du post dans la base de données
        await post.save();
        res.send(post)
       
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).send('Internal Server Error');
    }
});
//supression
app.delete("/posts", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.body._id })
		res.status(204).send()
	} catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Internal Server Error');
    }
})
// API comments
// ajouter
app.post('/comments', async (req, res) => {
    try {
        connectDB()        
        // Création d'un nouveau comment
        comment_text = req.body.comment_text
        const newComment = new Comment({
            comment_text
        });
        //Enregistrement du comment dans la base de données
        await newComment.save();
        if (newComment) {
            res.status(201).json(newComment); // Created status code
        } else {
            res.status(400).send('Bad request'); // Validation error
        }
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Internal Server Error');
    }
});
// récupérer
app.get('/comments', async (req, res) => {
    try {
        connectDB()
        const comments = await Comment.find()
        if (comments.length === 0) {
            return res.send([]);
        }
        res.json(comments); // Send the list of comments as JSON response
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
});
//detail
app.get('/comments/:id', async (req, res) => {
    try {
        connectDB()
        const comments = await Comment.findById(req.params.id)
        if (comments.length === 0) {
            return res.send([]);
        }
        res.json(comments); // Send the list of comments as JSON response
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
});
//Mise à jour
app.put('/comments', async (req, res) => {
    try {
        connectDB()   
        const comment = await Comment.findOne({ _id: req.body._id })

        if (req.body.comment_text) {
			comment.comment_text = req.body.comment_text
		}
        
        //Enregistrement du comment dans la base de données
        await comment.save();
        res.send(comment)
       
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Internal Server Error');
    }
});
//supression
app.delete("/comments", async (req, res) => {
	try {
		await Comment.deleteOne({ _id: req.body._id })
		res.status(204).send()
	} catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).send('Internal Server Error');
    }
})

port = (process.env.PORT || 3000)

app.listen(port, () => {
    console.log('Serveur Express en écoute sur le port '+port);
});