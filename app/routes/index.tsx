import * as React from "react";
import { type MetaFunction } from "@remix-run/node";
import Typography from "@mui/material/Typography";
import Job from "~/src/components/Job";
import { Box, Button, Stack } from "@mui/material";
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
  const res = await fetch("http://127.0.0.1:5000/get-jobs?limit=5");
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
      <Stack
        direction="row"
        alignItems="center"
        my={4}
        justifyContent="center"
        spacing={1}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/addJob");
          }}
        >
          Add job
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/viewJobs");
          }}
        >
          View all jobs
        </Button>
      </Stack>

      <Box my={4}>
        <Typography variant="body1" gutterBottom ml={1}>
          Heres your latest job updates
        </Typography>
        {jobs?.map((job: any) => {
          return (
            <Job
              key={job.id}
              id={job.id}
              title={job.Title}
              company={job.Company}
              status={job.Status}
              createdAt={new Date(job.CreatedAt)}
              lastUpdatedAt={new Date(job.UpdatedAt)}
            />
          );
        })}
      </Box>
    </React.Fragment>
  );
}
