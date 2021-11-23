import tokenService from './tokenService';


const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',

    body: user
  })
  .then(res => {
    if (res.ok) { return res.json()}
    else {
      throw new Error(res);
    }
    
  })
 
  .then(({token}) => tokenService.setToken(token))
  .then(()=> {
    console.log("wowowowowow")
    return true
  
  })
  .catch(err => {
    console.log(err)
    return err
  })

}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error(res);
  })

  .then(({token}) => tokenService.setToken(token))
  .catch(err => {
    console.log(err)
    return err
  }

  )
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
      }
  }).then(res => {
    if(res.ok) return res.json()
    throw new Error('Bad Credentials') // <- this is what gets sent to the catch block when we call the function
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};