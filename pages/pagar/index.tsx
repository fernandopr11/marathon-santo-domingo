import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';

const DragAndDrop = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
          Carga aquí tu comprobante de pago
        </h1>

        <div
          {...getRootProps({
            className: `border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300 dark:border-gray-500'} border-dashed rounded-lg p-6 mb-4 flex justify-center items-center cursor-pointer bg-gray-200 dark:bg-gray-700`,
          })}
        >
          <input {...getInputProps()} />
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {isDragActive
              ? 'Suelta aquí'
              : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'}
          </p>
        </div>

        {selectedFile && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Vista previa:</p>
            <div className="flex justify-center">
              <div className="max-w-xs">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              // Aquí puedes agregar la lógica para enviar el archivo
              alert('Enviar archivo');
            }}
            disabled={!selectedFile}
          >
            Enviar
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DragAndDrop;
