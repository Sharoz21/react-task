import { Box, Grid, Pagination } from "@mui/material";
import { useState } from "react";
import { Root } from "../../types/userResponse";
import { useQuery } from "@tanstack/react-query";
import CircularLoader from "../../commons/CircularLoader";
import UserCard from "./UserCard";
import { BASE_URL, PAGE_COUNT, PAGE_SIZE, SEED } from "../../constants";
import RadioButtons from "../../commons/RadioButtons";
import Filters from "../../types/filters";

function UserList() {
  const [page, setPage] = useState(1);
  const [userFilters, setUserFilters] = useState<Filters>({
    gender: "male",
  });

  const { data, isFetching } = useQuery({
    queryKey: ["userList", page, userFilters],
    queryFn: () =>
      fetch(
        `${BASE_URL}?gender=${userFilters?.gender}&results=${PAGE_SIZE}&page=${page}`
      ).then((res) => res.json() as Promise<Root>),
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange =
    <T extends keyof Filters>(filter: T) =>
    (_: React.ChangeEvent<unknown>, value: Filters[T]) => {
      setUserFilters({ ...userFilters, [filter]: value });
    };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={3}
    >
      <RadioButtons onChange={handleFilterChange("gender")} />
      <Grid container spacing={2} minHeight={"300px"}>
        <CircularLoader isLoading={isFetching} sx={{ margin: "auto" }}>
          {data?.results?.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user?.login?.uuid}>
              <UserCard
                user={user}
                sx={{
                  margin: 1,
                  display: "flex",
                  padding: 1,
                }}
              />
            </Grid>
          ))}
        </CircularLoader>
      </Grid>

      <Pagination
        count={PAGE_COUNT}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        sx={{ marginX: "auto" }}
      />
    </Box>
  );
}

export default UserList;
