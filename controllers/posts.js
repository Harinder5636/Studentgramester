const Post = require('../models/post');


const BUCKET_NAME = process.env.BUCKET

module.exports = {
    create,
    index
}

function create(req, res){
    console.log(req.body, req.file, req.user)
    res.json({data: 'working'})
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){
        res.json({err})
    }
}