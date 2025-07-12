import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import MuiButton from "../components/MuiButton";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({
  open,
  onClose,
  title,
  mode = "add",
  children,
  onConfirm,
  blog,
  confirmText = "Save",
  cancelText = "Cancel",
  disableConfirm = false,
}) => {
  const theme = useTheme();
  const isDelete = mode === "delete";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          backgroundColor: theme.palette.grey[200],
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color:
            theme.palette.mode === "light"
              ? theme.palette.text.secondary
              : theme.palette.grey[800],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        {isDelete ? "DELETE BLOG" : title}

        <CloseIcon
          onClick={onClose}
          sx={{
            fontWeight: 600,
            fontSize: "1.2rem",
            transition: "all 0.2s ease",
            color:
              theme.palette.mode === "light"
                ? theme.palette.text.secondary
                : theme.palette.grey[800],
            "&:hover": {
              color: theme.palette.grey[900],
              transform: "scale(1.1)",
            },
          }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        {isDelete ? (
          <Box>
            {blog && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor:
                    theme.palette.mode === "light" ? "#f5f5f5" : "#2e2e2e",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                }}
              >
                <Typography mb={1} variant="subtitle1">
                  Are you sure you want to delete this blog post?
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Title:</strong> {blog.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Author:</strong> {blog.author}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Content:</strong> {blog.content}
                </Typography>
                <Typography variant="body2" display="block">
                  <strong>Status:</strong> {blog.status}
                </Typography>
                <Typography variant="body2" display="block">
                  <strong>Date:</strong> {blog.date}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box mt={1}>{children}</Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <MuiButton onClick={onClose} color={"primary"}>
          {cancelText}
        </MuiButton>

        <MuiButton
          onClick={onConfirm}
          color={isDelete ? "error" : "primary"}
          disabled={disableConfirm}
        >
          {isDelete ? "Delete" : confirmText}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
