import { useState } from "react";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	};

	const handleChange = (event) => {
		setPlayerName(event.target.value);
	};

	let editName = <span className="player-name">{playerName}</span>;
	let btnCaption = "Edit";

	if (isEditing) {
		editName = (
			<input
				type="text"
				value={playerName}
				onChange={handleChange}
				required
			></input>
		);
		btnCaption = "Save";
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{editName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{btnCaption}</button>
		</li>
	);
}
