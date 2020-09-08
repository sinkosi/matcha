
distance(-26.270759299999998, 28.1122679, -26.0, 28.0);

function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		console.log("1");
		return 0;
	}
	else {
		console.log("2");
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		console.log("3");
		if (dist > 1) {
			dist = 1;
		}
		console.log("4");
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.853159616;
		console.log("5");
		//return this.dist;

		console.log(dist);
		console.log("6");
	}
}
