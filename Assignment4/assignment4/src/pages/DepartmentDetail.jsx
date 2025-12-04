import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import departmentsData from "../data/departments.json";

const DepartmentDetail = () => {
  const { id } = useParams();
  const [dept, setDept] = useState(null);

  useEffect(() => {
    const selected = departmentsData.find((d) => d.id === id);
    setDept(selected || null);
  }, [id]);

  if (!dept) {
    return (
      <section>
        <p>Department not found.</p>
      </section>
    );
  }

  return (
    <div>
      <section>
        <h1>{dept.name}</h1>
        <p>{dept.description}</p>
      </section>

      <section className="dept-detail-list">
        <h3>Courses Offered</h3>
        <ul>
          {dept.courses.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="dept-detail-list">
        <h3>Faculty</h3>
        <ul>
          {dept.faculty.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="dept-detail-list">
        <h3>Labs / Facilities</h3>
        <ul>
          {dept.labs.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DepartmentDetail;
