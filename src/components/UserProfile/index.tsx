import { Link, useLocation } from "react-router-dom";
import { Result, Root } from "../../types/userResponse";
import UserCard from "../../commons/UserCard";
import UserDetailsCard from "./UserDetailsCard";
import { Button, Grid } from "@mui/material";
import UserLocationMap from "./UserLocationMap";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, SEED } from "../../constants";
import CircularLoader from "../../commons/CircularLoader";
import PageNotFound from "../../commons/PageNotFound";

function UserProfile() {
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const enableQuery = !!(
    query.get("page") &&
    query.get("index") &&
    query.get("results")
  );

  const { data, isFetching, isError, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(
        `${BASE_URL}?seed=${SEED}&results=${query.get(
          "results"
        )}&page=${query.get("page")}`
      ).then((res) => res.json() as Promise<Root>),
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const user = data?.results[Number(query.get("index"))] as Result;

  if (
    isError ||
    !enableQuery ||
    (isFetched && Object.values(user || {}).length === 0)
  ) {
    return <PageNotFound />;
  }

  return (
    <>
      <CircularLoader
        isLoading={isFetching}
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          translate: "transform(-50%,-50%)",
        }}
      >
        <UserCard
          user={user}
          sx={{
            width: "50%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <UserCard.UserAvatar
            alt={user?.name.first}
            sx={{ width: 150, height: 150, marginY: "auto" }}
            src={user?.picture?.large}
          />
        </UserCard>

        <Grid
          container
          spacing={2}
          marginY={3}
          width={1500}
          height={300}
          marginX={"auto"}
        >
          <Grid item xs={12} sm={8} md={7}>
            <UserDetailsCard user={user} />
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <UserLocationMap
              location={{
                longitude: Number(user?.location?.coordinates?.longitude),
                latitude: Number(user?.location?.coordinates?.latitude),
              }}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mx: "auto", my: 1 }}
          >
            Go Home
          </Button>
        </Grid>
      </CircularLoader>
    </>
  );
}

export default UserProfile;
