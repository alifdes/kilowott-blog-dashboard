import { TextField, MenuItem, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: 56,
    borderRadius: 25,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[200] // dark background
        : theme.palette.grey[200], // light background

    border: `1px solid ${theme.palette.grey[400]}`,
    paddingLeft: 12,
    paddingRight: 12,

    "& input": {
      color:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900] 
          : "#333", 
    },
    "& textarea": {
      color:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900] 
          : "#333", 
    },

    "& fieldset": {
      border: "none", 
      color:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900] 
          : "#333", 
    },

    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[300]
          : theme.palette.grey[300],
    },

    "&.Mui-focused": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[200]
          : theme.palette.grey[100],
    },
  },

  "& label": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.text.secondary,
    fontSize: 16,
  },

  "& label.Mui-focused": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.text.primary,
  },


}));
const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  content: Yup.string().required("Content is required"),
  status: Yup.string().required("Status is required"),
});

const BlogForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BlogSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, handleChange, values }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <StyledInput
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              fullWidth
            />

            <StyledInput
              label="Author"
              name="author"
              value={values.author}
              onChange={handleChange}
              error={touched.author && Boolean(errors.author)}
              helperText={touched.author && errors.author}
              fullWidth
            />

            <StyledInput
              label="Content"
              name="content"
              value={values.content}
              onChange={handleChange}
              error={touched.content && Boolean(errors.content)}
              helperText={touched.content && errors.content}
              fullWidth
              multiline
            />

            <StyledInput
              select
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              error={touched.status && Boolean(errors.status)}
              helperText={touched.status && errors.status}
              fullWidth
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </StyledInput>

            <button type="submit" style={{ display: "none" }} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;
