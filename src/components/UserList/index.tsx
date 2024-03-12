import { Box, Grid, Pagination } from "@mui/material";
import { useState } from "react";
import { Root } from "../../types/userResponse";
import { useQuery } from "@tanstack/react-query";
import CircularLoader from "../../commons/CircularLoader";
import UserCard from "./UserCard";
import { BASE_URL, PAGE_COUNT, PAGE_SIZE, SEED } from "../../constants";

function UserList() {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["userList", page],
    queryFn: () =>
      fetch(`${BASE_URL}?results=${PAGE_SIZE}&seed=${SEED}&page=${page}`).then(
        (res) => res.json() as Promise<Root>
      ),
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={3}
    >
      <Grid container spacing={2} minHeight={"800px"}>
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
