import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import VehicleCard from "./components/VehicleCard";
import axios from "axios";
import Container from "@mui/system/Container/Container";
import Grid from "@mui/material/Grid";
import BookingForm from "./components/BookingForm";
import AppLoader from "./components/Loader";
import { API_BASE_URL } from "./constants";
import { toQueryString } from "./utils/strings";

export type VehicleImage = {
  cover: string;
  album: Array<string>;
};
export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  images: VehicleImage;
};

export type QueryState = {
  dateFrom?: string;
  dateTo?: string;
};

export type QueryFilters = {
  dateFrom?: string;
  dateTo?: string;
  excluded?: string[];
};

export type BookingItem = {
  userId: string;
  vehicleId: string;
  dateFrom: string;
  dateTo: string;
};
const INITIAL_QUERY_STATE = { dateFrom: "", dateTo: "" };

async function fetchData(path: string, filters?: QueryFilters) {
  const queryString = toQueryString(filters);
  const QUERY_URL = filters
    ? `${API_BASE_URL}${path}?${queryString}`
    : `${API_BASE_URL}${path}`;
  console.log(QUERY_URL);
  return await axios.get(QUERY_URL);
}

function App() {
  const [vehicles, setVehicles] = useState<Array<Vehicle> | undefined>();
  const [query, setQuery] = useState<QueryState>(INITIAL_QUERY_STATE);

  useEffect(() => {
    fetchData("/vehicles").then((response) =>
      setVehicles(response.data.vehicles)
    );
  }, []);

  const onSubmit = (ev: React.SyntheticEvent) => {
    if (query.dateFrom && query.dateTo) {
      fetchData("/booking", {
        dateFrom: query?.dateFrom,
        dateTo: query?.dateTo,
      }).then((response) => {
        if (response.data) {
          const excluded = response?.data?.bookings.map(
            (b: BookingItem) => b.vehicleId
          );
          console.log(excluded);
          fetchData("/vehicles", { excluded }).then((response) => {
            if (response.data.vehicles) {
              setVehicles(response.data.vehicles);
            }
          });
        }
      });
    }
  };

  return (
    <div className="App">
      <Menu />
      <Container sx={{ py: 8 }} maxWidth="md">
        <BookingForm onSubmit={onSubmit} setQuery={setQuery} />
        <Grid container spacing={4}>
          {vehicles ? (
            vehicles?.map((vehicle, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <VehicleCard data={vehicle} />
              </Grid>
            ))
          ) : (
            <Grid>
              <AppLoader />
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
