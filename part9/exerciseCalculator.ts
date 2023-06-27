interface Result {
	periodLength: number,
	trainingDays: number,
	target: number,
	average: number,
	success: boolean,
	rating: number,
	ratingDescription: string
}

const calculateExercises = (array: number[], target: number) : Result => {
	const result : Result = {
		periodLength: 0,
		trainingDays: 0,
		success: false,
		rating: 0,
		ratingDescription: "",
		target: target,
		average: 0,
	};
	result.periodLength = array.length;
	let totalHours: number = 0;
	array.forEach(a=>{
		if (a > 0)
			result.trainingDays++;
		totalHours += a;
	});
	result.average = totalHours / result.periodLength;
	if (result.average >= target)
		result.success = true;
	if (result.average >= target)
		result.rating = 3;
	else if (result.average > target - 0.5)
		result.rating = 2;
	else
		result.rating = 1;
	if (result.rating == 3)
		result.ratingDescription = "Congrats! You achieved your objectives";
	else if (result.rating == 2)
		result.ratingDescription = "not too bad but could be better";
	else
		result.ratingDescription = "Too bad. You ,need to put more effort";

	return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));