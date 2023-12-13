import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
	const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
	const storedPlaces = storedIds.map((id) =>
		AVAILABLE_PLACES.find((place) => place.id === id)
	);
	const [isOpen, setIsOpen] = useState(false);
	const selectedPlace = useRef();
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(
				AVAILABLE_PLACES,
				position.coords.latitude,
				position.coords.longitude
			);

			setAvailablePlaces(sortedPlaces);
		});
	}, []);

	function handleStartRemovePlace(id) {
		setIsOpen(true);
		selectedPlace.current = id;
	}

	function handleStopRemovePlace() {
		setIsOpen(false);
	}

	function handleSelectPlace(id) {
		setPickedPlaces((prevPickedPlaces) => {
			if (prevPickedPlaces.some((place) => place.id === id)) {
				return prevPickedPlaces;
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [place, ...prevPickedPlaces];
		});

		const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
		// id가 중복되지 않는 경우에만 추가
		if (storedIds.indexOf(id) === -1) {
			localStorage.setItem("selectedPlace", JSON.stringify([id, ...storedIds]));
		}
	}

	// 컴포넌트가 리렌더링 되어도 함수를 새롭게 생성하지 않음
	const handleRemovePlace = useCallback(function handleRemovePlace() {
		setPickedPlaces((prevPickedPlaces) =>
			prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
		);
		setIsOpen(false);

		const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
		localStorage.setItem(
			"selectedPlace",
			JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
		);
	}, []);

	return (
		<>
			<Modal open={isOpen} onClose={handleStopRemovePlace}>
				{isOpen && (
					<DeleteConfirmation
						onCancel={handleStopRemovePlace}
						onConfirm={handleRemovePlace}
					/>
				)}
			</Modal>

			<header>
				<img src={logoImg} alt="Stylized globe" />
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to visit or
					you have visited.
				</p>
			</header>
			<main>
				<Places
					title="I'd like to visit ..."
					fallbackText={"Select the places you would like to visit below."}
					places={pickedPlaces}
					onSelectPlace={handleStartRemovePlace}
				/>
				<Places
					title="Available Places"
					places={availablePlaces}
					fallbackText="Sorting places by distance..."
					onSelectPlace={handleSelectPlace}
				/>
			</main>
		</>
	);
}

export default App;
