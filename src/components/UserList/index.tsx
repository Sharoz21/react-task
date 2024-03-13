import {
  Box,
  FormControlLabel,
  Grid,
  Pagination,
  Radio,
  TextField,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { Root } from "../../types/userResponse";
import { useQuery } from "@tanstack/react-query";
import CircularLoader from "../../commons/CircularLoader";
import UserCard from "../../commons/UserCard";
import { BASE_URL, PAGE_COUNT, PAGE_SIZE, SEED } from "../../constants";
import RadioButtons from "../../commons/RadioButtons";
import Filters from "../../types/filters";
import { Link } from "react-router-dom";
import {
  getStoredFilters,
  storeFilters,
} from "../../utils/localStorageService";
import { createQueryParams } from "../../utils/createQueryParams";
import PageNotFound from "../../commons/PageNotFound";

function UserList() {
  const [userFilters, setUserFilters] = useState<Filters>(getStoredFilters);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["userList", userFilters.pageNumber],
    queryFn: () =>
      fetch(
        `${BASE_URL}?seed=${SEED}&results=${PAGE_SIZE}&page=${userFilters.pageNumber}`
      ).then((res) => res.json() as Promise<Root>),
    refetchOnWindowFocus: false,
  });

  const handleFilterChange =
    <T extends keyof Filters>(filter: T) =>
    (
      _: React.ChangeEvent<HTMLInputElement | unknown>,
      value: string | number
    ) => {
      const filters: Filters = { ...userFilters, [filter]: value };
      setUserFilters(filters);
      storeFilters(filters);
    };

  const filteredUsers = useMemo(
    () =>
      data?.results
        ?.map((user, index) => ({ ...user, index }))
        ?.filter(
          ({ name: { first, last }, gender }) =>
            (first + last)
              .toLowerCase()
              .includes(userFilters.searchQuery?.toLowerCase() as string) &&
            (userFilters.gender === "both" || userFilters.gender === gender)
        ),
    [data, userFilters]
  );

  if (isError) return <PageNotFound />;

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={3}
    >
      <TextField
        id="outlined-basic"
        label="Search User"
        variant="outlined"
        value={userFilters?.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFilterChange("searchQuery")(e, e.target.value)
        }
      />

      <RadioButtons
        onChange={handleFilterChange("gender")}
        value={userFilters.gender}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="both" control={<Radio />} label="Both" />
      </RadioButtons>
      <Grid container spacing={2} minHeight={"300px"}>
        <CircularLoader isLoading={isFetching} sx={{ margin: "auto" }}>
          {filteredUsers?.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user?.login?.uuid}>
              <Link
                to={`/user?${createQueryParams({
                  ...data?.info,
                  index: user?.index,
                })}`}
                style={{ textDecoration: "none" }}
              >
                <UserCard
                  user={user}
                  sx={{
                    margin: 1,
                    display: "flex",
                    padding: 1,
                  }}
                >
                  <UserCard.UserAvatar
                    alt={user?.name.first}
                    sx={{ width: 64, height: 64, marginY: "auto" }}
                    src={user?.picture?.thumbnail}
                  />
                </UserCard>
              </Link>
            </Grid>
          ))}
        </CircularLoader>
      </Grid>

      <Pagination
        count={PAGE_COUNT}
        variant="outlined"
        shape="rounded"
        onChange={(e: ChangeEvent<unknown>, pageNumber) =>
          handleFilterChange("pageNumber")(e, pageNumber)
        }
        page={userFilters?.pageNumber}
        sx={{ marginX: "auto" }}
      />
    </Box>
  );
}

export default UserList;
