import { useState } from "react";
import { useSnapshot } from "valtio";
import { addItem, state, changeName } from "../state/state";

const Valtio = () => {
  const snap = useSnapshot(state);

  const [todo, setTodo] = useState<string>("");

  return (
    <div>
      <h3>TodoList</h3>
      <input type="text" onChange={(e) => setTodo(e.target.value)} />
      <input type="submit" value="追加" onClick={() => addItem(todo)} />
      {snap.todoList.map((todo) => {
        return <p key={todo}>・{todo}</p>;
      })}
      <h3>changename</h3>
      {snap.name}
      <br />
      <button onClick={() => changeName("kozawa")}>change</button>
    </div>
  );
};

export default Valtio;
