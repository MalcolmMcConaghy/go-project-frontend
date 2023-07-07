import * as React from "react";
import { type MetaFunction } from "@remix-run/node";
import Typography from "@mui/material/Typography";
import Job from "~/src/components/Job";
import { Box, Button, Link, Stack } from "@mui/material";
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

  return (
    <React.Fragment>
      <Link href="/" underline="hover" fontSize={14} ml={1}>
        Home
      </Link>
      <Typography variant="h4" component="h1" my={2} ml={1}>
        All jobs
      </Typography>
      <Box my={4}>
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
