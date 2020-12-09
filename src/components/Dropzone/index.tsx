import React, { ChangeEvent, useRef, useEffect, useCallback, useState } from 'react';
import { useDropzone } from "react-dropzone";
import { useField } from '@unform/core';
import { BodyDropzone } from './styles';

interface Props {
  name: string;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;
const Dropzone: React.FC<InputProps> = ({  name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop
  });
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      }
    })
  }, [fieldName, registerField]);

  return (
    <BodyDropzone className="view-img" {...getRootProps()}>
      <main>

        <input type="file"
          ref={inputRef}
          onChange={handlePreview}
          {...getInputProps()}
          accept="image/*"
          id={fieldName}
          {...rest}
        />
        {preview ? <img src={preview} alt="Preview" width="100" /> : (
          <>
            <label>Fazer Upload de Imagem</label>
            <p>ou</p>
            {isDragActive ? (
              <p>Solte a imagem</p>
            ) : (
                <p>Arraste o arquivo para cá</p>
              )}
            <p>Tamanho mínimo de 805x632px</p>
          </>
        )}
      </main>
      {error && <span>{error}</span>}
    </BodyDropzone>
  );
};

export default Dropzone;
