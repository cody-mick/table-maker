import data from "../sample-data/samples.json";

const DocksideEntriesByCellar = () => {
	const samples = data;
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
		<div>
			<div className="table-container">
				<h1>Dockside Entries by Cellar for 7/11/2023</h1>
				<div className="header-subtext">
					<p>Document # 1.05.01A</p>
					<p>Prepared By _____________________</p>
					<p>Approved By _____________________</p>
				</div>
				<table>
					<caption>
						{`${summaryByCellar[0].cellar} (${summaryByCellar[0].variety})`}
					</caption>
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
						{samples.map((s: any) => (
							<tr>
								<td>
									{new Date(s.date).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</td>
								<td>{s.defectCount}</td>
								<td>
									{`${convertToPercentage(
										s.defects.hollowHeartUnderEightOz +
											s.defects.hollowHeartOverEightOz
									)}%`}
								</td>
								<td>
									{`${convertToPercentage(s.summaryTare)}%`}
								</td>
								<td>
									{`${convertToPercentage(
										s.summaryProcess
									)}%`}
								</td>
								<td>
									{`${convertToPercentage(s.summaryGreen)}%`}
								</td>
								<td>
									{`${convertToPercentage(
										s.summaryFourToEightOz
									)}%`}
								</td>
								<td>
									{`${convertToPercentage(s.summaryCTN)}%`}
								</td>
								<td>
									{`${convertToPercentage(s.summaryOnes)}%`}
								</td>
								<td>{s.concerns.qualityConcerns}</td>
								<td>{s.concerns.foodSafetyConcerns}</td>
								<td>{s.concerns.releasedForProduction}</td>
							</tr>
						))}
						<tr className="summary-row">
							<td>{`${samples.length} Entries`}</td>
							<td>{`${Math.round(
								summaryByCellar[0].defectCount
							)}`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryHH
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryTare
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryProcess
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryGreen
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryFourToEightOz
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryCTN
							)}%`}</td>
							<td>{`${convertToPercentage(
								summaryByCellar[0].summaryOnes
							)}%`}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DocksideEntriesByCellar;
