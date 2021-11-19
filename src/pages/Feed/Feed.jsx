import React, { useState } from 'react';
import Header from "../../components/Header/Header"
import PostFeed from "../../components/PostFeed/PostFeed"
import PostForm from "../../components/PostForm/PostForm"
import * as postsApi from '../../utils/postApi'

export default function Feed(props){  

    const [posts, setPosts] = useState([])


    async function handleAddPost (post){
     
        const data = await postsApi.create(post);
        
        console.log(data, 'data')

        setPosts([data.post, ...posts])
      }



      

    return (
        <>
        <Header />
        <PostForm handleAddPost={handleAddPost}/>
        <PostFeed />
        </>
    )
}