import styles from "./AboutUsPage.module.css";

const PARTNER_DATA = [
  {
    name: "Amazon",
    // Ensure this matches your file name in /public/business_partners/
    logo: "/business_partners/amazon.png", 
  },
  {
    name: "SpaceX",
    logo: "/business_partners/spacex.png",
  },
  {
    name: "NASA",
    logo: "/business_partners/nasa.png",
  },
  {
    name: "ESA",
    logo: "/business_partners/esa.png",
  }
];

export const OurPartners = () => {
  return (
    <section className={styles.partnersSection}>
      <p className={styles.partnersIntro}>
        We collaborate with some of the most respected names in the space and 
        technology industries to make every journey extraordinary.
      </p>

      <div className={styles.partnersGrid}>
        {PARTNER_DATA.map((partner, index) => (
          <figure key={index} className={styles.partnerLogoWrapper}>
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className={styles.partnerLogo}
            />
          </figure>
        ))}
      </div>
    </section>
  );
};