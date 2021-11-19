const Post = require('../models/post');

const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();







const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){

            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});

            console.log(post)
            res.status(201).json({post: post})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){
        res.json({err})
    }
}