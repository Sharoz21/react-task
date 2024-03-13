## Listing Component with Pagination and Filters
This project includes a listing component with pagination and filters, integrated with the random user API. The component allows users to browse through a list of items, with options to filter by gender. Additionally, there's a search functionality for the listing page, enabling users to find specific items efficiently within a single page.

## Components
  - UserList: Displays basic information about the Users with gender and name search functionality (these filters are persistant in local storage) alongwith pagination controls at the end.
  - UserProfile: Displays more information about a particular user including its location on the map (Note: the coordinates provided by randomuser API are not accurate hence you might see a different residence than the loc on the map).

## Decisions taken during development:
  - Search Functionality: Ideally, the endpoint must support a search query that we can debounce on the FE to limit calls to the endpoint. Since the randomuser API doesn't support such functionality, I have created a simple search query purely on the FE and in order to avoid multiple re-renders I have made use of useMemo to memoize the results.
  - Maps: I decided to use MapBoxGL to integrate maps on the User Profile instead of Google Maps as Google Maps have a dark overlay on development mode. 

## Technologies used:
  - React
  - React Query
  - Typescript
  - MUI
  - MapboxGL
  - RandomUserAPI
  - FlagsAPI

## Usage
To use the listing component with all its features:

- Clone this repository to your local machine.
- Install node_modules by running npm i in the root folder
- Run the project using npm run dev
