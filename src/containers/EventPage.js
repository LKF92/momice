import React, { useState } from "react";
import EventCard from "../components/EventCard";
import AttendeeList from "../components/AttendeeList";
import AttendanceForm from "../components/AttendanceForm";

export default function EventPage({ location }) {
  const [refresh, setRefresh] = useState(0);
  return (
    <div style={styles.container}>
      <div style={styles.mainBloc}>
        <div style={styles.bloc}>
          {/* We retrieved the state corresponding to the event details thanks to the <Link /> component.
      By doing so, we avoid fetching data we had on the previous page*/}
          <EventCard {...location.state} isButton={false} isDetailed={true} />
        </div>
        <div style={styles.bloc}>
          <AttendeeList eventID={location.state.id} />
        </div>
      </div>
      <div style={styles.formSection}>
        {/* We pass in the eventID to the form component to be able to link the new user to this event */}
        <AttendanceForm {...location.state} setRefresh={setRefresh} />
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
