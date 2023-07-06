import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      MalcolmMcConaghy {new Date().getFullYear()}.
    </Typography>
  );
}
