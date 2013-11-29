$(function(){
  $("#dvContent").append("<ul></ul>");
  var data = '';
  $.ajax({
    type: "GET",
    url: "js/tarrifs.json",
    dataType: "json",
	async:false,
    success: function(tariff){
		data = tariff;
	}
	});
	console.log(data.tariffs[0].max);
	var valueToCheck = $('#valueToCheck');
	var tariffRange = '';
	valueToCheck.change(function(){
		if(!isNaN(valueToCheck.val())){
			$('.error').hide();
			$(".tariffRange").hide();
			if(valueToCheck.val() < 10){
				$('.valueLess').show();
				$(".valueLess span").text(valueToCheck.val());
				}else if(valueToCheck.val() > 70000){
				$('.valueExeed').show();
				$(".valueExeed span").text(valueToCheck.val());
			}else{
				$('.valueExeed, .valueLess').hide();
				var youCanLoop = true;
				
				var valueToCheckIn = $('#valueToCheck').val();
				var i = 0;
				while(youCanLoop){
					console.log(i+" This is i");
					//if(valueToCheck >= data.tariffs[i].min && valueToCheck <= data.tariffs[i].max){
					var minVal = data.tariffs[i].min;
					var maxVal = data.tariffs[i].max;
					if(valueToCheckIn >= minVal &&  valueToCheckIn <=  maxVal){
						tariffRange = i;
						//console.log(tariffRange);
						youCanLoop = false;
						}
					i++;
					//console.log(data.tariffs[i].min);
					//$("body").append(data.tariffs[i].max+" "+i);
				};
				$(".tariffRange").show(); 
				$(".tariffRange b").text(data.tariffs[tariffRange].min+" - "+data.tariffs[tariffRange].max);
				$(".toMpesaUsers b").text(data.tariffs[tariffRange].toMpesaUsers);
				$(".toUnregisteredUsers b").text(data.tariffs[tariffRange].toUnregisteredUsers);
				$(".withdrawalFromAgents b").text(data.tariffs[tariffRange].withdrawalFromAgents);
				//$(".ATMWithdrawal b")
			}
		//console.log(data.tariffs[1].min);	
		}else{
			$('.error').show();
			}
	});
});