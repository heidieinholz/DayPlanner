//set variables
//look up on moment how to format dates
var date = moment().format("dddd, MMMM DD, YYYY");
//look up on moment how to format time
var currentHour = (moment().format("HH"));
//grab the day and apply to the ID in the jumbotron
$("#currentDay").text(date);
//console log 
console.log(moment().format("MM ddd, YYYY hh:mm:ss a"));
console.log(moment().format("dddd, MMMM D, YYYY"));
//it works! 

//Now, make a table dynamically to put the planner into
//Start by assigning a variable. New elements are made with < >
var myTable = $("<table>");
//set a class to the element to make it accessible
myTable.addClass("dayPlanner");
console.log(myTable);
//it exists!

// Now make arrays for the time. 
// Start with assigning variables. Put each hour in a string in the array.
var scheduleHr = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
//These are comparisons to the localHour to determine color of newAssignment cells
var compareHr = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
//array for the time it actually is
var localHr = ["0900", "1000", "1100", "1200", "100", "200", "300", "400", "500"];

//Make a for loop to go through the hours on the planner
for (i = 0; i< scheduleHr.length; i++) {
    // Create a new row
    var newRow = $("<tr>");
    //Give the row a class
    newRow.addClass("row");

    // Each hour is a cell in the row
    var newHour = $("<td>");
    newHour.addClass("hour");
    //Loop through the array scheduleHr to dynamically create new hour cells
    newHour.html(scheduleHr[i]);
    
    //Begin adding new cells for where the "hourly assignments" get input
    var newAssignment = $("<td>");
    //Give it a column class to use later
    newAssignment.addClass("column");
    //These cells are the ones that change colors
    //We need to compare this hour to the hour it is to determine their color
    newAssignment.addClass(compareHr[i]);
    //get the attribute value
    newAssignment.attr("data-name", compareHr[i]);
    console.log(compareHr[i]);
    newAssignment.html("");
    //make the cell a text area
    var newAssignmentArea = $("<textarea>");
    //text area uses the current time's array
    newAssignmentArea.addClass("textarea " + localHr[i]);
    
    //Make save buttons
    var buttonTd = $("<td>");
    //give class
    buttonTd.addClass("buttonBox")
    //assign variable to new button
    var newBtn = $("<button>");
    //this is a save button
    newBtn.addClass("saveBtn");
    //get the attribute value
    newBtn.attr("data-name", localHr[i]);
    newBtn.addClass("saveBtn");
    //pop a save icon into the button
    newBtn.html('<i class="fas fa-lock"></i>');
    //append the table we just made to the container class in the HTML
    $(".container").append(myTable);
    //append the row
    myTable.append(newRow);
    //append all of the cells
    newRow.append(newHour, newAssignment, buttonTd);
    //append the text area
    newAssignment.append(newAssignmentArea);
    //append the button to the cell
    buttonTd.append(newBtn);
}
//When the save button is clicked;
$('.saveBtn').on("click", function(){
    //put in an event prevent
    event.preventDefault();
    console.log(this);
    //Get the data-name to use as the local storage key ex 0900
    var getId = $(this).data("name");
    console.log(getId);
    //define the assignment cell as the place where we grab the value of the contents
    var assignment = $("." + getId).val();
    console.log("assignment", assignment);
    //and put it into local storage
    localStorage.setItem(getId, assignment);
    //Call function to return the value of the assignments
    renderAssignments();
})

function renderAssignments() {
    $("textarea").empty();
    console.log("Render Assignments");
    for (i=0; i < scheduleHr.length; i++){
        var returnAssignment = localStorage.getItem(localHr[i]);
        console.log(returnAssignment);
        $("." + localHr[i] + "").html(returnAssignment);
    }

}
renderAssignments();
//Make a function to change the color of the cells
$(".column").each(function(){
    var dataName = $(this).attr("data-name");
    var currentTD = "." + dataName;
    //Use a conditional to present the color changes listed in CSS
    if (dataName == currentHour){
        console.log(dataName, currentHour, "red", "future");
        $(currentTD).addClass("present");
    } else if(dataName < currentHour){
        console.log(dataName, currentHour, "grey", "past");
        $(currentTD).addClass("past");
    } else if (dataName > currentHour){
        console.log(dataName, currentHour, "green", "future");
        $(currentTD).addClass("future");
    }
});