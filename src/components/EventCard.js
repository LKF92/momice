import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import colors from "../colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "300px",
    maxHeight: 300,
    marginRight: "10px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  btn: {
    backgroundColor: colors.yellow
  }
});

export default function EventCard({
  id,
  date,
  title,
  location,
  description,
  isButton,
  isDetailed
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {isDetailed && <Typography component="h2">DATE :</Typography>}
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {date}
        </Typography>
        {isDetailed && <Typography component="h2">EVENT TITLE :</Typography>}
        <Typography className={classes.pos} color="textSecondary">
          {title}
        </Typography>
        {isDetailed && <Typography component="h2">DESCRIPTION :</Typography>}
        <Typography className={classes.pos} color="textSecondary">
          {description}
        </Typography>
        {isDetailed && <Typography component="h2">LOCATION :</Typography>}
        <Typography variant="body2" component="p">
          {location}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        {isButton && (
          <Button className={classes.btn} size="small">
            {/*  Redirect to the form registration page */}
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={{ pathname: "/event/" + id, state: { id, date, title, location, description } }}
            >
              Register
            </Link>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
