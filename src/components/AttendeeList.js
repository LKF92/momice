import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Mutation } from "@apollo/react-components";
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

// GRAPHQL REQUEST and MUTATIONS : query all the attendees of a specific event
const ALL_ATTENDEES = gql`
  query getAttendees($eventID: ID!) {
    allAttendees(eventID: $eventID) {
      id
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default function AttendeeList({ eventID, newUser, setNewUser }) {
  const classes = useStyles();

  // useQuery from Apollo Client to get the list of attendees
  const { data, loading, error } = useQuery(ALL_ATTENDEES, {
    variables: { eventID: eventID }
  });
  if (loading) return <p> ...loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

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
