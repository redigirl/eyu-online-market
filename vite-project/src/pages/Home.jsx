
import { Link } from 'react-router-dom';
import eyu from "../assets/eyu.png";



const categories = [
    { name: "Guitars", emoji: "🎸" },
    { name: "Keyboards", emoji: "🎹" },
    { name: "Drums", emoji: "🥁" },
    { name: "saxophones", emoji: "🎷" },
    { name: "violins", emoji: "🎻" },
    { name: "electric guitars", emoji: "🎸" },
    { name: "speakers & Mixers", emoji: "🔊" },
    { name: "audio monitors", emoji:"🎛️"}
];

export default function Home() {
    return (
        <>
        <section className="hero">
            <div className="container hero-inner">
                <div className="hero-text">
                    <h1>Buy. Sell. Trade.</h1>
                    <p className="tag">Music instruments for a better tomorrow</p>
                    <p>
                        Eyu Online Market is for buying and selling any type of musical
              instruments in Ethiopia — used or new condition.
                    </p>
                    <div className="buttons">
                        <Link to="/shop" className="btn">Shop Now</Link>
                        <Link to="/services" className="btn btn-outline">Our Services</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img 
                    src={eyu}
                    alt="Eyu online market - guitars,keyboards,drums,saxophones and violins"
                    />
                </div>
            </div>
        </section>
        <section className="container section">
            <h2>Why choose Eyu Online Market?</h2>
            <div className="grid grid-3">
                <div className="card center">
                    <div className="emoji">🇪🇹</div>
                    <h3>Made for Ethiopia</h3>
                    <p>Explore instruments from a marketplace focused on music lovers in Ethiopia.</p>
                </div>
                <div className="card center">
                    <div className="emoji">🎼</div>
                    <h3>Plenty to explore</h3>
                    <p>Find guitars, keyboards, drums, sound equipment and more in one place.</p>
                </div>
                <div className="card center">
                    <div className="emoji">🤝</div>
                    <h3>Talk through the details</h3>
                    <p>Get in touch to discuss an instrument, its condition or a possible trade.</p>
                </div>
            </div>
        </section>
        <section className="container section">
            <h2>Browse by Instrument</h2>
            <div className="grid grid-6">
                {categories.map((c) => (
                    <div className="card center" key={c.name}>
                        <div className="emoji">{c.emoji}</div>
                        <h3>{c.name}</h3>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
}