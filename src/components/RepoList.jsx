import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Pagination, Typography, Box } from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Número de repositorios por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const reposForPage = sortedRepos.slice(startIndex, endIndex);
        setRepos(reposForPage);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Typography variant="h6">Top 5 repositorios con más participación de {username}</Typography>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size}
          </li>
        ))}
      </ul>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(repos.length / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
