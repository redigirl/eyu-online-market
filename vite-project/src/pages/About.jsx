import eyu from "../assets/instruments.png";

const points = [
    { title:"Buy", text: "find the insturments you need" },
    { title:"Sell", text: "reach buyers across ethiopia" },
    { title:"Trade", text:"swap your old for something new"},
];

export default function About() {
return (
    <>
    <section className="page-head">
        <div className="container">
            <h1>About Us</h1>
            <p>Music instruments for  a better tomorrow.</p>
        </div>
    </section>
    <section className="container section two-col">
        <img className="rounded" src={eyu} alt="Guitar, keyboard, drums, saxophone and violin" />
        <div>
            <h2>Ethiopia's marketplace for musical instruments</h2>
            <p>
                 Eyu Online Market is a place for buying and selling any type of
            musical instrument in Ethiopia, in used or new condition —
            guitars, keyboards, drums, saxophones, violins, speakers and more.
            </p>
            <p>
                Whether you are a beginner looking for a first guitar or a band
            upgrading its sound system, Eyu connects buyers and sellers
            directly.
            </p>
        </div>
    </section>
    <section className="container section">
        <div className="grid grid-3">
            {points.map((p) => (
                <div className="card center" key={p.title}>
                    <div className="stat">{p.title}</div>
                    <p>{p.text}</p>
                    </div>
            ))}
        </div>
    </section>
    </>
);
}