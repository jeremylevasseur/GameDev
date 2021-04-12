import React from 'react';
import { Spring } from 'react-spring/renderprops';

export default function Title() {
    return (
        <Spring from={{ opacity: 0, marginTop: -500 }} to={{ opacity: 1, marginTop: 10 }}>
            {props => (
                <div style={props}>
                    <div style={titleStyle}>
                        <img src={process.env.PUBLIC_URL + '/iTAD_Logo.png'} style={websiteImage}/> 
                    </div>
                </div>
            )}
        </Spring>

    )
}

const websiteImage = {
    height: '200px',
    maxWidth: '500px'
}

const titleStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    textAlign: 'center',
    padding: '10px',
    color: '#910D14',
    fontSize: '4em',
    fontWeight: 'bold',
    marginBottom: '2%'
}
