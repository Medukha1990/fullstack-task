import { useState, useCallback, useEffect } from "react";
import { StyledClearIcon } from "./styled";
import citiesService from "../../api/citiesService";
import {
  citiesLoading,
  citiesLoaded,
  citiesError,
} from "../../redux/slices/citySlice";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { InputAdornment } from "@mui/material";
import { City, CityData } from "../types/cityTypes";

const CityTable = () => {
  const [loading, setLoading] = useState(true);
  const [showClearIcon, setShowClearIcon] = useState<string>("none");
  const [pendingRow, setPendingRow] = useState<City | null>(null);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [state, setState] = useState({
    page: 1,
    rowsPerPage: 5,
    textContent: "",
  });

  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.cities);

  const fetchCities = useCallback(() => {
    dispatch(citiesLoading());
    const { page, textContent, rowsPerPage } = state;
    const currentPage = page ? page - 1 : 0;
    citiesService
      .getAll({
        cityName: textContent,
        page: currentPage,
        size: rowsPerPage,
      })
      .then(({ data }: { data: CityData }) => {
        dispatch(citiesLoaded(data.cities));

        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error: { message: string }) => {
        dispatch(citiesError(error.message));
      });
  }, [state]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setState({ ...state, page: value });
  };

  const onClearIconClick = () => {
    setState({ ...state, textContent: "" });
    setShowClearIcon("none");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");

    setState({ ...state, page: 0, textContent: event.target.value });
  };

  const handleRemove = (id: number) => {
    citiesService
      .remove({
        id,
        cityName: "",
        count: "",
      })
      .then(() => {
        const updatedList = cities.filter((item) => item.id !== id);
        dispatch(citiesLoaded(updatedList));
      })
      .catch((error: { message: string }) => {
        console.error(error.message);
      });
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingRow({ ...pendingRow, count: event.target.value } as City);
  };

  const handleCountSave = () => {
    citiesService
      .update(pendingRow)
      .then(({ data }: { data: { data: City } }) => {
        const newRow = data.data;

        const updatedList = cities.map((item) => {
          if (item.id === newRow.id) {
            return newRow;
          }
          return item;
        });
        dispatch(citiesLoaded(updatedList));

        setPendingRow(null);
      })
      .catch((error: { message: string }) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    fetchCities();
  }, [dispatch, state]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <TextField
        sx={{ float: "right", marginBottom: "20px" }}
        id="outlined-basic"
        label="City"
        variant="outlined"
        onChange={handleInputChange}
        value={state.textContent}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ display: showClearIcon }}
              onClick={onClearIconClick}
            >
              <StyledClearIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.cityName}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {pendingRow?.id === row.id ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                    >
                      <TextField
                        label="count"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        onChange={handleCountChange}
                        value={pendingRow.count}
                        type="number"
                      />
                      <Box>
                        <CheckIcon cursor="pointer" onClick={handleCountSave} />
                        <StyledClearIcon onClick={() => setPendingRow(null)} />
                      </Box>
                    </Box>
                  ) : (
                    row.count
                  )}
                </TableCell>
                <TableCell align="right">
                  <ButtonsGroup
                    onUpdate={() => setPendingRow(row)}
                    onRemove={() => handleRemove(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        page={state.page}
      />
    </Box>
  );
};

export default CityTable;
