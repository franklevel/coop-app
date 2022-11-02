import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, CardMedia } from "@mui/material";
import { Vehicle } from "../App";

interface VehicleCardProps {
  data: Vehicle;
}

export default function VehicleCard({ data }: VehicleCardProps) {
  const { brand, model, year, id, price, images } = data;
  return (
    <Card sx={{ maxWidth: 300 }} key={id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {brand} {model} {year}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height={150}
          image={images.cover}
          alt="Paella dish"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => alert(id)}>
          INQUIRY
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => alert(id)}
          style={{ marginLeft: "auto" }}
        >
          BOOK IT
        </Button>
      </CardActions>
    </Card>
  );
}
