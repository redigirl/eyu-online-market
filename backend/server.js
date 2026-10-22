require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { Resend } = require('resend');
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // only needed while developing
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err.message));

const messageSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  comment: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);

app.post('/api/contact', async (req, res) => {
  const { fullname, email, comment } = req.body;

  if (!fullname || !email || !comment) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  // 1. Save to MongoDB first, so the message is never lost
  try {
    await Message.create({ fullname, email, comment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not save your message.' });
  }

  // 2. Then email it to you (a failure here does not lose the message)
  if (resend && process.env.EMAIL_TO) {
    try {
      const { error } = await resend.emails.send({
        from: 'Website Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `New message from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\n\n${comment}`,
      });
      if (error) console.error('Email error:', error);
    } catch (err) {
      console.error('Email error:', err.message);
    }
  }

  res.json({ success: true });
});

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

app.get('/admin/messages', async (req, res) => {
  if (req.query.key !== process.env.ADMIN_KEY) {
    return res.status(401).send('Unauthorized');
  }

  const messages = await Message.find().sort({ date: -1 });

  const rows = messages
    .map(
      (m) => `
    <div style="border:1px solid #ddd;border-radius:8px;padding:12px;margin:12px 0">
      <b>${escapeHtml(m.fullname)}</b> &lt;${escapeHtml(m.email)}&gt;<br>
      <small>${m.date.toLocaleString()}</small>
      <p style="white-space:pre-wrap">${escapeHtml(m.comment)}</p>
      <a href="mailto:${escapeHtml(m.email)}">Reply by email</a>
    </div>`
    )
    .join('');

  res.send(`
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <body style="font-family:sans-serif;max-width:700px;margin:20px auto;padding:0 12px">
      <h2>Messages (${messages.length})</h2>
      ${rows || '<p>No messages yet.</p>'}
    </body>`);
});

// Serve the React site (built by Vite)
const distPath = path.join(__dirname, '..', 'vite-project', 'dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));