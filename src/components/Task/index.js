import {
  useDeleteToDoMutation,
  useCompleteToDoMutation,
  useUpdateToDoMutation,
} from "../../services/toDo";
import { useSelector } from "react-redux";

const Task = ({ id, title, isCompleted }) => {
  const { value: newValue } = useSelector((store) => store.text);
  const [deleteToDo, { isLoading: isDeleting }] = useDeleteToDoMutation();
  const [completeToDo, { isLoading: isCompleting }] = useCompleteToDoMutation();
  const [updateToDo, { isLoading: isUpdating }] = useUpdateToDoMutation();

  if (isDeleting || isCompleting || isUpdating) {
    return <p>Loading...</p>;
  }

  function handleChangeCheckdox() {
    completeToDo(id);
  }

  function handleChangeTask() {
    updateToDo({ id, title: newValue });
  }

  return (
    <li>
      <p>{title}</p>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleChangeCheckdox}
      />
      <button onClick={handleChangeTask}>update</button>
      <button onClick={() => deleteToDo(id)}>delete</button>
    </li>
  );
};

export default Task;
