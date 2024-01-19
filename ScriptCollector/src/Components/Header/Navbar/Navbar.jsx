import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { BiSolidUserCircle, BiLogOut } from "react-icons/bi";
import { useAuth } from "../../AuthContext/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.listeNav}>
          {user ? (
            <>
              <li>
                <Link to="/" onClick={handleLogout}>
                  <BiLogOut />
                </Link>
              </li>
              <li>
                <Link to={`/moncompte/${user.idUser}`}>{user.name}</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/connexion">
                <BiSolidUserCircle />
              </Link>
            </li>
          )}
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/tousscenarios">Scénarios</Link>
          </li>
          <li>
            <Link to="/tousjeux">Jeux</Link>
          </li>
          <li>
            <Link to="/ecrirescenario">Ecriture</Link>
          </li>
          {user.rangUser === 1 && (
                <li>
                  <Link to={`/admin`}>Admin</Link>
                </li>
              )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
