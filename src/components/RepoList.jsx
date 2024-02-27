import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../App.css";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=5`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2>Top 5 repositorios con más participación de {username}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                {repo.name} - Tamaño: {repo.size}
              </li>
            ))}
          </ul>
          <div>
            <button className="prevNextButton" onClick={handlePrevPage}>Previous</button>
            <button className="prevNextButton" onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
