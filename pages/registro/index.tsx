import DefaultLayout from '@/layouts/default';
import Image from 'next/image';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUser} from '../../services/api';

const isValidCI = (ci: string) => {
  var isNumeric = true;
  var total = 0,
    individual;

  for (var position = 0; position < 10; position++) {
    individual = ci.toString().substring(position, position + 1);

    if (isNaN(parseInt(individual))) {
      isNumeric = false;
      break;
    } else {
      if (position < 9) {
        if (position % 2 === 0) {
          if (parseInt(individual) * 2 > 9) {
            total += 1 + ((parseInt(individual) * 2) % 10);
          } else {
            total += parseInt(individual) * 2;
          }
        } else {
          total += parseInt(individual);
        }
      }
    }
  }

  if (total % 10 !== 0) {
    total = total - (total % 10) + 10 - total;
  } else {
    total = 0;
  }

  if (isNumeric) {
    if (ci.toString().length !== 10) {
      return false;
    }

    if (parseInt(ci, 10) === 0) {
      return false;
    }

    if (total !== parseInt(individual ?? '')) {
      return false;
    }

    return true;
  }

  return false;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .required('Nombre requerido'),
  lastName: Yup.string()
    .min(2, 'Apellido muy corto')
    .max(50, 'Apellido muy largo')
    .required('Apellido requerido'),
  identification: Yup.string()
    .required('Documento de identidad requerido')
    .test('isValidCI', 'Cédula ingresada no es válida', (value) =>
      isValidCI(value)
    ),
  birthDate: Yup.date()
    .max(dayjs().subtract(18, 'years').toDate(), 'Debe ser mayor de 18 años')
    .required('Fecha de nacimiento requerida'),
  gender: Yup.string().required('Sexo requerido'),
  phone: Yup.string()
    .matches(/^09\d{8}$/, 'El teléfono debe comenzar con 09 y tener 10 dígitos')
    .required('Teléfono requerido'),
  nationality: Yup.string().required('Nacionalidad requerida'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  category: Yup.string().required('Categoría requerida'),
  size: Yup.string().required('Talla requerida'),
  terms: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
  newsletter: Yup.bool(),
});

const PreInscripcionForm: React.FC = () => {

  return (
    <DefaultLayout>
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative w-full h-64 mb-6">
          <Image
            src="https://www.lahora.com.ec/wp-content/uploads/2024/04/CARRERA-ATLETICA1.jpg"
            alt="Imagen de la marathon"
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          FORMULARIO DE PRE-INSCRIPCIÓN
        </h2>
        <h3 className="text-xl font-semibold mb-4">INFORMACIÓN GENERAL</h3>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            idDocument: '',
            birthDate: '',
            gender: '',
            phone: '',
            nationality: '',
            email: '',
            category: '',
            size: '',
            terms: false,
            newsletter: false,
          }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await createUser(values); // Llamamos al servicio de Axios
              console.log(response.data);
              toast.success(
                'Su preinscripción a la carrera fue enviada satisfactoriamente'
              );
              resetForm();
            } catch (error) {
              console.error(error);
              toast.error('Hubo un error al enviar su preinscripción');
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Nombres</label>
                  <Field
                    name="firstName"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Apellidos</label>
                  <Field
                    name="lastName"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Documento de identidad</label>
                  <Field
                    name="identification"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="identification"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Fecha de Nacimiento</label>
                  <Field
                    name="birthDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Sexo</label>
                  <Field
                    name="gender"
                    as="select"
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    {/* Añadir más opciones si es necesario */}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Teléfono</label>
                  <Field
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Nacionalidad</label>
                  <Field
                    name="nationality"
                    as="select"
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Ecuador">Ecuador</option>
                    {/* Añadir más opciones si es necesario */}
                  </Field>
                  <ErrorMessage
                    name="nationality"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Datos de contacto y categoría
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Categoría</label>
                  <div className="flex gap-4">
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="42k"
                        className="mr-2"
                      />{' '}
                      42k $60
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="21k"
                        className="mr-2"
                      />{' '}
                      21k $45
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="category"
                        value="10k"
                        className="mr-2"
                      />{' '}
                      10k $30
                    </label>
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Talla</label>
                  <div className="flex gap-4">
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="XS"
                        className="mr-2"
                      />{' '}
                      XS
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="S"
                        className="mr-2"
                      />{' '}
                      S
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="M"
                        className="mr-2"
                      />{' '}
                      M
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="L"
                        className="mr-2"
                      />{' '}
                      L
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="size"
                        value="XL"
                        className="mr-2"
                      />{' '}
                      XL
                    </label>
                  </div>
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Términos y condiciones
              </h3>
              <div className="mb-4">
                <Field type="checkbox" name="terms" className="mr-2" />
                <label>Acepto los términos y condiciones</label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex items-center mb-4">
                <Field type="checkbox" name="newsletter" className="mr-2" />
                <label>Deseo recibir información sobre nuevas carreras</label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded"
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default PreInscripcionForm;
