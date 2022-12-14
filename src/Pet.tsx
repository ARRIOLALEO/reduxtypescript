import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
interface Iprops {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}
const Pet: FunctionComponent<Iprops> = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (Array.isArray(images) && images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} data-testid="thumbnail" />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
