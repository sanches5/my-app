import React from "react";

const ListAs: React.FC<{
  setState: Function;
  deleteTodo: (n:number) => void;
  updateTodo: (n:{
      id: number;
      title: string;
      description: string;
      completed: boolean;
  }) => void;
  list: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
}> = ({ list, setState, deleteTodo, updateTodo }) => {
  const setCheck = (item:{
      id: number;
      title: string;
      description: string;
      completed: boolean;
  }, completed:boolean) => {
      item.completed = completed;
      updateTodo(item)
  };

  return (
    <div>
      <ul>
        {list.map((e, ind) => {
          return (
            <div key={ind}>
              <li>
                <div>{e.title}</div>
                <div>{e.description}</div>
                {e.completed ? (<React.Fragment
                    children={
                      <div style={{ position: "relative", cursor: "pointer", width: 20  }}>
                        <div
                            onClick={() => setCheck(e , !e.completed)}
                            style={{
                            color: "green",
                            position: "absolute",
                            left: "3px",
                            top: "2px",
                            fontSize: "20px",
                          }}
                        >
                          &#10004;
                        </div>
                        <div
                          style={{
                              fontSize: "20px",
                              color: "#8f8686"
                          }}
                        >
                          &#9711;
                        </div>
                      </div>
                    }/>) : (<React.Fragment
                    children={
                      <div
                        onClick={() => setCheck(e, !e.completed)}
                        style={{ fontSize: "20px", color: "#8f8686", cursor: "pointer", width: 20 }}
                      >
                        &#9711;
                      </div>}/>
                )}
                  <button onClick={() => deleteTodo(e.id)}>Delete</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default ListAs;
