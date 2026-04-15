import styles from "./AboutUsPage.module.css";

export const OurValues = () => {
  return (
    <section className={styles.valuesSection} aria-labelledby="values-title">
      <header className={styles.valuesHeader}>
        <p className={styles.topLabel}>OUR VALUES</p>
        <h2 id="values-title">Rules to Live By</h2>
      </header>

      <div className={styles.valuesGrid}>
        <article className={styles.valueItem}>
          <div className={styles.numberWrapper} aria-hidden="true">
            01
          </div>
          <h3>Exploration</h3>
          <p>
            We are driven by a deep-seated desire to explore the unknown. We
            believe that the pursuit of discovery is at the heart of human
            nature.
          </p>
        </article>

        <article className={styles.valueItem}>
          <div className={styles.numberWrapper} aria-hidden="true">
            02
          </div>
          <h3>Innovation</h3>
          <p>
            At Galactica, we prioritize cutting-edge technology and innovation.
            We are constantly evolving our spacecraft and safety protocols.
          </p>
        </article>

        {/* Value 03 */}
        <article className={styles.valueItem}>
          <div className={styles.numberWrapper} aria-hidden="true">
            03
          </div>
          <h3>Sustainability</h3>
          <p>
            We are committed to making space exploration sustainable. Our
            missions are designed to minimize environmental impact.
          </p>
        </article>

        <article className={styles.valueItem}>
          <div className={styles.numberWrapper} aria-hidden="true">
            04
          </div>
          <h3>Community</h3>
          <p>
            We believe in the power of collective exploration, building a
            community of space enthusiasts who share a passion for the stars.
          </p>
        </article>
      </div>
    </section>
  );
};
