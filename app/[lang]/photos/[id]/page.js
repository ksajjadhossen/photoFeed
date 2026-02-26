const { default: PhotoDetails } = require("@/components/PhotoDetails");

const PhotoDetailsPage = ({ params: { id, lang } }) => {
  return <PhotoDetails id={id} lang={lang}></PhotoDetails>;
};
export default PhotoDetailsPage;
