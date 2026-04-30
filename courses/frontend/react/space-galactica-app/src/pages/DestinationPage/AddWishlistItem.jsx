import { useState } from "react";
import styles from "./DestinationPage.module.css";

export const AddWishlistItem = ({ onAddWishlistItem }) => {
  const [thumbnail, setThumbnail] = useState("/destination/image-europa.png");
  const [name, setName] = useState(""); // ← Week 3: useState for input

  const onAddItemPressed = () => {
    if (!name.trim()) return; // don't add if input is empty
    onAddWishlistItem(name, thumbnail); // call parent function
    setName(""); // clear the input
  };

  return (
    <div className={styles.addWishlistItem}>
      <p>Add custom planet to wishlist</p>
      <label htmlFor="customWishlist">Wishlist item name</label>
      <input
        id="customWishlist"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // ← connect input to state
      />
      <label htmlFor="customWishlistThumbnail">Wishlist item thumbnail</label>
      <select
        id="customWishlistThumbnail"
        onChange={(e) => setThumbnail(e.target.value)} // ← connect select to state
      >
        <option value="/destination/image-europa.png">EUROPA</option>
        <option value="/destination/image-mars.png">MARS</option>
        <option value="/destination/image-moon.png">MOON</option>
        <option value="/destination/image-titan.png">TITAN</option>
      </select>
      <button onClick={onAddItemPressed}>ADD CUSTOM</button>
    </div>
  );
};
