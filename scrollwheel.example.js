/**
* Praneet Loke
* http://codejournal.wordpress.com/2012/02/26/ios-style-scroller-for-phonegap-app/
*
* This is an example of how you can use the wrapper object.
*
* The destroy functions will be called automatically when the wheel is hidden. 
* You don't have to manually click on Done/Cancel in the wheel actions to open a wheel for another input,
* the wrapper will manage the status of the single globally available SpinningWheel object.
*/

//variables for scrollers 
var timeWheel = null, customWheel = null;
var scrollWheelData = {}; 
var slotData = [];
//
 
 // time wheel create/destroy functions
 function destroyTimeWheel(elementId, results){ 
 	timeWheel = null;
 	if(elementId != "" && typeof results !== 'undefined' && results != null){
 		$("#" + elementId).val(results.values[0]+":"+results.values[1]+" "+results.values[2]);
 	}
 }
 
 /**
 * Create an input element in your page and call this function by passing the event object, element id, and a default value.
 * This will show the spinning wheel as a time picker.
 */
 function showTimePicker(e, id, defaultValue){
 	e.preventDefault();
 	timeWheel = new ScrollWheel(id, defaultValue, destroyTimeWheel, "time");
 }
 
 //custom slots in scroll wheel control create/destroy functions
 function destroyCustomWheel(elementId, results){
 	//console.log("destroying custom wheel instance");
 	customWheel = null;
 	if(elementId != "" && typeof results !== 'undefined' && results != null){
 		//console.log("key is: " + results.keys.join(""));
 		$("#" + elementId).val(results.keys.join(""));
 	}
 }
 
 /**
 * Create an input element in your page and call this function by passing the event object, element id, and a default value.
 * This will show the spinning wheel as a custom picker containing values you define in the array slotData.
 */
 function showCustomPicker(e, id, defaultValue){
 	e.preventDefault();
 	customWheel = new ScrollWheel(id, [defaultValue], destroyCustomWheel, "custom", slotData);
 }
 