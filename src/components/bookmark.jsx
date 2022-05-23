import { 
  useParams,
  useNavigate,
  useLocation,
 } from "react-router-dom";
import { getDog, deleteDog } from "../data";

export default function Bookmark() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let dog = getDog(parseInt(params.bookmarkId, 10 ));
  console.log(location)
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {dog.amount}</h2>
      <p>
        {dog.name}: {dog.number}
      </p>
      <p>Due Date: {dog.due}</p>
      <p>
        <button
          onClick={() => {
            deleteDog(dog.number);
            navigate("/bookmarks" + location.search);
          }}
      >
        Delete
      </button>
      </p>
    </main>
  );
}