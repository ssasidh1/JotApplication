import React, { useState } from 'react';
import styles from "./RichTextEditor.module.css"
export function RichTextEditor({body,setBody}) {
  
  const [formattingOptions, setFormattingOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleFormattingOption = (option) => {
    setFormattingOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
    const formattedBody = applyformatting(body);
    setBody(formattedBody)
  }
  const applyformatting= (content)=>{
    if (formattingOptions.bold) {
      content = `<b>${content}</b>`;
    }
    if (formattingOptions.italic) {
      content = `<i>${content}</i>`;
    }
    if (formattingOptions.underline) {
      content = `<u>${content}</u>`;
    }
    return content;
  };
  

  return (
    <div>
      <div className={styles["menu"]}>
        <button
          onClick={() => toggleFormattingOption('bold')}
          style={{ fontWeight: formattingOptions.bold ? 'bold' : 'normal' }}
        >
          Bold
        </button>
        <button
          onClick={() => toggleFormattingOption('italic')}
          style={{ fontStyle: formattingOptions.italic ? 'italic' : 'normal' }}
        >
          Italic
        </button>
        <button
          onClick={() => toggleFormattingOption('underline')}
          style={{ textDecoration: formattingOptions.underline ? 'underline' : 'none' }}
        >
          Underline
        </button>
      </div>

     
    </div>
  );
}

export default RichTextEditor;
