import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 185
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function GenderSelect({ setGender, gender }) {
  const classes = useStyles();

  return (
    <div>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={gender}
          onChange={e => setGender(e.target.value)}
          className={classes.selectEmpty}
          error={gender ? false : true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Non-binary">Non-binary</MenuItem>
          <MenuItem value="Prefer not to disclose">Prefer not to disclose</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
