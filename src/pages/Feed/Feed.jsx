import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header"
import PostFeed from "../../components/PostFeed/PostFeed"
import PostForm from "../../components/PostForm/PostForm"
import * as postsApi from '../../utils/postApi'
import { Grid } from "semantic-ui-react";


export default function Feed(props){  

    const [posts, setPosts] = useState([])


    async function handleAddPost (post){
        try{
            const data = await postsApi.create(post);
            console.log(data, 'response from server in handleAddPost')
            setPosts([data.post, ...posts])
        } catch(err){
            console.log(err)
        }
    }


    async function getPosts(){

        try {
          const data = await postsApi.getAll();
          setPosts([...data.posts])
        } catch(err){
          console.log(err, ' this is the error')
        }
      }
    
      useEffect(() => {
        getPosts()
      }, []);
    
      
        return (
          <Grid centered >
            <Grid.Row>
              <Grid.Column>
                <Header />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ maxWidth: 1000 }}>
                <PostForm handleAddPost={handleAddPost}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column style={{ maxWidth: 1000 }}>
              <PostFeed posts={posts} />
            </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }