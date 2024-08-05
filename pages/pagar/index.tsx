import CheckCircleIcon from '@heroicons/react/20/solid/CheckCircleIcon';
import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';
import { useFormik } from 'formik';
import { uploadPaymentProof } from '@/services/api';
import { useRouter } from 'next/router';

const DragAndDrop = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const userId = router.query.user_id as string; // Obtén el user_id de la URL

  // Usa useFormik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      comprobante: null,
    },
    onSubmit: async () => {
      if (!selectedFile || !userId) return;

      try {
        setUploading(true);
        setUploadSuccess(false);
        setUploadError(null);

        // Llama al servicio con el archivo y el userId
        const result = await uploadPaymentProof(userId, selectedFile);

        console.log('Resultado de la carga:', result);

        if (result) {
          setUploadSuccess(true);
          setSelectedFile(null); // Limpia el archivo seleccionado después de la carga exitosa
        } else {
          setUploadError('Error al subir el archivo.');
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setUploadError('Error al subir el archivo.');
      } finally {
        setUploading(false);
      }
    },
  });

  // Configuración de Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      formik.setFieldValue('comprobante', acceptedFiles[0]);
      setSelectedFile(acceptedFiles[0]);
    },
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
    formik.setFieldValue('comprobante', null);
  };

  if (!isMounted) return null;

  return (
    <DefaultLayout showNavbar={false}>
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
              Se validará que el comprobante sea únicamente del Banco Pichincha.
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
            <input
              {...getInputProps()}
              name="comprobante"
              id="comprobante"
              formEncType="multipart/form-data"
            />
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
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                Vista previa:
              </p>
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
              onClick={() => formik.handleSubmit()}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Subiendo...' : 'Enviar'}
            </button>
          </div>

          {uploadSuccess && (
            <div className="mt-4 text-green-500 text-center">
              Comprobante subido exitosamente.
            </div>
          )}
          {uploadError && (
            <div className="mt-4 text-red-500 text-center">{uploadError}</div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DragAndDrop;
