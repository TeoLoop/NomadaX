import '../styles/Policies.css'
import React from 'react';
import { FaWheelchair, FaShieldAlt, FaHeadset, FaClipboardList } from 'react-icons/fa';

const PolicySection = () => {
  return (
    <div className="policy-container">
      <h2 className="policy-title">Políticas de NomadaX</h2>
      
      <div className="policy-grid">
        <div className="policy-item">
          <FaWheelchair className="policy-icon" />
          <h3 className="policy-subtitle">Accesibilidad</h3>
          <p className="policy-description">
            Nos comprometemos a ofrecer opciones de accesibilidad para todos nuestros huéspedes. 
            Contamos con habitaciones adaptadas y acceso para personas con movilidad reducida.
          </p>
        </div>
        
        <div className="policy-item">
          <FaShieldAlt className="policy-icon" />
          <h3 className="policy-subtitle">Seguridad</h3>
          <p className="policy-description">
            La seguridad de nuestros huéspedes es nuestra prioridad. Todos nuestros hoteles 
            cuentan con sistemas de seguridad avanzados y protocolos de emergencia.
          </p>
        </div>
        
        <div className="policy-item">
          <FaHeadset className="policy-icon" />
          <h3 className="policy-subtitle">Soporte 24/7</h3>
          <p className="policy-description">
            Nuestro equipo de atención al cliente está disponible las 24 horas del día, los 7 días 
            de la semana, para resolver cualquier inconveniente durante tu estadía.
          </p>
        </div>
        
        <div className="policy-item">
          <FaClipboardList className="policy-icon" />
          <h3 className="policy-subtitle">Política de Cancelación</h3>
          <p className="policy-description">
            Si necesitas cancelar tu reserva, puedes hacerlo hasta 48 horas antes de la fecha de 
            llegada para obtener un reembolso completo. Las cancelaciones fuera de este plazo pueden 
            estar sujetas a cargos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
