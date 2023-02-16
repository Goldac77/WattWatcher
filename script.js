var appliances = [];
var ratePerUnit = 0.10;

//function to add chosen appliance to the list
function addAppliance() {
  var selectedAppliance = document.getElementById("appliance");
  var applianceName = selectedAppliance.options[selectedAppliance.selectedIndex].text;
  var applianceWattage = selectedAppliance.value;
  var hoursUsed = document.getElementById("hours").value;
  var unitsConsumed = (applianceWattage / 1000) * hoursUsed;
  var billAmount = ratePerUnit * unitsConsumed;
  var appliance = {
    name: applianceName,
    wattage: applianceWattage,
    hours: hoursUsed,
    units: unitsConsumed,
    bill: billAmount
  };
  appliances.push(appliance);
  updateApplianceList();
  //updateTotalBill();
}

//function to display/update the items in the list
function updateApplianceList() {
  var list = document.getElementById("appliance-list");
  list.innerHTML = "" //refresh the list

  appliances.forEach(item => {
    list.innerHTML += `
    <li>${item.name} (${item.wattage}W, ${item.hours} hours per day) - ${item.bill.toFixed(2)} USD </li>
    `
  })
  console.log(appliances)
}