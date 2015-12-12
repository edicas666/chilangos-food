/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #btnprueba */
    
    
        /* button  #btnprueba */
    $(document).on("click", "#btnprueba", function(evt)
    {
         /*global activate_page */
         activate_page("#Home"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
