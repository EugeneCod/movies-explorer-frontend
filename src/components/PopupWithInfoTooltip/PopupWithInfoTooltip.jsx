import imageApproval from '../../images/popup__info-image_approval.svg';
import imageFailure from '../../images/popup__info-image_failure.svg';
import { Popup } from '../';


function PopupWithInfoTooltip({ isOpen, onClose, data }) {
  const images = {approval: imageApproval, failure: imageFailure}

  return (
    <Popup
      isOpen = {isOpen}
      onClose = {onClose}
      name = "info"
    >
      <div className="info-tooltip">
          <img className="info-tooltip__image" src={images[data.IMAGE_NAME]} alt="Инфографика" />
          <p className="info-tooltip__text">
            {data.TEXT}
          </p>
        </div>
    </Popup>
  )
}

export default PopupWithInfoTooltip