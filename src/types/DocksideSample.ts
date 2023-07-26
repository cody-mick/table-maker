type DocksideSample = {
	date: string;
	type: string;
	inspector: string;
	cellar: string;
	fieldNo: string;
	tubeNo: string;
	truckNo: string;
	sampleTemp: string;
	variety: string;
	defectCount: number;
	summaryHH: number;
	summaryTare: number;
	summaryProcess: number;
	summaryGreen: number;
	summaryFourToEightOz: number;
	summaryCTN: number;
	summaryOnes: number;
	netCalcs: {
		grossWeight: number;
		dirt: number;
		process: number;
		green: number;
		fourToEightOz: number;
		overEightOz: number;
		netWeight: number;
	};
	defects: {
		ringRot: number;
		pressureBruise: number;
		internalBlack: number;
		green: number;
		nematode: number;
		hollowHeartUnderEightOz: number;
		hollowHeartOverEightOz: number;
		netNecrosis: number;
		secondGrowth: number;
		shape: number;
		softRot: number;
		waterRot: number;
		lenticles: number;
		freshBruise: number;
		oldBruise: number;
		jellyEnd: number;
		growthCrack: number;
		undersize: number;
		externalDiscoloration: number;
		rhizoc: number;
		blight: number;
		internalBrown: number;
		airCrack: number;
		pinkEye: number;
		foldedEnd: number;
		rodentDamage: number;
		sprout: number;
		corky: number;
		freezing: number;
		scab: number;
		wireWorm: number;
		surfaceCrack: number;
		immaturity: number;
		silverScurf: number;
	};
	concerns: {
		qualityConcerns: string;
		foodSafetyConcerns: string;
		releasedForProduction: string;
		managementInitial: string;
	};
};

export default DocksideSample;
