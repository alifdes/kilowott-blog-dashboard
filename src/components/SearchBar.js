import {
  Autocomplete,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "40%",
  "& .MuiOutlinedInput-root": {
    height: 40,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 25,
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    fontSize: "12px",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.text.primary,

    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "6px 0",
      color: theme.palette.mode === "dark" ? "#232121" : "#333",
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

const SearchBar = ({ search, setSearch, posts }) => {
  const options = Array.from(
    new Set([...posts.map((p) => p.title), ...posts.map((p) => p.author)])
  );


  return (
    <Box sx={{ my: 2 }}>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={search}
        onInputChange={(e, newValue) => setSearch(newValue)}
        renderInput={(params) => (
          <StyledInput
            {...params}
            placeholder="Search by Title or Author"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: "grey.600" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
