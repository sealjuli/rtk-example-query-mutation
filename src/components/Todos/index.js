import { useGetToDosQuery } from "../../services/toDo";
import Task from "../Task";
const Todos = () => {
  const { data, error, isLoading } = useGetToDosQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`Error ${error.status}: ${error.data.message}`}</p>;
  }

  return (
    <div>
      <ul>{data && data.map((item) => <Task key={item.id} {...item} />)}</ul>
    </div>
  );
};

export default Todos;
