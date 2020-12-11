import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

function PrivateRoute({component: Component, ...rest}){
    const [{user}] = useStateValue()
    return(
        <Route {...rest} render={(props) => (
            user?.email !== null
              ? <Component {...props} />
              : <Redirect to='/signin' />
          )} />
    )
}

export default PrivateRoute
