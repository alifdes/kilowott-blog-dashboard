import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import SearchBar from "../components/blog/SearchBar";
import BlogForm from "../components/blog/BlogForm";
import CustomModal from "../ui/CustomModal";
import dummyBlogs from "../mock/Blogs";
import BlogTable from "../components/blog/BlogTable";
import BlogHeader from "../components/blog/BlogHeader";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery, useTheme } from "@mui/material";
import CustomButton from "../ui/CustomButton";

const Dashboard = () => {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const parsed = JSON.parse(stored);
      const newOnly = parsed.filter(
        (p) => !dummyBlogs.some((d) => d.id === p.id)
      );
      return [...dummyBlogs, ...newOnly];
    }
    return dummyBlogs;
  });
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit' | 'delete'
  const [selectedPost, setSelectedPost] = useState(null);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "dec",
  });
  const [page, setPage] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 8);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(posts));
  }, [posts]);

  //search
  const filteredPosts = posts.filter((post) => {
    const searchTerm = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm)
    );
  });

  // Sort
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const { key, direction } = sortConfig;
    const valA = key === "date" ? new Date(a[key]) : a[key].toLowerCase();
    const valB = key === "date" ? new Date(b[key]) : b[key].toLowerCase();

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginatedPosts = sortedPosts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Open Add
  const handleOpenAdd = () => {
    setModalMode("add");
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (post) => {
    setModalMode("edit");
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Open Delete
  const handleOpenDelete = (post) => {
    setModalMode("delete");
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  //add or edit blog
  const handleFormSubmit = (values) => {
    if (modalMode === "add") {
      const newPost = {
        ...values,
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
      };

      setPosts((prev) => [newPost, ...prev]);
    } else if (modalMode === "edit") {
      const updatedPosts = posts.map((post) =>
        post.id === values.id ? { ...values } : post
      );
      setPosts(updatedPosts);
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter((post) => post.id !== selectedPost.id);
    setPosts(updatedPosts);
    handleCloseModal();
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <BlogHeader />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            my: 2,
          }}
        >
          <Box sx={{ flex: 1, minWidth: "250px" }}>
            <SearchBar search={search} setSearch={setSearch} posts={posts} />
          </Box>

          <CustomButton
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenAdd}
          >
            ADD BLOG
          </CustomButton>
        </Box>

        <BlogTable
          posts={paginatedPosts}
          setPosts={setPosts}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          totalCount={sortedPosts.length}
          search={search}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </Container>
      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalMode === "add"
            ? "ADD NEW BLOG"
            : modalMode === "edit"
            ? "EDIT BLOG"
            : "CONFIRM DELETE"
        }
        mode={modalMode}
        onConfirm={
          modalMode === "delete"
            ? handleDelete
            : () =>
                document.querySelector('form button[type="submit"]')?.click()
        }
        confirmText={
          modalMode === "delete"
            ? "Delete"
            : modalMode === "edit"
            ? "Update"
            : "Add"
        }
        blog={selectedPost}
      >
        {(modalMode === "add" || modalMode === "edit") && (
          <BlogForm
            initialValues={
              selectedPost || {
                title: "",
                author: "",
                content: "",
                status: "Draft",
              }
            }
            onSubmit={handleFormSubmit}
          />
        )}
      </CustomModal>
    </>
  );
};

export default Dashboard;
