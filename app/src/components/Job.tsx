import { Button, Divider, Stack, Typography } from "@mui/material";

const Job = ({ title, company }: { title: string; company: string }) => (
  <Stack
    direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    m={1}
    p={2}
    border={1}
    borderColor="lightgrey"
    borderRadius={2}
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
        <Typography fontSize={12}>Added: time</Typography>
        <Typography fontSize={12}>Last Updated: time</Typography>
      </Stack>
    </Stack>
    <Button variant="outlined">Applied</Button>
  </Stack>
);

export default Job;
