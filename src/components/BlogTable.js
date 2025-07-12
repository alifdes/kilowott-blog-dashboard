import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import MuiButton from "../components/MuiButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: "#666060", 
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  
}));
const BlogTable = ({
  posts,
  onEdit,
  onDelete,
  sortConfig,
  setSortConfig,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalCount,
}) => {
  const handleSort = (column) => {
    setSortConfig((prev) => ({
      key: column,
      direction:
        prev.key === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">
              <TableSortLabel
                active={sortConfig.key === "title"}
                direction={sortConfig.direction}
                onClick={() => handleSort("title")}
              >
                Title
              </TableSortLabel>
            </StyledTableCell>

            <StyledTableCell align="center">Author</StyledTableCell>

            <StyledTableCell align="center">
              <TableSortLabel
                active={sortConfig.key === "date"}
                direction={sortConfig.direction}
                onClick={() => handleSort("date")}
              >
                Date
              </TableSortLabel>
            </StyledTableCell>

            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {posts.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                No posts found.
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            posts.map((post) => (
              <StyledTableRow key={post.id}>
                <StyledTableCell align="center">{post.title}</StyledTableCell>
                <StyledTableCell align="center">{post.author}</StyledTableCell>
                <StyledTableCell align="center">{post.date}</StyledTableCell>
                <StyledTableCell align="center">{post.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1.5}
                  >
                    <MuiButton
                      onClick={() => onEdit(post)}
                      color="primary"
                      startIcon={<EditIcon sx={{ fontSize: 15 }} />}
                    >
                      Edit
                    </MuiButton>

                    <MuiButton
                      onClick={() => onDelete(post)}
                      color="error"
                      startIcon={<DeleteIcon sx={{ fontSize: 15 }} />}
                    >
                      Delete
                    </MuiButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination

        component="div"
        count={totalCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          '.css-5n9wn6-MuiInputBase-root-MuiTablePagination-select': {
            margin: '10px',
          },
          '.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions':{
            margin: '0px',
          }
        }}
      />
    </TableContainer>
  );
};

export default BlogTable;
