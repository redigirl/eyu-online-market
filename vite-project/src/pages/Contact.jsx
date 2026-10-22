import { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const API_URL = import.meta.env.DEV ? 'http://localhost:5000' : '';
  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.get("from_name"),
          email: formData.get("reply_to"),
          comment: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }

      setStatus("sent");
      formRef.current.reset();
    } catch (error) {
      console.error("Could not send contact message:", error);
      setStatus("error");
    }
  };
return (
  <>
  <section className="page-head">
    <div className="container">
      <h1>Contact Us</h1>
      <p>Want to buy, sell or trade an instrument? send us a message.</p>
    </div>
  </section>
  <section className="container section two-col">
    <div>
      <h2>Get in Touch</h2>
      <ul className="contact-list">
        <li>📍 Ethiopia</li>
            <li>📞 +2519 7651 880</li>
            <li>✉️ Eyuonlinemarket1@gmail.com</li>
            <li>
              💬 Telegram:{" "}
              <a href="https://t.me/Eyuonlinemarket1" target="_blank" rel="noopener noreferrer">
                @Eyuonlinemarket1
              </a>
            </li>
      </ul>
    </div>
    <form className="card form" ref={formRef} onSubmit={sendEmail}>
      <label>
        Full name
        <input type="text" name="from_name" required />
      </label> 

      <label>
            Email
            <input type="email" name="reply_to" required />
          </label>

          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && <p className="ok">Thanks! Your message was sent.</p>}
          {status === "error" && (
            <p className="error">Sorry, something went wrong. Please try again.</p>
          )}
    </form>
  </section>
  
  </>
);
}