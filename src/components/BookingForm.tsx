import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid";
import React from "react";
interface BookingFormProps {
  onSubmit: Function;
  setQuery: Function;
}
const BookingForm = ({ onSubmit, setQuery }: BookingFormProps) => {
  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    setQuery((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Paper sx={{ my: 2, p: 2 }}>
      <Grid container>
        <TextField
          placeholder="From"
          name="dateFrom"
          type="date"
          onChange={handleInput}
        />
        <TextField
          placeholder="To"
          name="dateTo"
          type="date"
          onChange={handleInput}
        />
        <Button variant="outlined" size="large" onClick={(e) => onSubmit(e)}>
          Search
        </Button>
      </Grid>
    </Paper>
  );
};

export default BookingForm;
