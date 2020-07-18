import React from 'react';

import PromptInput from '../PromptInput/PromptInput';

const userPrompt = props => {
  let prevCommand = null;
  if (props.type === "log") {
    prevCommand = <span className="inputPrompt">{props.command}</span>
  }

  return (
    <p className="userPrompt">
      <span className="greenText">{props.firstname + (props.lastname !== '' ? '-' : '') + props.lastname}</span>
      @<span className="pinkText">secureChat</span>
      <span className="lightblueText">$</span>

      {props.type !== "log" ? <PromptInput {...props} /> : null}
      {prevCommand}
    </p>
  );
}

export default userPrompt;