import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CityTable from "./components/CityTable/CityTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const App = () => {
  return (
    <Box>
      <Box>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>
      <Typography variant="h2">Cities</Typography>
      <CityTable />
    </Box>
  );
};

export default App;
