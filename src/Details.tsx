import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { Animal, PetAPIResponse } from "./AnimalTypes";
import { connect } from "react-redux";
import { RootState } from "./store";
interface props {
  params: {
    id?: string | undefined;
  };
  theme: string;
}
class Details extends Component<props> {
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    if (!this.props.params.id) {
      return;
    }
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
      );
      const json = (await res.json()) as PetAPIResponse;
      this.setState(Object.assign({ loading: false }, json.pets[0]));
    } catch (error) {
      console.log("error");
    }
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  theme: state.RootReducer.theme.theme,
});

export const ReduxWrapperDetails = connect(mapStateToProps)(Details);
const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <ReduxWrapperDetails params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
