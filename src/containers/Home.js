import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import EventCard from "../components/EventCard";

const ALL_EVENTS = gql`
  query {
    allEvents {
      id
      date
      title
      location
      description
    }
  }
`;

export default function Home() {
  const { loading, data, error } = useQuery(ALL_EVENTS);
  if (loading) return <div>Loading…</div>;
  if (error) {
    console.log(error);
    return <div>error....</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Events : </h2>
      <div style={styles.eventList}>
        {data.allEvents.map(event => (
          <EventCard key={event.id} {...event} isButton={true} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  eventList: {
    display: "flex",
    flexFlow: "row nowrap",
    boxSizing: "border-box"
  },
  container: {
    margin: "20px 20px"
  }
};
