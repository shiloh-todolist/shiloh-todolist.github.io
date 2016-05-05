$(function () {
    var APPLICATION_ID = "DCA35211-D357-5FE8-FF34-65667DAC1B00",
        SECRET_KEY = "C49E3C71-EB65-0F3E-FF7A-EE8F7A016E00",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    var listCollection = Backendless.Persistence.of(List).find();
    
    var wrapper = {
        lists: listCollection.data
    };
    
    var listScript2 = $("#create-account-template").html();
    var listTemplate2 = Handlebars.compile(listScript2);
    var listHTML2 = listTemplate2(wrapper);
    
    $('.main-container').html(listHTML2);

});

function List(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}


$(document).on('submit', '.form-signin-thing', function(event) {
       event.preventDefault();
       
        var data = $(this).serializeArray(),
           email = data[0].value,
           password = data[1].value;     
        
        var user = new Backendless.User();
        user.email = email;
        user.password = password;
        Backendless.UserService.register(user);
        
        Materialize.toast('User created sucessfully!', 3000, 'rounded')
        
        var listScript3 = $("#create-account-template").html();
        var listTemplate3 = Handlebars.compile(listScript3);
        var listHTML3 = listTemplate3();

        $('.main-container').html(listHTML3);
});