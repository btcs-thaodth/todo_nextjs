import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import cx from "classnames";
import style from "../styles/Home.module.css";

const Home = () => {
  const [todoItem, setTodoItem] = useState("")
  const [items, setItems] = useState([
    {
      id: 1,
      content: 'Abc',
      done: true
    },
    {
      id: 2,
      content: 'Eyx',
      done: false
    }
  ]);
  const add = () => {
    if (todoItem) {
      setItems([
        {
          id: uuid4(),
          content: todoItem,
          done: false
        },
        ...items
      ])
      setTodoItem("")
    }
  };

  const changeStatus = ({id}) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done
        };
      }
      return item;
    });
    setItems(_items);
  };

  const deleteItem = ({id}) => {
    const _items = items.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    console.log(_items)
    setItems([..._items]);
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      add()
    }
  }
  return (
    <div className="w-3/4 mx-auto">
      <h1 className="pt-10 text-4xl text-center">Todo App</h1>
      <div className="pt-12 text-center">
        <input
          type="text"
          className="text-gray-900 px-14 py-2 text-center"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={eventEnter} />
      </div>
      <ul className="pt-12">
        {
          items.map(({ id, content, done }) => (
            <li key={id} className={cx(style.item, { done: done })}>{content}
              <div className="float-right">
                <button className="py-2 px-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={() => changeStatus({ id })}>
                  {done?"Processing":"Done"}
                </button>
                <button className="py-2 px-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700" onClick={() => deleteItem({id})}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home;
