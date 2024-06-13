import { Box } from '@mui/material';
import { useState } from 'react';
import { FC } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from 'quill-image-drop-module';

interface TextEditorProps {
  initialText?: string;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="">
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="" />
    </select>
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option />
    </select>
    <select className="ql-align" defaultValue="justify">
      <option value="center"></option>
      <option value="right"></option>
      <option value="justify"></option>
    </select>
  </div>
);

export const TextEditor: FC<TextEditorProps> = (props) => {
  Quill.register('modules/imageResize', ImageResize);
  Quill.register('modules/imageDrop', ImageDrop);
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
    imageResize: {
      parchment: Quill.import('parchment'),
    },
    imageDrop: true,
  };
  const { initialText, placeholder, onChange = () => {}, readonly = false } = props;
  const [text, setText] = useState<string>(initialText);
  const handleChange = (text: string) => {
    setText(text);
    onChange(text);
  };

  return (
    <>
      <Box
        sx={{
          border: '1px solid #3769ff',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: !readonly ? 'block' : 'none' }}>
          <CustomToolbar />
        </div>
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          value={text}
          placeholder={placeholder}
          readOnly={readonly}
          modules={modules}
        />
      </Box>
    </>
  );
};
