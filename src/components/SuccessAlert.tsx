import React from 'react';

const SuccessAlert: React.FC = () => {
  return (
    <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center">
      <p className="text-green-700 font-semibold text-lg">
        ¡Gracias por tu mensaje! 🎉
      </p>
      <p className="text-green-600 mt-1">
        Te responderé lo más pronto posible
      </p>
    </div>
  );
};

export default SuccessAlert;