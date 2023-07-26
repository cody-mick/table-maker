import data from "../sample-data/samples.json";

const DocksideDailySummary = () => {
	const samples = data;
	const reportDate = "7/11/2023";
	const convertToPercentage = (num: number) => {
		return (num * 100).toFixed(2);
	};

	const averages = samples.reduce((acc: any, obj: any) => {
		const cellar = obj.cellar;
		if (!acc[cellar]) {
			acc[cellar] = {
				cellar: cellar,
				counts: 0,
				totalGrossWeight: 0,
				totalNetWeight: 0,
				defectCount: 0,
				summaryCTN: 0,
				summaryFourToEightOz: 0,
				summaryGreen: 0,
				summaryHH: 0,
				summaryOnes: 0,
				summaryProcess: 0,
				summaryTare: 0,
				totalFourToEightOz: 0,
				totalOverEightOz: 0,
			};
		}

		acc[cellar].counts++;
		acc[cellar].variety = obj.variety;
		acc[cellar].totalGrossWeight += obj.netCalcs.grossWeight;
		acc[cellar].totalNetWeight += obj.netCalcs.netWeight;
		acc[cellar].defectCount += obj.defectCount;
		acc[cellar].summaryCTN +=
			obj.netCalcs.overEightOz /
			(obj.netCalcs.fourToEightOz + obj.netCalcs.overEightOz);
		acc[cellar].summaryFourToEightOz += obj.netCalcs.fourToEightOz;
		acc[cellar].summaryGreen += obj.netCalcs.green;
		acc[cellar].summaryHH +=
			obj.defects.hollowHeartOverEightOz +
			obj.defects.hollowHeartUnderEightOz;
		acc[cellar].summaryOnes +=
			obj.netCalcs.fourToEightOz + obj.netCalcs.overEightOz;
		acc[cellar].summaryProcess += obj.netCalcs.process + obj.netCalcs.green;
		acc[cellar].summaryTare += obj.netCalcs.dirt;
		acc[cellar].totalFourToEightOz += obj.netCalcs.fourToEightOz;
		acc[cellar].totalOverEightOz += obj.netCalcs.overEightOz;

		return acc;
	}, {});

	const summaryByCellar = Object.values(averages).map((cellar: any) => {
		const counts = cellar.counts;
		const totalNetWeight = cellar.totalNetWeight;
		const totalGrossWeight = cellar.totalGrossWeight;
		return {
			cellar: cellar.cellar,
			counts: counts,
			variety: cellar.variety,
			defectCount: cellar.defectCount / counts,
			summaryCTN:
				cellar.totalOverEightOz /
				(cellar.totalFourToEightOz + cellar.totalOverEightOz),
			summaryFourToEightOz:
				cellar.totalFourToEightOz /
				(cellar.totalFourToEightOz + cellar.totalOverEightOz),
			summaryGreen: cellar.summaryGreen / totalNetWeight,
			summaryHH: cellar.summaryHH / totalNetWeight,
			summaryOnes: cellar.summaryOnes / totalNetWeight,
			summaryProcess: cellar.summaryProcess / totalNetWeight,
			summaryTare: cellar.summaryTare / totalGrossWeight,
		};
	});

	console.log("AVERAGES: ", averages);
	console.log("CELLAR SUMMARY: ", summaryByCellar);
	return (
		<div className="table-container">
			<h1>Dockside Entries by Cellar for {reportDate}</h1>
			<div className="header-subtext">
				<p>Document # 1.05.01A</p>
				<p>Prepared By _____________________</p>
				<p>Approved By _____________________</p>
			</div>
			{summaryByCellar.map((cellar: any) => (
				<table>
					<caption>{`${cellar.cellar} (${cellar.variety})`}</caption>
					<thead>
						<tr>
							<th>Time</th>
							<th>Defects</th>
							<th>% HH</th>
							<th>% Tare</th>
							<th>% Process</th>
							<th>% Green</th>
							<th>% 4-8 oz</th>
							<th>% CTN</th>
							<th>% #1's</th>
							<th>Quality Concerns</th>
							<th>Food Safety Concerns</th>
							<th>Released for Production</th>
						</tr>
					</thead>
					<tbody>
						{samples.map((sample: any) =>
							sample.cellar === cellar.cellar ? (
								<tr>
									<td>
										{new Date(
											sample.date
										).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>{sample.defectCount}</td>
									<td>
										{`${convertToPercentage(
											sample.defects
												.hollowHeartUnderEightOz +
												sample.defects
													.hollowHeartOverEightOz
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryTare
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryProcess
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryGreen
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryFourToEightOz
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryCTN
										)}%`}
									</td>
									<td>
										{`${convertToPercentage(
											sample.summaryOnes
										)}%`}
									</td>
									<td>{sample.concerns.qualityConcerns}</td>
									<td>
										{sample.concerns.foodSafetyConcerns}
									</td>
									<td>
										{sample.concerns.releasedForProduction}
									</td>
								</tr>
							) : null
						)}
						<tr className="summary-row">
							<td>{`${cellar.counts} entries`}</td>
							<td>{cellar.defectCount.toFixed(2)}</td>
							<td>{`${convertToPercentage(
								cellar.summaryHH
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryTare
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryProcess
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryGreen
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryFourToEightOz
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryCTN
							)}%`}</td>
							<td>{`${convertToPercentage(
								cellar.summaryOnes
							)}%`}</td>
						</tr>
					</tbody>
				</table>
			))}
		</div>
	);
};

export default DocksideDailySummary;
