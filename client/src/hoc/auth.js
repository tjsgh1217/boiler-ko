import React, { useEffect } from   'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


export default function ( SpecificComponment, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const dispatch =useDispatch();
 
        useEffect(() => {

            dispatch(auth()).then(response => {


                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                     if(adminRoute && !response.payload.isAdmin) {
                    props.history.push('/')
                } else {
                    if(option === false)
                    props.history.push('./')
                
                }

                }
                
            })

                Axios.get('/api/users/auth')
            
            
            
        }, [])    
    


        return (
            <SpecificComponment />
        )




    }





    return AuthenticationCheck
}