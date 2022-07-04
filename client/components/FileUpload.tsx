//Компонент для загрузки файлов
import React, { useRef, JSXElementConstructor, ReactElement } from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: ReactElement<any, string | JSXElementConstructor <any>>
}


//accept - расширение файла, его мы указываем в props
const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    //С помощью ref получаем текущий DOM - элемент
  const ref = useRef<HTMLInputElement>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  }

  return (
    //Исскуственно нажимаем на input
    <div onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {/*accept - ограничение на формат файла*/}
      {children}
    </div>
  );
};

export default FileUpload;
