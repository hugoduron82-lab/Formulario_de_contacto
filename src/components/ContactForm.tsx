import React, { useState } from 'react';
import InputField from './InputField';
import SuccessAlert from './SuccessAlert';

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.trim().length < 3) return 'Mínimo 3 caracteres';
        return '';
      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        if (!validateEmail(value)) return 'Email inválido (debe incluir @ y .)';
        return '';
      case 'mensaje':
        if (!value.trim()) return 'El mensaje es obligatorio';
        if (value.trim().length < 10) return 'Mínimo 10 caracteres';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = (): boolean => {
    return (
      formData.nombre.trim().length >= 3 &&
      validateEmail(formData.email) &&
      formData.mensaje.trim().length >= 10
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid()) {
      console.log('Datos enviados:', formData);
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({ nombre: '', email: '', mensaje: '' });
        setErrors({});
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Contáctame</h2>
            <p className="text-blue-100 text-sm mt-1">
              ¿Tienes un proyecto? ¡Escríbeme!
            </p>
          </div>

          <div className="p-6">
            {showSuccess ? (
              <SuccessAlert />
            ) : (
              <form onSubmit={handleSubmit}>
                <InputField
                  id="nombre"
                  label="Nombre"
                  type="text"
                  value={formData.nombre}
                  placeholder="Ej: Carlos Pérez"
                  error={errors.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  placeholder="Ej: carlos@email.com"
                  error={errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="mb-4">
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    placeholder="Escribe tu mensaje aquí..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`
                      w-full px-4 py-2 border rounded-lg outline-none resize-none
                      ${errors.mensaje 
                        ? 'border-red-500' 
                        : formData.mensaje 
                          ? 'border-green-500' 
                          : 'border-gray-300'
                      }
                    `}
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Requisitos:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <span className={`mr-2 ${formData.nombre.length >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.nombre.length >= 3 ? '✓' : '○'}
                      </span>
                      <span className={formData.nombre.length >= 3 ? 'text-gray-700' : 'text-gray-500'}>
                        Nombre: mínimo 3 caracteres
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-2 ${validateEmail(formData.email) ? 'text-green-600' : 'text-gray-400'}`}>
                        {validateEmail(formData.email) ? '✓' : '○'}
                      </span>
                      <span className={validateEmail(formData.email) ? 'text-gray-700' : 'text-gray-500'}>
                        Email: debe incluir @ y .
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-2 ${formData.mensaje.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.mensaje.length >= 10 ? '✓' : '○'}
                      </span>
                      <span className={formData.mensaje.length >= 10 ? 'text-gray-700' : 'text-gray-500'}>
                        Mensaje: mínimo 10 caracteres
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`
                    w-full py-2 px-4 rounded-lg text-white font-medium
                    ${isFormValid() 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;