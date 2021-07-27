import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme =>({
    footer: {
        position: "absolute",
        left: 0,
        textAlign: "center",
        width: '100%',
        height: '50px',
        background: '#0F0223',
        marginTop: 30,
    }
}))
export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Typography variant="title">© 2021 Codby.  All rights reserved.</Typography>
        </div>
    )
}
