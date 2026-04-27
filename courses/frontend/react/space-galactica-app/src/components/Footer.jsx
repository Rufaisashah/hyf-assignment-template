import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const SocialMediaItem = ({ url, title, icon }) => {
  return (
    <li>
      <a href={url}>
        <img src={icon} alt={title} width={24} height={24} />
        {title}
      </a>
    </li>
  );
};

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={pathname !== "/" ? styles.footer : styles.hidden}>
      <div className={styles.footerDescription}>
        <h3>Galactica</h3>
        <p>
          Explore the universe and beyond. Your journey to the stars starts
          here.
        </p>
        <p>&copy; 2024 Galactica. All rights reserved.</p>
      </div>

      <div className={styles.pages}>
        <h3>Pages</h3>
        <ul>
          <li>
            <Link to="/about_us">About Us</Link>
          </li>
          <li>
            <Link to="/destination">Destination</Link>
          </li>
          <li>
            <Link to="/nasa_collaboration">NASA Collaboration</Link>
          </li>
        </ul>
      </div>
      {/* Docs for the Link: https://reactrouter.com/api/components/Link#link. */}

      {/* 🧑🏽‍🚀 Task - Week 1 */}
      {/* Add a new list item for LINKEDIN */}
      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          <SocialMediaItem
            url="https://facebook.com"
            title="Facebook"
            icon="/socialmedia/facebook.png"
          />
          <SocialMediaItem
            url="https://instagram.com"
            title="Instagram"
            icon="/socialmedia/instagram.png"
          />

          <SocialMediaItem
            url="https://linkedin.com"
            title="LinkedIn"
            icon="/socialmedia/linkedin.png"
          />
          <SocialMediaItem
            url="https://youtube.com"
            title="Youtube"
            icon="/socialmedia/youtube.png"
          />
        </ul>
      </div>
    </footer>
  );
};
