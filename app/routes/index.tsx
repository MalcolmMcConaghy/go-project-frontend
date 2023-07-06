import * as React from "react";
import { type MetaFunction } from "@remix-run/node";
import Typography from "@mui/material/Typography";
import Job from "~/src/components/Job";
import { Box, Button } from "@mui/material";
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { useNavigate } from "react-router-dom";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Job search tracker",
    description: "Keep track of your job search here!",
  };
};

export async function loader() {
  const res = await fetch("http://127.0.0.1:5000/get-jobs");
  return json(await res.json());
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const jobs = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Job search tracker
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        Keep track of job applications by simply adding the job title, company
        and status
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
        onClick={() => {
          navigate("/addJob");
        }}
      >
        <Button variant="contained">Add job</Button>
      </Box>
      <Box my={4}>
        <Typography variant="body1" gutterBottom ml={1}>
          Heres your latest job updates
        </Typography>
        {jobs.map((job: any) => {
          return (
            <Job
              key={job.Title + job.Company}
              title={job.Title}
              company={job.Company}
            />
          );
        })}
      </Box>
    </React.Fragment>
  );
}
