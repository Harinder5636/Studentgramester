import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";



function PostCard({post, isProfile }) { 

 
  return (
    <Card key={post._id} raised>
        {isProfile ? (
            ""
        ) : (
   
      <Card.Content textAlign='left'>
          <Card.Header>
              <Link to={'/${post.user.username}'}>
          <Image
              size='large'
              avatar
              src={
                  post.user.photoUrl 
                  ? post.user.photoUrl 
                  : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
                }
          />
          {post.user.username}
          </Link>
          </Card.Header> 
          {post.user.school}
      </Card.Content>
        )}
  
  
      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={'right'}>
        <Icon name={'heart'} size='large' color={'grey'} />
        {post.likes.length} Likes
          
      </Card.Content>
    </Card>
  );
}

export default PostCard;