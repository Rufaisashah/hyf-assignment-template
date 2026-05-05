import { createContext, useContext, useState } from "react";


const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const isPlanetInWishlist = (planetName) => {
    return planetsWishlist.some((planet) => planet.name === planetName);
  };

  const addPlanetToWishlist = (name, thumbnail) => {
    setPlanetsWishlist((prev) => [...prev, { name, thumbnail }]);
  };

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist((prev) =>
      prev.filter((planet) => planet.name !== name)
    );
  };

  const wishlistCount = planetsWishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        planetsWishlist,
        addPlanetToWishlist,
        removePlanetFromWishlist,
        isPlanetInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => useContext(WishlistContext);