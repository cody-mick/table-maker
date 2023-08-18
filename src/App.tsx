import "./App.css";
import DocksideDailySummary from "./components/DocksideDailySummary";
import DocksideEntriesByCellar from "./components/DocksideEntriesByCellarOld";
import DocksideReport from "./components/DocksideReport";
import NavBar from "./components/NavBar";
import Testing from "./components/Testing";

function App() {
	return (
		<div className="app">
			{/* <DocksideDailySummary /> */}
			<DocksideReport />
		</div>
	);
}
export default App;
