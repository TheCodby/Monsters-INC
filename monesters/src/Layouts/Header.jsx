import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      background: 'linear-gradient(to right, #2F1557, #694F91)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
export default function Header() {
    const classes = useStyles();

    return (
      <AppBar className={classes.root} position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Monsters INC
          </Typography>
          <IconButton>
              <AccountCircleIcon style={{color: "#8E79AE"}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
}
