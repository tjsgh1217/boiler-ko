import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';



function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const onEmailHandler = (event) => {

    setEmail(event.currentTarget.value)
  }

  const onpasswordHandler = (event) => {
    setpassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); 

    let body = {
      email: Email,
      password: password
    }

    dispatch(loginUser(body))
    .then (response => {
      if(response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert('Error"')
      }
    })
  }


    return (
        <div style ={{
           display: 'flex', justifyContent: 'center' , alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

           <form style={{ display: 'flex', flexDirection:'column' }}
              onSubmit={onSubmitHandler}
           >
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />
              <label>Password</label>
              <input type="password" value={password} onChange={onpasswordHandler} />
              <br />
              <br />
              <button>
                  Login
              </button>
           </form>
       </div>
    )
} 

export default withRouter(LoginPage)
