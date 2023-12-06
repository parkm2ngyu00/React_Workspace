import { useState } from "react";

import Header from "./components/Header";
import UserInput from "./Components/UesrInput";
import Results from "./Components/Result";

function App() {
	const [userInput, setUserInput] = useState({
		initialInvestment: 10000,
		annualInvestment: 1200,
		expectedReturn: 6,
		duration: 10,
	});

	const inputIsValid = userInput.duration >= 1;

	function handleChange(inputIdentifier, newValue) {
		setUserInput((prevUserInput) => {
			return {
				...prevUserInput,
				[inputIdentifier]: +newValue,
			};
		});
	}

	return (
		<>
			<Header />
			<UserInput userInput={userInput} onChangeInput={handleChange} />
			{!inputIsValid && (
				<p className="center">Please enter a duration greater than zero.</p>
			)}
			{inputIsValid && <Results userInput={userInput} />}
		</>
	);
}

export default App;
