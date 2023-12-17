import React from 'react';

const formStyle = {
  display: 'flex',
  // TS does not like this as a string, which may not fall under the FlexDirection union
  flexDirection: 'row' as 'row',
  gap: '10px',
};

function NewTodoForm() {
  return (
    <form className="box" style={formStyle}>
      <input type="text" className="input" placeholder="Add a new To Do" />
      <button className="button" type="button">
        Add
      </button>
    </form>
  );
}

export default NewTodoForm;
