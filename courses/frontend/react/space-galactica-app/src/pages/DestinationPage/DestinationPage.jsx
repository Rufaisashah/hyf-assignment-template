import { useState } from "react";
import styles from "./DestinationPage.module.css";
import { PlanetCard } from "./PlanetCard";
import { PlanetsWishlistItem } from "./PlanetsWishlistItem";
import { AddWishlistItem } from "./AddWishlistItem";

const PLANETS_DATA = [
  {
    name: "Europa",
    description:
      "Europa is one of Jupiter's moons believed to have a liquid water ocean beneath its icy surface, making it a prime candidate for extraterrestrial life.",
    thumbnail: "/destination/image-europa.png",
  },
  {
    name: "Moon",
    description:
      "Earth's Moon is the closest celestial body to our planet, offering a unique opportunity to experience low gravity and stunning views of Earth.",
    thumbnail: "/destination/image-moon.png",
  },
  {
    name: "Mars",
    description:
      "Mars is the fourth planet from the Sun. Known as the Red Planet, it has the largest volcano and canyon in the solar system.",
    thumbnail: "/destination/image-mars.png",
  },
  {
    name: "Titan",
    description:
      "Titan is Saturn's largest moon and the only moon known to have a dense atmosphere and bodies of liquid on its surface.",
    thumbnail: "/destination/image-titan.png",
  },
];

export const Destinations = () => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const isPlanetInWishlist = (planetName) => {
    return planetsWishlist.some((planet) => planet.name === planetName);
  };

  const togglePlanetSelection = (name, thumbnail) => {
    if (isPlanetInWishlist(name)) {
      removePlanetFromWishlist(name);
    } else {
      addPlanetToWishlist(name, thumbnail);
    }
  };

  const addPlanetToWishlist = (name, thumbnail) => {
    setPlanetsWishlist((prev) => [...prev, { name, thumbnail }]);
  };

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist((prev) => prev.filter((planet) => planet.name !== name));
  };

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Travel destinations</h1>
        <section className="card">
          <h2>Wishlist</h2>

          {planetsWishlist.length === 0 ? (
            <p>No planets in your wishlist :(</p>
          ) : (
            <p>You have {planetsWishlist.length} planets in your wishlist</p>
          )}

          {/* Week 3 - AddWishlistItem */}
          <AddWishlistItem onAddWishlistItem={addPlanetToWishlist} />

          {/* Week 3 - .map() over wishlist */}
          <h3>Your current wishlist</h3>
          <div className={styles.wishlistList}>
            {planetsWishlist.map((planet) => (
              <PlanetsWishlistItem
                key={planet.name}
                name={planet.name}
                thumbnail={planet.thumbnail}
                onRemove={() => removePlanetFromWishlist(planet.name)}
              />
            ))}
          </div>
        </section>
        <section className="card">
          <h2>Possible destinations</h2>

          {/* Week 3 - .map() over PLANETS_DATA */}
          {PLANETS_DATA.map((planet) => (
            <PlanetCard
              key={planet.name}
              name={planet.name}
              description={planet.description}
              thumbnail={planet.thumbnail}
              isSelected={isPlanetInWishlist(planet.name)}
              togglePlanetSelection={togglePlanetSelection}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Destinations;

// 🧑🏽‍🚀 Task - Week 4 - part 2
// Hate to break it to you, but you will have to make some changes to the code you already wrote.
// Now that you have context, grab and use the context data in this.
// You will need to replace some of the variables and functions with the ones from the context.
