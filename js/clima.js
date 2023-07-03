const url = 'https://yahoo-weather5.p.rapidapi.com/weather?lat=-41.08333&long=-62.8&format=json&u=c';
const options = {
	method: 'GET',
	headers: {
		
		'X-RapidAPI-Key': 'b2e0a9362bmshede9cfdd4c524fcp1a1e02jsn8edc85716a8a',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};
const pedirClima = async () =>{
	const solicitudClima = await fetch(url,options);
	let clima = await solicitudClima.json();

	Toastify({
		text: "La temperatura maxima para hoy es de: " + clima.forecasts[0].high + "°",
		duration: 5000,
		newWindow: false,
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
		background: "linear-gradient(to right, #00b09b, #96c93d)",
		}}).showToast();
}

pedirClima();