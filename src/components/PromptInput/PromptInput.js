import React from 'react';

const promptInput = props => {
  return (
    <input 
      autoFocus={true}
      className={props.className || "inputPrompt"}
      name="command"
      onChange={props.onUserPromptInputChange}
      onKeyPress={e => (e.key === 'Enter') ? props.onEnterPressed() : null}
      value={props.command}
    />
  );
}

export default promptInput;