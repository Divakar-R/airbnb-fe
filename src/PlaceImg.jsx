export default function PlaceImg({ place, index = 0, className }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={import.meta.env.VITE_IMAGE_URL + place.photos[index]}
      alt=""
    />
  );
}
