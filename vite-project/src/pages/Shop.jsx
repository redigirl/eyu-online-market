import { useState } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Guitars", "Keyboards", "Drums", "Brass & Strings", "Sound"];

// Sample products; replace names and conditions with your real listings.
// For a real photo: import photo from "../assets/my-photo.jpg" and add  photo  to the product.
const products = [
  { id: 1, name: "Acoustic Guitar", category: "Guitars", condition: "Used", emoji: "🎸" },
  { id: 7, name: "EPA Speaker", category: "Sound", condition: "New", emoji: "🔊" },
  { id: 3, name: "Digital Keyboard", category: "Keyboards", condition: "Used", emoji: "🎹" },
  { id: 4, name: "Drum Kit (5-piece)", category: "Drums", condition: "New", emoji: "🥁" },
  { id: 5, name: "Alto Saxophone", category: "Brass & Strings", condition: "Used", emoji: "🎷" },
  { id: 6, name: "Violin", category: "Brass & Strings", condition: "New", emoji: "🎻" },
  { id: 2, name: "Electric Guitar", category: "Guitars", condition: "Used", emoji: "🎸" },
  { id: 8, name: "Audio Mixer", category: "Sound", condition: "New", emoji: "🎚️" },
];

export default function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({}); // { productId: quantity }

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const decrease = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  const remove = (id) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  const cartLines = products.filter((p) => cart[p.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <>
    <section className="page-head">
        <div className="container">
            <h1>Shop</h1>
        </div>
    </section>
    <section className="container section shop-layout">
        <div>
            <div className="toolbar">
                <input
                type="search"
                placeholder="search instruments..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="chips">
                {categories.map((c) => (
                    <button
                    key={c}
                    className={"chip" + (c === category ? " on" : "")}
                    onClick={() => setCategory(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            {list.length === 0 ? (
                <p className="empty">no instruments match your search.</p>
            ) : (
                <div className="grid products">
                    {list.map((p) => (
                        <article className="card product" key={p.id}>
                            <div className="product-img">
                                {p.photo ? <img src={p.photo} alt={p.name} /> : <span>{p.emoji}</span>}
                                <span className={`badge ${p.condition === "New" ? "new" : "used"}`}>
                                {p.condition}
                                </span>
                            </div>
                            <h3>{p.name}</h3>
                            <p className="cat">{p.category}</p>
                             <div className="product-action">
                              <button className="btn small" onClick={() => add(p.id)}>Add</button>
                            </div>
                        </article>
                    ))}
                    </div>
            )}
        </div>

        <aside className="card cart">
          <h2>Your cart ({cartCount})</h2>
          {cartLines.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cartLines.map((p) => (
                  <li key={p.id}>
                    <div>
                      <strong>{p.name}</strong>
                    </div>
                    <div className="qty">
                      <button onClick={() => decrease(p.id)}>−</button>
                      <span>{cart[p.id]}</span>
                      <button onClick={() => add(p.id)}>+</button>
                      <button className="x" onClick={() => remove(p.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn block">Order via Contact</Link>
              <button className="link-btn" onClick={() => setCart({})}>Clear cart</button>
            </>
          )}
        </aside>
    </section>
    </>
  );
}




























