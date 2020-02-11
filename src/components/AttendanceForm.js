import React, { useState } from "react";
// import { useQuery, useMutation } from "@apollo/react-hooks"; >>> Didn't work
import { Mutation } from "@apollo/react-components"; // Used this instead...
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GenderSelect from "../components/GenderSelect";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  }
}));

// GRAPHQL MUTATIONS
const NEW_USER = gql`
  mutation NewUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $birthday: String!
    $gender: String!
    $hobbies: String!
  ) {
    newUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      birthday: $birthday
      gender: $gender
      hobbies: $hobbies
    ) {
      firstName
      id
    }
  }
`;

export default function AttendanceForm({ setNewUser }) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // TODO check that email is unique in DB
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hobbies, setHobbies] = useState("");
  //   const [newUser, newUserResponse] = useMutation(NEW_USER, { ignoreResults: false }) >>> didn't work
  //   const [newAttendee, newAttendeeResponse] = useMutation(NEW_ATTENDEE, { ignoreResults: false })

  //   const handleFormWithHooks = async event => {
  //     event.preventDefault();
  //     await newUser({
  //       variables: { firstName, lastName, email, gender, birthday, hobbies, newUser },
  //       ignoreResults: false // see below
  //       onCompleted: data => newAttendee({ variables: { eventID: eventID, userID: data.newUser.id }})
  //     });
  //    console.log(newUserResponse); // when using the useMutation hook, the response prop was indicating that :
  //    {called: false, loading: false} so I cannot access the data sent back from the server even though the user
  //    is created in the database...
  //    more info about the bug >>> https://github.com/apollographql/react-apollo/issues/3250
  //   };

  return (
    <Mutation mutation={NEW_USER} onCompleted={data => setNewUser(data.newUser.id)}>
      {(newUser, response) => {
        if (response.called) console.log("response from mutation:", response);
        return (
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              newUser({
                variables: { firstName, lastName, email, gender, birthday, hobbies }
              });
            }}
          >
            <div style={{ display: "flex" }}>
              <TextField
                error={firstName ? false : true}
                id="filled-error"
                label="First Name "
                placeholder="John"
                variant="filled"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                error={lastName ? false : true}
                id="filled-error-helper-text"
                label="Last Name"
                placeholder="Doe"
                helperText="Incorrect entry."
                variant="filled"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <TextField
                error={email ? false : true}
                required
                id="outlined-error"
                placeholder="your@email.com"
                label="Email"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <GenderSelect gender={gender} setGender={setGender} />
              <TextField
                error={birthday ? false : true}
                id="outlined-error-helper-text"
                label="Birthday"
                placeholder="DD/MM/YYYY"
                required
                variant="outlined"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
              <TextField
                error={hobbies ? false : true}
                id="outlined-multiline-static"
                label="Hobbies"
                placeholder="Cinema, Music, Biking, Fishing, etc"
                multiline
                rows="4"
                variant="outlined"
                required
                value={hobbies}
                onChange={e => setHobbies(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outlined" color="primary">
              Validate
            </Button>
          </form>
        );
      }}
    </Mutation>
  );
}
