// ksnow.js
/*
Kevin Nelson
Copywrite (c) 2016
*/
/*let euc = function(a,b){
	ret = 0;	
	for(k=0;k<a.length;k++){
		ret+=Math.pow(a[k]-b[k],2);
	}
	return(Math.pow(ret,0.5));
};*/
let keuc = function(a,b,k){
	ret = 0;	
	for(kw=0;kw<k.length;kw++){
		ret+=Math.pow(a[k[kw]]-b[k[kw]],2);
	}
	Math.pow(a[k]-b[k],0.5);
}
let klogic = function klearn(target,known,keys,inquire){
	let fitLevel = 1;
	let m = null;
	let M = null;
	for(k = 0; k < known.length(); k++){
		m = m==null||m>known[k][inquire]?known[k][inquire]:m;
		M = M==null||M<known[k][inquire]?known[k][inquire]:M;
	}
	let range = M-m;
	let moreThanMin = 0;
	for(k = 0; k < known.length(); k++){
		moreThanMin += Math.pow((known[k][inquire]-m)/keuc(target,known[k],keys),fitLevel);
		maxMoreThanMin +=  Math.pow(range/keuc(target,known[k],keys),fitLevel);
	}
	return(m+(moreThanMin/maxMoreThanMin)*range)
}
function mountian(){
	this.weatherStations = []; // points with known weather
	this.hydrants = [];// points whith imputed weather and line activity
	this.bunkers = []; // locations with known line presure and flow
	this.lines = []
	this.hydrantTemp=function(index){
		return(klogic(this.hydrants[index],this.weatherStations,this.hydrants[index]["attrKeys"],"temp"))
	}
	this.hydrantAtmosphericPresure=function(index){
		return(klogic(this.hydrants[index],this.weatherStations,this.hydrants[index]["attrKeys"],"atmosphericPresure"))
	}
	this.hydrantWind=function(index){
		return(klogic(this.hydrants[index],this.weatherStations,this.hydrants[index]["attrKeys"],"wind"))
	}
	this.hydrantAirPressure=function(index){
		return(klogic(this.hydrants[index],this.bunkers,this.hydrants[index]["locationalkeys"],"airPresure"))
	}
	this.hydrantWaterPresure=function(index){
		return(klogic(this.hydrants[index],this.bunkers,this.hydrants[index]["locationalkeys"],"waterPresure"))
	}
}
function hydrant() {
	this.label = "unlabled"
	this.atmospherickeys = ["temp","humidity","atmosphericPresure"];
	this.locationalkeys = ["longitude","latitude","altitude"];
	this.attrKeys =["longitude","latitude","altitude","temp","humidity","atmosphericPresure"];	
	this.valveKeys = ["airPresure","waterPresure"];
	this.setableKeys = ["type","bank"];
	this.temp = null;
	this.atmosphericPresure = null;
	this.humidity = null;
	this.longitude = null;
	this.latitude = null;	
	this.airPresure = null;
	this.waterPresure = null;
	this.wind = null;
	this.bank = null;
	this.type = null;
	this.airCharged = null;
	this.watterCharged = null;
}
hydrant.prototype.fireBaseLog(attrName,attrValue){
	tSamp = new Date().getTime() / 1000;
	var fireRef = new Firebase('https://transcriptoms.firebaseio.com/transcriptomes');
	var newUserRef = fireRef.push();
	newUserRef.set({ attrName: attrValue, "ref":this.label, "time" = tStamp});
}
let line = function(){
	this.hydrants = [];
	this.addHydrant = function(h){
		this.hydrants.push(h);
	}
	this.charge = function(){
		for(let k=0;k<this.hydrants;k++){
			this.hydrants[k].airCharged = true;
			this.hydrants[k].waterCharged = true;		
		}		
	}
	this.isolate = function(){
		for(let k=0;k<this.hydrants;k++){
			this.hydrants[k].airCharged = false;
			this.hydrants[k].waterCharged = false;		
		}
	}
}
function weatherStation(){
	hydrant.call(this);
	this.setTemp = function(temp){
		this["temp"]=temp;
	}
	this.setAtmospheric = function(presure){
		this["atmosphericPresure"]=presure;
	}
	this.setWind = function(deg){
		this["wind"]=presure;
	}
}
weatherStation.prototype = Object.create(hydrant.prototype);
let bunker = function(){
	hydrant.call(this);
	this.setAirPresure = function(presure){
		this["airPresure"]=presure;
	}
	this.setWaterPresure = function(presure){
		this["atmosphericPresure"]=presure;
	}
	/*this.setCfm = function(presure){
		this["airPresure"]=presure;
	}
	this.setgpm = function(presure){
		this["atmosphericPresure"]=presure;
	}*/ //TODO
}
bunker.prototype = Object.create(hydrant.prototype);




