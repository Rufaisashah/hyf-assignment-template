import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
const pageLinks = [
  { path: "/about_us", label: "About Us" },
  { path: "/destination", label: "Destination" },
  { path: "/nasa_collaboration", label: "NASA Collaboration" },
];
const socialMediaLinks = [
  {
    url: "https://facebook.com",
    title: "Facebook",
    icon: "/socialmedia/facebook.png",
  },
  {
    url: "https://instagram.com",
    title: "Instagram",
    icon: "/socialmedia/instagram.png",
  },
  {
    url: "https://linkedin.com",
    title: "LinkedIn",
    icon: "/socialmedia/linkedIn.png",
  },
  {
    url: "https://youtube.com",
    title: "Youtube",
    icon: "/socialmedia/youtube.png",
  },
];
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
          {pageLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Docs for the Link: https://reactrouter.com/api/components/Link#link. */}

      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          {socialMediaLinks.map((item) => (
            <SocialMediaItem
              key={item.url}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
};
