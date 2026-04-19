import styles from "./AboutUsPage.module.css";

const CREW_DATA = [
  {
    id: 1,
    role: "Captain",
    name: "Sarah Vega",
    img: "/crew/image-anousheh-ansari.png",
    bio: "A former NASA astronaut with over 15 years of experience, Captain Vega leads our missions with unparalleled expertise.",
  },
  {
    id: 2,
    role: "Chief Astrophysicist",
    name: "Leo Redding",
    img: "/crew/image-douglas-hurley.png",
    bio: "Our chief astrophysicist, Dr. Redding, is a renowned scientist who has contributed to major space discoveries.",
  },
  {
    id: 3,
    role: "Mission Specialist",
    name: "Alex Santos",
    img: "/crew/image-mark-shuttleworth.png",
    bio: "As a mission specialist, Alex’s job is to ensure that every aspect of the journey runs smoothly.",
  },
  {
    id: 4,
    role: "Chief Engineer",
    name: "Victor Lee",
    img: "/crew/crew.jpg",
    bio: "With his extensive background in aerospace engineering, Victor Lee is responsible for state-of-the-art technology.",
  },
  {
    id: 5,
    role: "Crew Member",
    name: "Victor glover",
    img: "/crew/image-victor-glover.webp",
    bio: "Maya brings a unique blend of technical skills and customer service experience to the team.",
  },
];

export const OurCrew = () => {
  return (
    <section className={styles.crewSection}>
      <p className={styles.crewIntro}>
        Our crew is the heart and soul of Galactica. We are a diverse team of
        seasoned space explorers, engineers, and visionaries united by a common
        goal.
      </p>

      <ul className={styles.crewList}>
        {CREW_DATA.map((member) => (
          <li key={member.id} className={styles.crewListItem}>
            <article className={styles.crewCard}>
              <div className={styles.crewImgWrapper}>
                <img
                  className={styles.crewImg}
                  src={member.img}
                  alt={`Photo of ${member.name}`}
                />
              </div>
              <div className={styles.crewInfo}>
                <span className={styles.crewRole}>{member.role}</span>
                <h4 className={styles.crewName}>{member.name}</h4>
                <p className={styles.crewBio}>{member.bio}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
