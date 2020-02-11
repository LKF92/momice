import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

// Material UI styling
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  bloc: {
    width: "30%"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function AttendeeList({ data }) {
  const classes = useStyles();
  return (
    <>
      <h2>People attending the event : </h2>
      {data.allAttendees.length ? (
        <div className={classes.demo}>
          <List dense={true}>
            {data.allAttendees.map(attendee => (
              <ListItem key={attendee.id}>
                <ListItemText
                  primary={`${attendee.user.firstName} ${attendee.user.lastName}`}
                  secondary={`${attendee.user.email}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <p>There is no one attending this event yet :(</p>
      )}
    </>
  );
}
