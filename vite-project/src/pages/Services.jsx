import {Link} from "react-router-dom"
import { services } from '../data/services';
const steps = [
  { n: "1", title: "Browse or post", text: "Look through the shop, or send us your instrument's details and photos." },
  { n: "2", title: "Get in touch", text: "Contact us to agree on the price, condition or trade." },
  { n: "3", title: "Meet and deal", text: "Check the instrument in person, then complete the deal." },
];

export default function Services() {
    return (
        <>
        <section className="page-head">
            <div className="container">
                <h1>Our Services</h1>
                <p>Everything you need to find for your music gear.</p>
            </div>
        </section>
        <section className="container section">
            <div className="grid grid-4">
                {services.map((s) => (
                    <div className="card center" key={s.title}>
                        <div className="emoji">{s.icon}</div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                        </div>
                ))}
            </div>
        </section>
        <section className="container section">
            <h2>How it Works</h2>
            <div className="grid grid-3">
                {steps.map((s) => (
                    <div className="card" key={s.n}>
                        <div className="step-num">{s.n}</div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                        </div>
                ))}
            </div>
        </section>
        <section className="cta">
            <div className="container">
                <h2>Ready to Buy , Sell or Trade</h2>
                <p>check the shop, or send us a message and we will help you.</p>
                <div className="buttons cta-button">
                    <Link to="/shop" className="btn">Visit the Shop</Link>
                   <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                </div>
            </div>
        </section>
        
        
        </>
    )
}