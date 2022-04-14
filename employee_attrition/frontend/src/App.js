import { useState } from 'react';
import './App.css';
import CSVFileReader from './components/CSVFileReader/CSVFileReader';
import DataTable from './components/DataTable/DataTable';
import reactlogo from './reactlogo.png';
import attritionLogo from './attrition.png';

function App() {
	const [CSVData, setCSVData] = useState(null);

	return (
		<div>
			{CSVData === null ? (
				<div className='web_banner'>
					<img src={attritionLogo} />
					<CSVFileReader setCSVData={setCSVData} />
				</div>
			) : (
				<DataTable CSVData={CSVData} />
			)}
		</div>
	);
}

export default App;
