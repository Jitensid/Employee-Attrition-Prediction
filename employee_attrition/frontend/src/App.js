import { useState } from 'react';
import './App.css';
import CSVFileReader from './components/CSVFileReader/CSVFileReader';
import DataTable from './components/DataTable/DataTable';

function App() {
	const [CSVData, setCSVData] = useState(null);

	return (
		<div>
			{CSVData === null ? (
				<CSVFileReader setCSVData={setCSVData} />
			) : (
				<DataTable CSVData={CSVData} />
			)}
		</div>
	);
}

export default App;
