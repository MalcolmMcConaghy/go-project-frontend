import { Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "@remix-run/react";

const Job = ({
  id,
  title,
  company,
  status,
  createdAt,
  lastUpdatedAt,
}: {
  id: string;
  title: string;
  company: string;
  status: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      m={1}
      p={2}
      border={1}
      borderColor="lightgrey"
      borderRadius={2}
      alignItems="center"
      onClick={() => navigate(`/editJob/${id}`)}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="column" alignItems="flex-start">
          <Typography variant="body2">{title}</Typography>
          <Typography variant="body2">
            <Typography variant="body2" component="span" color="grey">
              @
            </Typography>{" "}
            {company}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize={12}>
            Added: {createdAt.toLocaleDateString()}
          </Typography>
          <Typography fontSize={12}>
            Last Updated: {lastUpdatedAt.toLocaleDateString()}
          </Typography>
        </Stack>
      </Stack>
      {/* <Button variant="outlined">{status.toUpperCase()}</Button> */}
      <Typography variant="body2" minWidth="100px" textAlign="center">
        {status.toUpperCase()}
      </Typography>
    </Stack>
  );
};

export default Job;
