import React, { useState, useEffect } from 'react';
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PostFeed from "../../components/PostFeed/PostFeed"
import PostForm from "../../components/PostForm/PostForm"
import * as postsApi from '../../utils/postApi'
import { Grid } from "semantic-ui-react";


export default function Feed(props){  

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    async function handleAddPost (post){
        try{
            setLoading(true);
            const data = await postsApi.create(post);
            console.log(data, 'response from server in handleAddPost')
            setPosts([data.post, ...posts])
            setLoading(false);
        } catch(err){
            setError(err.message);
            console.log(err)
            setError(err.message)
        }
    }





    async function getPosts(){

        try {
            setLoading(true);
          const data = await postsApi.getAll();
          setPosts([...data.posts])
          setLoading(false);
        } catch(err){
            setError(err.message);
          console.log(err, ' this is the error')
        }
      }
    
      useEffect(() => {
        getPosts()
      }, []);



    if(error){
        return <ErrorMessage error={error} />;
    }

    if(loading){
        return <Loader />;
        }
    
      
        return (
          <Grid centered >
            <Grid.Row>
              <Grid.Column style={{maxWidth: 450 }}>
                  <PostForm handleAddPost={handleAddPost} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column style={{ maxWidth: 1000 }}>
              <PostFeed 
              posts={posts}
              isProfile={false}
              numPhotoCol={1}
              loading={loading}
              />
            </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }