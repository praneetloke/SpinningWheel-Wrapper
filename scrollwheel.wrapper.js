/**
* Praneet Loke
* http://codejournal.wordpress.com/2012/02/26/ios-style-scroller-for-phonegap-app/
*/
var ScrollWheel = function(targetElementId, defaultValue, closeCallback, type, slotData){
	this.pickerDetails = {id: ""};
	this.closeCallback = closeCallback;
	if(type.toLowerCase() == "date"){
		this.showDatePicker(targetElementId, defaultValue);
	}
	else if(type.toLowerCase() == "time"){
		this.showTimePicker(targetElementId, defaultValue);
	}
	else if(type.toLowerCase() == "custom"){
		this.showCustomPicker(targetElementId, defaultValue, slotData);
	}
	
	var self = this;
	//default actions for SpinningWheel
	SpinningWheel.setDoneAction(function () { 
		self.done.apply(this); 
	});
	SpinningWheel.setCancelAction(function(){ 
		ScrollWheel.instanceOpen = false;
		self.closeCallback.apply(self, [self.pickerDetails.id, null]);
	});
};

ScrollWheel.instanceOpen = false;

ScrollWheel.prototype.showTimePicker = function (id, value){
	if(ScrollWheel.instanceOpen){
		return false;
	}
	ScrollWheel.instanceOpen = true;
	var hours = {}, minutes = {}, ampm = {0:"AM", 1:"PM"}, i = 1;
	//hours
	for(i = 1 ; i < 13 ; i++){
		if(i < 10){
			hours[i] = '0' + i;
		}
		else{
			hours[i] = i;
		}
	}
	//mins
	for(i = 0 ; i < 60 ; i++){
		if(i < 10){
			minutes[i] = '0' + i;
		}
		else{
			minutes[i] = i;
		}
	}

	if(id != "")
		this.pickerDetails.id = id;
	//default values
	var now = new Date();
	var defH = now.getHours(), defM = now.getMinutes(), defAMPM = (defH < 12) ? 0 : 1;
	//convert hours to 12 hour clock format
	if(defH > 12){
		defH -= 12;
	}
	now = null;
	if(value != ""){
		var temp = value.split(":");
		defH = temp[0];
		//check if it is 0 prefixed
		if(defH.indexOf('0') == 0){
			defH = defH.charAt(1);
		}
		
		defM = temp[1].split(" ")[0];
		//check if it is 0 prefixed
		if(defM.indexOf('0') == 0){
			defM = defM.charAt(1);
		}
		defAMPM = (temp[1].split(" ")[1].toUpperCase() == "AM")? 0 : 1;
		temp = null;
	}
	
	//setup the slots now
	SpinningWheel.addSlot(hours, 'shrink', defH);
	SpinningWheel.addSlot(minutes, 'shrink', defM);
	SpinningWheel.addSlot(ampm, 'shrink', defAMPM);
	
	SpinningWheel.open();
	
	hours = null;
	minutes = null;
	seconds = null;
};

ScrollWheel.prototype.showCustomPicker = function (id, value, slotData){
	if(ScrollWheel.instanceOpen){
		return false;
	}
	ScrollWheel.instanceOpen = true;
	var defaultValue = "";
	if(id != "") {
		this.pickerDetails.id = id;
	}
	for(var i = 0 ; i < slotData.length ; i++){
		//setup the slots now
		if(value.length > i) {
			defaultValue = value[i];
		}
		SpinningWheel.addSlot(slotData[i], 'shrink', defaultValue);
	}
	
	SpinningWheel.open();
};

ScrollWheel.prototype.showDatePicker = function (id, value){
	if(ScrollWheel.instanceOpen){
		return false;
	}
	ScrollWheel.instanceOpen = true;
	if(id != "") {
		this.pickerDetails.id = id;
	}
	//default values
	var defM = 1, defY = 1990, defD = 1;
	if(value != ""){
		var temp = value.split("/");
		defM = temp[0];
		defD = temp[1];
		defY = temp[2];
		temp = null;
	}
	var now = new Date();
    var endYear =  now.getFullYear()-12;
	var days = { };
	var years = { };
	var months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' };
	
	for( var i = 1; i < 32; i += 1 ) {
		days[i] = i;
	}

	for( i = now.getFullYear()-100; i < endYear ; i += 1 ) {
		years[i] = i;
	}

	SpinningWheel.addSlot(months, 'shrink', defM);
	SpinningWheel.addSlot(days, 'right', defD);
	SpinningWheel.addSlot(years, 'right', defY);
	
	SpinningWheel.setSlotScrollEndAction(this.updateDates);
	SpinningWheel.open();
	now = null;
	days = null;
	months = null;
	years = null;
};

ScrollWheel.prototype.done = function(){
	ScrollWheel.instanceOpen = false;
	var results = SpinningWheel.getSelectedValues();
	//console.log('values: ' + results.values.join(' ') + ' keys: ' + results.keys.join(', '));
	this.closeCallback(this.pickerDetails.id, results);
	results = null;
};

ScrollWheel.prototype.updateDates = function (index){
	//console.log("you scrolled: " + index);
	var results = null, keys = null, values = null;
	if(index == 0){
		results = SpinningWheel.getSlotValue(index);
		if(results != null && results.keys != null && results.values != null){
			keys = results.keys;
			values = results.values;
			var selectedDate = SpinningWheel.getSlotValue(1);
			//update days accordingly
			// first check if it is February
			if(keys[0] == 2){
				//get the selected year from the its slot
				results = SpinningWheel.getSlotValue(2);
				if((results.keys[0] % 4) == 0){
					SpinningWheel.hideSlotValuesAfter(1, 29, 31);
					//set the date to 29th if something other than 29 was chosen by the user
					if(parseInt(selectedDate.keys[0], 10) > 29) {
						SpinningWheel.scrollToValue(1, 29);
					}
				}
				else{
					SpinningWheel.hideSlotValuesAfter(1, 28, 31);
					//set the date to 28th if something other than 29 was chosen by the user
					if(parseInt(selectedDate.keys[0], 10) > 28) {
						SpinningWheel.scrollToValue(1, 28);
					}
				}
			}
			//now check for odd/even months
			else if(keys[0] == 1 || keys[0] == 3 || keys[0] == 5 || keys[0] == 7 || keys[0] == 8 || keys[0] == 10 || keys[0] == 12){
				SpinningWheel.showSlotValuesAfter(1, 28, 31);
			}
			//now check for odd/even months
			else if(keys[0] == 4 || keys[0] == 6 || keys[0] == 9 || keys[0] == 11){
				SpinningWheel.hideSlotValuesAfter(1, 30, 31);
				if(parseInt(selectedDate.keys[0], 10) > 30) {
					SpinningWheel.scrollToValue(1, 30);
				}
			}
			selectedDate = null;
		}
		results = null;
	}
};