import { Button } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { useState } from 'react';

const RowButton = ({ value, tableMeta, updateValue }) => {
	const [showButton, setShowButton] = useState(true);
	const [modelResult, setModelResult] = useState('');

	const makeModelPredictionAPI = (modelInputGetParameters) => {
		axios
			.get('make_prediction/', {
				params: modelInputGetParameters,
			})
			.then((response) => {
				console.log(response.data);

				setShowButton(false);
				setModelResult(response.data.Score);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleRowButtonClick = () => {
		console.log({ value });
		console.log({ tableMeta });
		console.log({ updateValue });

		let modelInputData = tableMeta.rowData;

		const modelInputGetRequestData = Object.assign({}, modelInputData);

		console.log(modelInputGetRequestData);

		const modelInputGetParameters = {};

		for (const [key, value] of Object.entries(modelInputGetRequestData)) {
			modelInputGetParameters[key] = value;
		}

		makeModelPredictionAPI(modelInputGetParameters);
	};

	return (
		<>
			{showButton === true ? (
				<Button onClick={handleRowButtonClick} variant='contained'>
					Predict
				</Button>
			) : (
				<p> {modelResult} </p>
			)}
		</>
	);
};

const DataTable = ({ CSVData }) => {
	const columns = [
		'Age',
		'BusinessTravel',
		'DailyRate',
		'Department',
		'DistanceFromHome',
		'Education',
		'EducationField',
		'EnvironmentSatisfaction',
		'Gender',
		'HourlyRate',
		'JobInvolvement',
		'JobLevel',
		'JobRole',
		'JobSatisfaction',
		'MaritalStatus',
		'MonthlyIncome',
		'MonthlyRate',
		'NumCompaniesWorked',
		'OverTime',
		'PercentSalaryHike',
		'PerformanceRating',
		'RelationshipSatisfaction',
		'StockOptionLevel',
		'TotalWorkingYears',
		'TrainingTimesLastYear',
		'WorkLifeBalance',
		'YearsAtCompany',
		'YearsInCurrentRole',
		'YearsSinceLastPromotion',
		'YearsWithCurrManager',
		{
			name: 'Prediction',
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<>
							<RowButton
								value={value}
								tableMeta={tableMeta}
								updateValue={updateValue}
							/>
						</>
					);
				},
			},
		},
	];

	const options = {
		filter: false,
		print: false,
		rowsPerPage: 50,
		rowsPerPageOptions: [10, 50, 100],
		selectableRowsHideCheckboxes: true,
	};

	return (
		<MUIDataTable
			title={'Employee List'}
			data={CSVData}
			columns={columns}
			options={options}
		/>
	);
};

export default DataTable;
