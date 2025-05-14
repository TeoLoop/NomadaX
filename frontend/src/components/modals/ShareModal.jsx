import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import '../../styles/ShareModal.css';

export default function ShareModal({ hotel, onClose }) {
  if (!hotel) return null;

  const name = hotel.name;
  const message = hotel.description;
  const image = hotel.images?.[0]?.url || '';
  const url = `${window.location.origin}/hotel/${hotel.id}`;

  const handleShare = (platform) => {
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${name} - ${message}`)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${name} - ${message} ${url}`)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Compartir hotel</h2>

        <div className="hotel-preview">
          <img src={image} alt={name} className="hotelimage" />
          <h3 className="hotel-name">{name}</h3>
          <p className="hotel-description">{message}</p>
        </div>

        <div className="modal-buttons">
          <button className="btn facebook" onClick={() => handleShare('facebook')}>
            <FaFacebookF /> Facebook
          </button>
          <button className="btn twitter" onClick={() => handleShare('twitter')}>
            <FaTwitter /> Twitter
          </button>
          <button className="btn whatsapp" onClick={() => handleShare('whatsapp')}>
            <FaWhatsapp /> WhatsApp
          </button>
        </div>

        <button onClick={onClose} className="modal-close">Cerrar</button>
      </div>
    </div>
  );
}
