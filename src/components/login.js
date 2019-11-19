import React, { useState, useContext } from 'react'
import { Auth } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'
import { Link } from 'gatsby'

import { Box, Button, Layer } from 'grommet'

import { UserContext } from '../context/user-context'

export default () => {
    const [show, setShow] = useState(false)

    const { loggedIn, setLoggedIn, handleLogout } = useContext(UserContext)

    if (loggedIn) {
        return (
            <div>
                <Link to="/account">Acccount info</Link>
                <button onClick={() => Auth.signOut().then(() => handleLogout())}>logout</button>
            </div>
        )
    }

    return (
        <Box>
            <Button label="login" onClick={() => setShow(true)} />
            {show && (
                <Layer position="right" full="vertical"
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                >
                    <Authenticator
                        onStateChange={authState => {
                            authState === 'signedIn' && setLoggedIn(true)
                        }}
                    />
                </Layer>
            )}
        </Box>
    )
}