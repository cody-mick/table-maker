import { useEffect, useState } from "react";
import SampleData from "../types/SampleData";

const Testing = () => {
	const [data, setData] = useState<SampleData>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/");
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	console.log(data);

	return (
		<div>
			<p>{data.name}</p>
			<p>{data.age}</p>
			<p>{data.email}</p>
		</div>
	);
};

export default Testing;
