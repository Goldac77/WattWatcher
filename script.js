var appliances = [];
    var ratePerUnit = 0.10;
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
      updateTotalBill();
    }
    function updateApplianceList() {
      var list = document.getElementById("appliance-list");
      list.innerHTML = "";
      for (var i = 0; i < appliances.length; i++) {
      var appliance = appliances[i];
      var listItem = document.createElement("li");
      listItem.innerHTML = appliance.name + " (" + appliance.wattage + "W, " + appliance.hours + " hours per day) - " + appliance.bill.toFixed(2) + " USD";
      list.appendChild(listItem);
      }
    }