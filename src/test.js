var params = {
	nombre: 'oswaldo',
	edad: 20
};

let temp = [];

for (let i in params) {
	temp.push(i + '=' + params[i]);
}
let data = temp.join('&');

console.log(data);

