import React, { useState, useEffect } from 'react';
import {  Grid } from 'semantic-ui-react'
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfilePostDisplay from '../../components/ProfilePostDisplay/ProfilePostDisplay';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from "../../utils/userService";

export default function ProfilePage(){

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const { username } = useParams();


    async function getProfile() {
        try {

            const data = await userService.getProfile(username)
            console.log(data, 'data object in the profile')
            setPosts(data.posts)
            setUser(data.user)
            setLoading(false)

        } catch(err){
            // console.log(err, "error in profile page ")
            setError("Profile doesn't exist")
        }
    }

    useEffect(() => {
        getProfile()
    }, []);





    if(loading){
        return(
            <>
                <Header />
                <h1> Loading............</h1>
            </>
        )
        }

    if(error){
        return(
                <>
                    <Header />
                    <ErrorMessage error={error} />
                </>
            )
            }

    
    return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    <Header />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileBio user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column style={{ maxWidth: 750 }}>
                        <ProfilePostDisplay />
                    </Grid.Column>
                </Grid.Row>
            </Grid>     
    )
}