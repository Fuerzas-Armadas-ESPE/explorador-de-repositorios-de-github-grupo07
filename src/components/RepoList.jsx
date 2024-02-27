import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import RepoFilter from "./RepoFilter";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [filter, setFilter] = useState(""); // Nuevo estado para almacenar el filtro seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
        applyFilter(sortedRepos); // Aplica el filtro inicial
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username]);

  const applyFilter = (reposToFilter) => {
    // Implementa la lógica de filtrado según el criterio seleccionado
    let filteredResults = reposToFilter;

    switch (filter) {
      case "stars":
        const sortedByStars = reposToFilter.slice().sort((a, b) => b.stargazers_count - a.stargazers_count);
        filteredResults = sortedByStars;
        break;
      case "Date":
        const sortedByCreationDate = reposToFilter.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        filteredResults = sortedByCreationDate;
        break;
      case "language":
        // Reemplaza 'language' con el nombre real del campo de idioma en tu API de GitHub
        const sortedByLanguage = reposToFilter.slice().sort((a, b) => (a.language || "").localeCompare(b.language || ""));
        filteredResults = sortedByLanguage;
        break;
      // Agrega más casos según sea necesario para otros criterios de filtrado
      default:
        break;
    }

    // Selecciona los top 5 repositorios con más participación del usuario
    const top5Repos = filteredResults.slice(0, 5);
    setFilteredRepos(top5Repos);
  };

  useEffect(() => {
    applyFilter(repos); // Aplica el filtro cuando cambia el estado del filtro
  }, [repos, filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div>
      <RepoFilter onFilterChange={handleFilterChange} />
      <h2>Repositorios de {username}</h2>
      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size} - Estrellas: {repo.stargazers_count} - Fecha de Creación: {repo.created_at} - Idioma: {repo.language}
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
