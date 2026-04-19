import styles from "./AboutUsPage.module.css";

const PARTNER_DATA = [
  { name: "Amazon", logo: "/business_partners/amazon_logo.png" },
  { name: "Microsoft", logo: "/business_partners/Microsoft-Logo-white.png" },
  { name: "Alphabet", logo: "/business_partners/alphabet-logo.png" },
  { name: "Samsung", logo: "/business_partners/samsung-logo.png" },
  { name: "CBC", logo: "/business_partners/CBC_Logo_White.png" },
  { name: "Queens", logo: "/business_partners/QueensLogo_white.png" },
  { name: "NYU", logo: "/business_partners/nyu-logo.png" },
  { name: "Sodexo", logo: "/business_partners/sodexo-logo.png" },
];
export const OurPartners = () => {
  return (
    <section className={styles.partnersSection}>
      <p className={styles.partnersIntro}>
        We collaborate with some of the most respected names in the space and
        technology industries to make every journey extraordinary.
      </p>

      <div className={styles.partnersGrid}>
        {PARTNER_DATA.map((partner) => (
          <figure key={partner.name} className={styles.partnerLogoWrapper}>
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
