import { useState, useRef } from "react";

export default function Player() {
	const input = useRef();

	const [playerName, setPlayerName] = useState("");

	function handleClick() {
		setPlayerName(input.current.value);
		input.current.value = "";
	}

	return (
		<section id="player">
			<h2>Welcome {playerName ?? "unknown entity"}</h2>
			<p>
				<input ref={input} type="text" />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
