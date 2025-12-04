import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  return (
    <div>
      <section>
        <h1>Contact Us</h1>
        <p>
          Have a question about admissions, courses, or campus life? Reach out
          to us using the form below.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Department</label>
            <select
              required
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
              <option value="mech">Mechanical</option>
              <option value="civil">Civil</option>
              <option value="mba">MBA</option>
            </select>
          </div>

          <div>
            <label>Message</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Type your message here"
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <div className="output">
            <h3>Submitted Details</h3>
            <p>
              <b>Name:</b> {submitted.name}
            </p>
            <p>
              <b>Email:</b> {submitted.email}
            </p>
            <p>
              <b>Department:</b> {submitted.department.toUpperCase()}
            </p>
            <p>
              <b>Message:</b> {submitted.message}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contact;
