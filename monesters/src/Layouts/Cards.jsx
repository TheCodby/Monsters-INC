import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import Sulley from '../Static/Monsters/Sulley.jpeg'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, #492E74, #694F91)',
        marginTop: '100px',
        alignItems: 'center',
    },
    card: {
        background: '#694F91',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
    },
  }),
);
function GetCards() {
    const [results, setMonsters] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const classes = useStyles();
    const monsters = [];
    useEffect(() => {
        fetch("http://localhost:3001/api")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setMonsters(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      for(var i in results)
        monsters.push(results[i]);
    console.log(monsters[0])
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <React.Fragment>
                {monsters.map(data => (
                    <Grid item sm={4}>
                    <Card className={classes.card} key={data.monster_id}>
                            <CardHeader 
                                title={data.name}
                                style={{ textAlign: 'center', color: '#fff'}}
                                
                            />
                            <CardMedia
                                className={classes.media}
                                image = {Sulley}
                                title={data.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {data.text}
                                </Typography>
                            </CardContent>
                        <CardActions>
                            <Grid container justify="space-between" spacing={12}>
                                <Grid item>
                                    <IconButton>
                                        <ThumbDownIcon style={{color: "#8E79AE"}}/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <ThumbUpIcon style={{color: "#8E79AE"}}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </React.Fragment>
        );
    }
}
export default function Cards() {
    const classes = useStyles();
    return (
        <Paper className={classes.root} elevation={3} style={{paddingLeft: "30px", paddingRight: "30px"}}>
            <Grid container spacing={3}>
                {GetCards()}
            </Grid>
        </Paper>
    )
}
