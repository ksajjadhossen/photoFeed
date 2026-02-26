const { default: Modal } = require("@/components/Modal");
const { default: PhotoDetails } = require("@/components/PhotoDetails");

const PhotoModal = ({ params: { id, lang } }) => {
  return (
    <Modal>
      <PhotoDetails id={id} lang={lang}></PhotoDetails>
    </Modal>
  );
};
export default PhotoModal;
