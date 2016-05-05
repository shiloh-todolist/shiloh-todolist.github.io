$(function () {
    var APPLICATION_ID = "DCA35211-D357-5FE8-FF34-65667DAC1B00",
        SECRET_KEY = "C49E3C71-EB65-0F3E-FF7A-EE8F7A016E00",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    
    
    
    $(document).on('click', '.add-list2', function(){
        var addListScript = $("#add-list-template").html();
        var addListTemplate = Handlebars.compile(addListScript);
        
        $('.main-container').html(addListTemplate);
         tinymce.init({selector:'textarea',plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
        });
    });
    $(document).on('submit', '.form-add-list', function(event){
       event.preventDefault();
       var x;
       x = document.getElementById("title").value;
       var y;
       y = document.getElementById("content").value;
       if (x == ""){
           Materialize.toast('Title field cannot be empty', 4000, 'rounded');
           return false;
       }
       if (y == ""){
           Materialize.toast('Content field cannot be empty', 4000, 'rounded');
           return false;
       }
       else {
       var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
       var dataStore = Backendless.Persistence.of(List);
       
       var listObject = new List({
           title: title,
           content: content
       });
       
       dataStore.save(listObject);
       
       this.title.value = "";
       this.content.value = "";
   }
    });
    
    $(document).on('click', '.logout', function () {
       Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
       
       var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);   
        $('.main-container').html(loginTemplate);
    });
    
});

function List(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
}
