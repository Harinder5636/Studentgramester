import React, { useState, useEffect } from 'react';
import {  Grid } from 'semantic-ui-react';
import Loading from "../../components/Loader/Loader";
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from "../../components/PostFeed/PostFeed";
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from "../../utils/userService";
import * as likesApi from '../../utils/likesApi'


export default function ProfilePage(props){

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const { username } = useParams();

    useEffect(() => {
    
        getProfile()
    }, [username]);


    async function getProfile() {
        try {

            const data = await userService.getProfile(username)
            console.log(data, 'data object in the profile')
            setPosts(data.posts)
            setUser(data.user)
            setLoading(false)

        } catch(err){
            // console.log(err, "error in profile page ")
            setError(err.message);
        }
    }


    async function addLike(postId){
        try {
            const data = await likesApi.create(postId);
            console.log(data, ' <- this is data the response from likes create')
            getProfile()
  
        } catch(err){
            console.log(err)
            setError(err.message)
        }
    }
  
    async function removeLike(likesId){
      try {
          const data = await likesApi.removeLike(likesId);
          console.log(data, ' <- this is data the response from likes delete')
          getProfile()
  
      } catch(err){
          console.log(err)
          setError(err.message)
      }	
    }




    if(error){
        return <ErrorMessage error={error} />;
    }

    if(loading){
        return <Loading />;
        }



    
    return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileBio user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 750 }}>
                        <PostFeed 
                        isProfile={true} 
                        posts={posts} 
                        numPhotosCol={2} 
                        user={props.user}
                        addLike={addLike}
                        removeLike={removeLike}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>     
    );
}