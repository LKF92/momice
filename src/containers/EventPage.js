import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import EventCard from "../components/EventCard";
import AttendeeList from "../components/AttendeeList";
import AttendanceForm from "../components/AttendanceForm";

// GRAPHQL REQUEST : query all the attendees of a specific event
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

export default function EventPage({ location }) {
  // We get the event.id from the params
  const params = useParams();
  // useQuery from Apollo Client to manage the query state and its response/error
  const { data, loading, error } = useQuery(ALL_ATTENDEES, {
    variables: { eventID: params.id }
  });
  if (loading) return <p> ...loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.mainBloc}>
        <div style={styles.bloc}>
          {/* We retrieved the state corresponding to the event details thanks to the <Link /> component.
      By doing so, we avoid fetching data we had on the previous page*/}
          <EventCard {...location.state} isButton={false} isDetailed={true} />
        </div>
        <div style={styles.bloc}>
          <AttendeeList data={data} />
        </div>
      </div>
      <div style={styles.formSection}>
        {/* We pass in the eventID to the form component to be able to link the new user to this event */}
        <AttendanceForm eventID={location.state.id} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px 20px",
    width: "100%"
  },
  mainBloc: {
    display: "flex",
    marginBottom: "30px",
    paddingBottom: "30px",
    borderBottom: "1px solid lightgrey"
  },
  bloc: {
    width: "30%"
  },
  formSection: {
    width: "100%"
  }
};
