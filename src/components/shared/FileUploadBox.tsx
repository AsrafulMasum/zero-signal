import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';

export default function FileUploadBox({
  getFile,
  title,
  subtitle,
  file // new prop: can be File object or URL string
}: {
  getFile: (file: any) => void;
  title: string;
  subtitle?: string;
  file?: File | string | null;
}) {
  const randId = Math.floor(Math.random() * 1000);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  // Set preview from initial file prop
  useEffect(() => {
    if (file instanceof File) {
      setPreviewUrl(URL.createObjectURL(file));
      setFileType(file.type);
    } else if (typeof file === 'string') {
      setPreviewUrl(file);
      // Guess type from extension
      if (file.match(/\.(jpg|jpeg|png|gif|svg)$/i)) setFileType('image');
      else if (file.match(/\.(mp4|webm|ogg)$/i)) setFileType('video');
      else setFileType(null);
    } else {
      setPreviewUrl(null);
      setFileType(null);
    }
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      getFile(newFile);
      setFileType(newFile.type);
      setPreviewUrl(URL.createObjectURL(newFile));
    }
  };

  return (
    <label htmlFor={`file-${randId}`} className="border-2 block border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary cursor-pointer">
      {previewUrl ? (
        fileType?.startsWith('image') ? (
          <img src={previewUrl} alt="preview" className="w-full h-32 object-contain mb-2 mx-auto" />
        ) : fileType?.startsWith('video') || fileType === 'video' ? (
          <video src={previewUrl} controls className="w-full h-32 object-contain mb-2 mx-auto" />
        ) : null
      ) : (
        <>
          <UploadOutlined className="text-4xl text-gray-400 mb-2" />
          <p className="text-gray-400">{title}</p>
          <p className="text-xs text-yellow-500 mt-2">{subtitle}</p>
        </>
      )}
      <input type="file" id={`file-${randId}`} onChange={handleChange} className="!hidden" />
    </label>
  );
}