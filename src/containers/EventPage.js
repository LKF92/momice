import React, { useState } from "react";
import EventCard from "../components/EventCard";
import AttendeeList from "../components/AttendeeList";
import AttendanceForm from "../components/AttendanceForm";

export default function EventPage({ location }) {
  // We get the event.id from the params

  // // useQuery from Apollo Client to manage the query state and its response/error
  // const { data, loading, error } = useQuery(ALL_ATTENDEES, {
  //   variables: { eventID: params.id }
  // });

  // We'll share the newly created user from <AttendanceForm /> to <AttendeeList />
  // to update the attendee list and to keep one mutation per component
  const [newUser, setNewUser] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.mainBloc}>
        <div style={styles.bloc}>
          {/* We retrieved the state corresponding to the event details thanks to the <Link /> component.
      By doing so, we avoid fetching data we had on the previous page*/}
          <EventCard {...location.state} isButton={false} isDetailed={true} />
        </div>
        <div style={styles.bloc}>
          <AttendeeList eventID={location.state.id} newUser={newUser} setNewUser={setNewUser} />
        </div>
      </div>
      <div style={styles.formSection}>
        {/* We pass in the eventID to the form component to be able to link the new user to this event */}
        <AttendanceForm setNewUser={setNewUser} />
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
