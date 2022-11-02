import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function AppLoader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
