const defaultBag = [
	"j",
	"i",
	"l",
	"o",
	"z",
	"s",
	"t"
];

let actualBag = defaultBag.slice();

const randomGenerator = () => {

	if (actualBag.length === 0)
		actualBag = defaultBag.slice();
	let randIndex = Math.floor(Math.random() * actualBag.length);
	return (actualBag.splice(randIndex, 1))[0];

};

export default randomGenerator;
