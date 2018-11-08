var statsOn = 0;
function makeToggable(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
    console.log(div_element);
  });
}
$("#logo").attr("src", "logo.png");
var submit_name_button = document.getElementById("submit_name");
var player_name = localStorage.getItem('player_name');
var player_wins = localStorage.getItem('player_wins');
var winCount = 0;
var loseCount = 0;
var tieCount = 0;
localStorage.setItem("Total Games", 0);
localStorage.setItem("Total Wins", 0);
localStorage.setItem("Win Loss Ratio", 0);
var stats_list = ["Total Games", "Total Wins", "Win Loss Ratio"];
var pRock = 0;
var pPaper = 0;
var pScissors = 0;
var cRock = 0;
var cPaper = 0;
var cScissors = 0;
var player_stats = {rock: 0, paper: 0, scissors: 0};
var cpu_stats = {rock: 0, paper: 0, scissors: 0};

makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));
throwChoice();
console.log(player_name);

function updateMessage(text_element, message){
  document.getElementById(text_element).textContent = message;
}

function updateFeedback(){
  //if(feedback.contains())
}

submit_name_button.addEventListener("click", function(){
  var input = document.getElementById("name").value;
  localStorage.setItem("player_name", input);
  console.log(player_name);
  document.getElementById("enter_name").classList.remove("visible");
  document.getElementById("enter_name").classList.add("hidden");
  player_name = localStorage.getItem('player_name');
  updateMessage("game_header", "Make your move, " + player_name +"!")
  document.getElementById("enter_name").classList.remove("visible");
  document.getElementById("enter_name").classList.add("hidden");
  document.getElementById("game_results").classList.remove("hidden");
  document.getElementById("game_results").classList.add("visible");
  document.getElementById("throw_choice_div").classList.remove("hidden");
  document.getElementById("throw_choice_div").classList.add("visible");

});

if(!player_name || player_name==""){
  document.getElementById("enter_name").classList.remove("hidden");
  document.getElementById("enter_name").classList.add("visible");
  document.getElementById("game_results").classList.remove("visible");
  document.getElementById("game_results").classList.add("hidden");
  document.getElementById("throw_choice_div").classList.remove("visible");
  document.getElementById("throw_choice_div").classList.add("hidden");
  feedback.innerHTML ="Enter name, please!";
  feedback.classList.remove("good");
  feedback.classList.add("bad");
} else {
  updateMessage("game_header", "Make your move, " + player_name +"!")
  feedback.innerHTML ="Good job entering your name!";
  feedback.classList.remove("bad");
  feedback.classList.add("good");
}

function printStats() {
  stats_list.forEach(element => {
    document.getElementById(element.toString()).innerHTML = element.toString()+": "+localStorage.getItem(element.toString());
  });
}

function throwChoice(){
  var throw_button = document.getElementById("throw_choice");
  var value_choice = document.getElementById("dropdown");
  var winner;
  throw_button.addEventListener("click", function(){
    var player_choice =  value_choice.options[value_choice.selectedIndex].value;
    var npc_choice = Math.floor(Math.random() * 3)+1;
    if (player_choice == 0){
        document.getElementById("result_header").innerHTML = "Error: Please input throw choice";
        document.getElementById("player").innerHTML = "";
        document.getElementById("npc").innerHTML = "";
        document.getElementById("winner").innerHTML = ""
        winner = "";
        feedback.innerHTML ="Error: Please input throw choice";
        feedback.classList.add("bad");
        feedback.classList.remove("good");
    } else {
        document.getElementById("game_results").classList.remove("hidden");
        document.getElementById("game_results").classList.add("visible");
        document.getElementById("result_header").innerHTML = "Game Results";
        feedback.innerHTML ="Nice throw!";
        feedback.classList.remove("bad");
        feedback.classList.add("good");
      if(player_choice==npc_choice){
      winner = "Tie";
      tieCount++;
      } else if (player_choice == 1 && npc_choice == 2 || player_choice == 2 && npc_choice == 3 || player_choice == 3 && npc_choice == 1) {
      winner = "Computer";
      loseCount++;
      } else if (player_choice == 2 && npc_choice == 1 || player_choice == 3 && npc_choice == 2 || player_choice == 1 && npc_choice == 3) {
      winner = "Player";
      winCount++;
      localStorage.setItem("Total Wins", winCount);
      }
    }

    var npc;
    var player;
    var thing;
    function type(choice, person){
      if(choice==1){
        thing = "Rock";
        if(person == "npc"){
          cRock++;
        } else{
          pRock++;
        }
      } else if(choice==2){
        thing = "Paper";
        if(person == "npc"){
          cPaper++;
        } else{
          pPaper++;
        }
      } else if (choice==3){
        thing = "Scissors";
        if(person == "npc"){
          cScissors++;
        } else{
          pScissors++;
        }
      }else{
        thing="Error";
      }
      return thing;
    }

    function statUpdate(statType,choice){
      if(choice==1){
        statType.rock++;
      } else if (choice==2){
        statType.paper++;
      } else {
        statType.scissors++;
      }
    }

    if(!(type(player_choice,player)=="Error")){
      localStorage.setItem("Total Games", parseFloat(localStorage.getItem('Total Games'))+1);
      total_games = localStorage.getItem("Total Games");
      document.getElementById("player").innerHTML = "Player choice: "+type(player_choice,player);
      document.getElementById("npc").innerHTML = "Computer choice: "+type(npc_choice,npc);
      document.getElementById("winner").innerHTML = "Winner: " +winner;
      var totalLoss = loseCount+tieCount;
      statUpdate(player_stats,player_choice);
      statUpdate(cpu_stats,npc_choice);
      localStorage.setItem("Win Loss Ratio", winCount +"-"+ totalLoss);
      document.getElementById("player_stats").innerHTML = "Player Stats: Rock: "+((player_stats.rock/total_games)*100).toFixed(2)+"%; Paper: "+((player_stats.paper/total_games)*100).toFixed(2)+"%; Scissors: "+((player_stats.scissors/total_games)*100).toFixed(2)+"%";
      document.getElementById("cpu_stats").innerHTML = "Browster Stats: Rock: "+((cpu_stats.rock/total_games)*100).toFixed(2)+"%; Paper: "+((cpu_stats.paper/total_games)*100).toFixed(2)+"%; Scissors: "+((cpu_stats.scissors/total_games)*100).toFixed(2)+"%";

      $("#player_image").attr("src", player_choice+".png");
      $("#npc_image").attr("src", (npc_choice+3)+".png");
    }
    localStorage.setItem("Total Wins", winCount);
    printStats();
  });
}

document.getElementById("reset").addEventListener("click", function() {
  localStorage.setItem("Total Games", 0);
  localStorage.setItem("Total Wins", 0);
  localStorage.setItem("Win Loss Ratio", 0);
  var stats_list = ["Total Games", "Total Wins", "Win Loss Ratio"];
  document.getElementById("game_results").classList.remove("visible");
  document.getElementById("game_results").classList.add("hidden");
  var pRock = 0;
  var pPaper = 0;
  var pScissors = 0;
  var cRock = 0;
  var cPaper = 0;
  var cScissors = 0;
  printStats();
  document.getElementById("dropdown").selectedIndex = 0;
});
