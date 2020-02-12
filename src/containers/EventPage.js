import React from "react";
import EventCard from "../components/EventCard";
import AttendeeList from "../components/AttendeeList";
import AttendanceForm from "../components/AttendanceForm";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

export default function EventPage({ location }) {
  // useQuery from Apollo Client to get the list of attendees
  const { data, loading, error } = useQuery(ALL_ATTENDEES, {
    variables: { eventID: location.state.id }
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
          <AttendeeList eventID={location.state.id} data={data} />
        </div>
      </div>
      <div style={styles.formSection}>
        {/* We provide ALL_ATTENDEES in props to refetch and refresh the attendees list once the form is filled  */}
        <AttendanceForm {...location.state} queryToRefetch={ALL_ATTENDEES} />
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
