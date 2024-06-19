import CheckCircleIcon  from '@heroicons/react/20/solid/CheckCircleIcon';
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
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  if (!isMounted) return null;

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex">
        <div className="w-2/5 p-4">
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            Instrucciones para subir el comprobante
          </h2>
          <div className="flex items-start mb-4">
            <div className="mr-2 mt-1">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Solo se aceptan imágenes en formato .png, .jpg y .jpeg.
            </p>
          </div>
          <div className="flex items-start mb-4">
            <div className="mr-2 mt-1">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
             Se validará que el comprobante sea únicamente del Banco Pichincha
            </p>
          </div>
          <div className="flex items-start mb-4">
            <div className="mr-2 mt-1">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              La imagen debe ser claramente visible y legible.
            </p>
          </div>
        </div>
        <div className="w-3/5 p-4 relative">
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
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 relative">
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
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
      </div>
    </DefaultLayout>
  );
};

export default DragAndDrop;
