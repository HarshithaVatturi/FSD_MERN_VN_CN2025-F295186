import { Link } from "react-router-dom";

const DepartmentCard = ({ dept }) => {
  return (
    <div className="dept-card">
      <h3>{dept.name}</h3>
      <p>{dept.description}</p>
      <Link to={`/departments/${dept.id}`}>
        <button>View More</button>
      </Link>
    </div>
  );
};

export default DepartmentCard;
