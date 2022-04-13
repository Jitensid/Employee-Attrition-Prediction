import CSVReader from 'react-csv-reader';

const CSVFileReader = ({ setCSVData }) => {
	const handleForce = (data, fileInfo) => {
		setCSVData(data.map(Object.values));
	};

	const parseOptions = {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
	};

	return (
		<CSVReader
			cssClass='react-csv-input'
			label='Upload Employees CSV Data'
			onFileLoaded={handleForce}
			parserOptions={parseOptions}
		/>
	);
};

export default CSVFileReader;
