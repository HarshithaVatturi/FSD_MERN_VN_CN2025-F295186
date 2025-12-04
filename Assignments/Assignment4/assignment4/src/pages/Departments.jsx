import { useEffect, useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import departmentsData from "../data/departments.json";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Simulate loading data from local JSON
    setDepartments(departmentsData);
  }, []);

  return (
    <div>
      <section>
        <h1>Departments</h1>
        <p>
          Our college offers a variety of departments spanning engineering and
          management, each with strong faculty and modern facilities.
        </p>

        <div className="dept-grid">
          {departments.map((d) => (
            <DepartmentCard dept={d} key={d.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Departments;
