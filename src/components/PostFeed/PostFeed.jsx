import React from 'react';
import { Card  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';


export default function PostFeed({posts}){

    return (
        <Card.Group itemsPerRow={2} stackable>
           
                {posts.map((post) => {
                return ( 
                        <PostCard 
                            post={post} 
                            key={post._id} 
                            />
                    );
                })}
        </Card.Group>
  
    )
}