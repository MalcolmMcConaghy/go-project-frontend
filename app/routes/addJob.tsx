import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function addJob() {
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          company,
          status,
        }),
      });
      if (res.status === 200) {
        setSubmittedSuccessfully(true);
      }
    } catch (error) {
      console.log(error);
      setSubmitError(true);
    }
    setTitle("");
    setCompany("");
    setStatus("applied");
  };
  return (
    <>
      <Link href="/" underline="hover" fontSize={14}>
        Home
      </Link>
      <Typography variant="h4" component="h1" my={2}>
        Add job
      </Typography>
      {submittedSuccessfully && (
        <Typography variant="h5" component="h2" gutterBottom>
          Job added successfully!
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} my={4}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <TextField
            id="company"
            label="Company"
            variant="outlined"
            fullWidth
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="applied">Applied</MenuItem>
              <MenuItem value="interviewing">Interviewing</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Add job
          </Button>
        </Stack>
      </form>
    </>
  );
}
