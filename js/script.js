$(function () {
    var APPLICATION_ID = "DCA35211-D357-5FE8-FF34-65667DAC1B00",
        SECRET_KEY = "C49E3C71-EB65-0F3E-FF7A-EE8F7A016E00",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    var listCollection = Backendless.Persistence.of(List).find();
    
    console.log(listCollection);
    
    var wrapper = {
        lists: listCollection.data
    };
    
    Handlebars.registerHelper('format', function (time) {
       return moment(time).format("dddd, MMMM Do YYYY"); 
    });
    
    var listScript = $("#list-template").html();
    var listTemplate = Handlebars.compile(listScript);
    var listHTML = listTemplate(wrapper);
    
    $('.main-container').html(listHTML);

});

function List(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
    this.completed = args.completed || "";
}

$(document).ready(function(){
      $('.parallax').parallax();
});

$(document).on('click', '.completeTask', function (event) {
    console.log(event);
    Materialize.toast('Marked task as completed', 2000, 'rounded');
    
    var dataStore = Backendless.Persistence.of(List)
        
    var markComplete = Backendless.Persistence.of(List).findById(event.target.attributes.data.nodeValue);
        
    markComplete["completed"] = !markComplete["completed"];
        
    dataStore.save(markComplete);
    
    location.reload();
});

$(document).on('click', '.undo', function() {
    Materialize.toast('Deleted task', 2000, 'rounded');
    
    console.log(event.target.attributes.data.nodeValue);
    Backendless.Persistence.of(List).remove(event.target.attributes.data.nodeValue);
    
    location.reload();
});

$(document).on('click', '.undotwo', function() {
    Materialize.toast('Deleted task', 2000, 'rounded');
    
    console.log(event.target.attributes.data.nodeValue);
    Backendless.Persistence.of(List).remove(event.target.attributes.data.nodeValue);
    
    location.reload();    
});

$(document).on('click', '.delete', function(){
    document.getElementById("thing").style.borderTop = "2px solid red";

});

