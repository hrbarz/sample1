// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

 
 var template = {

      str_query: '#speakers-template',

      ini: function(){

           this.source   = $(this.str_query).html();

           $('body').append('<div id="tpl_resource" style="display:none">'+ this.source +'</div>');

           //$('#tpl_resource').html(this.source);
            
           
      },

      get: function(name){

            if(name)
            {
                return $('#tpl_resource').find(name).html();
            }
            else
            {
                return $('#tpl_resource').html();
            }

      },

      action: function(data,source){

          var complile = Handlebars.compile(source);
          
          return complile(data);

      }



 }

 var modal_form = {

      show: function(){

          $('.modal').removeClass('hide');

          $('.modal-backdrop').removeClass('hide');

          $('.loading-modal').removeClass('hide');
          
          $('.container-modal').addClass('hide');

          document.getElementById('form_modal').reset();

          this.title = $('#myModalLabel');
          this.action_form = $('#form_modal #action_form');

      },

      realy: function(){

          $('.container-modal').removeClass('hide');     
          $('.loading-modal').addClass('hide');

      },

      show_alert: function(){

          $('#alert-modal').removeClass('hide');
          $('#alert-modal').addClass('alert-info');
          $('#alert-modal strong').html('Loading...');

      },

      hide_alert: function(){

          $('#alert-modal').removeClass('alert-info');
          
          $('#alert-modal strong').html('Saved!');
                
          setTimeout(function() {

              $('#alert-modal').addClass('hide');
    
          }, 2000);


    
      }



 }


 var tasklist = {

    get_data: function(req,res){

        $.getJSON('/data_tasklist.php?tasklist='+ id, function(data) {

            res(data);

        });

    },

    get_list: function(req,res){

        tasklist_io = io.connect('http://localhost:3000/tasklist');

        tasklist_io.emit('get_list',{});

        tasklist_io.on('list_result',function (data){

            res({'tasklist':data});

        });

        /*$.getJSON('/data_tasklist.php', function(data) {

            if(data == '' || data.length == 0) data = undefined;

            fn_action(data);

        });*/

    },

    save_data: function(data,fn_action){

        console.log(data);

        fn_action();

    },

    delete : function(id){

        console.log('Elemento tasklist '+ id +' borrado')

    }


 };

 var tasklist_page = {

      get_id : function(e){

          return  $(e).attr('data-value');

      },

      load: function(){

          template.ini();

          tasklist.get_list({},function(data) {

              
              if(data !== undefined)
              {

                info = template.action(data , template.source);

                $('#list-tasklist').html(info);

                tasklist_page.bind_actions();


              }else{

                console.log('No hay datos');

              }
          });

      },

      edit: function(e){

          var id = this.get_id(e);

          modal_form.show();

          modal_form.title.html('Edit Task List');

          that = this;



          tasklist.get_data(id,function(data){

              $('#modal_id_form').val(data.id);

              $('#modal_name').val(data.name);
              $('#modal_description').val(data.description);
              
              $('#action_form').val('tasklist');


              modal_form.realy();
          
          });
      },

      create: function(){

          modal_form.show();

          modal_form.title.html('Create Task List');

          that = this;


          setTimeout(function () {

            console.log('create tasklist');

            modal_form.action_form.val('tasklist');

            modal_form.realy();


          },1000); 

      },

      delete: function(e){

          var id = this.get_id(e);

          if(confirm('You really want to delete?')){

              tasklist.delete(id);
             
              $('#item-tasklist-' + id).remove();
             
          }

      },

      save_data: function(){

          modal_form.show_alert();

          data = {
              'name'        : $('#modal_name').val(),
              'description' : $('#modal_description').val()
          };

          tasklist.save_data(data,function(){

              console.log('Tasklis save.');

              setTimeout(function() {

                 modal_form.hide_alert();

              },2000);
              
          });

      },

      bind_actions: function(){


          /*Bind action in tasklist*/

          $('#btn-new-tasklist').on('click',function(){

              tasklist_page.create();
                  
          });

          $('.btn-edit-tasklist').on('click',function(){

              tasklist_page.edit(this);

          });

          $('.btn-delete-tasklist').on('click',function(){

              tasklist_page.delete(this);

          });


          /*Bind action in task*/

          $('.btn-new-task').on('click',function(){

              task_page.create(this);

          });

          $('.btn-edit-task').on('click',function(){

              task_page.edit(this);

          });

          $('.check-task').bind('change',function(){ console.log(this);

              task_page.check_task(this);
              
          });

          $('.btn-delete-task').on('click',function(){

              task_page.delete(this);
          });


      }

 }


 var task = {

    get_data: function(id,fn_action){

        $.getJSON('/data_tasklist.php?task='+ id, function(data) {

            console.log(data);

            fn_action(data);

        });

    },

    save_data: function(data,fn_action){

        fn_action(data);

    },

    check: function(id){

        console.log('Elemento '+ id +' chequeado')

    },

    undo_check: function(id){

        console.log('Elemento '+ id +' deschequeado')

    },

    delete : function(id){

        console.log('Elemento '+ id +' borrado')

    }

 };

 var task_page = {

      get_id : function(e){

          return  $(e).attr('data-value');

      },

      
      check_task : function(e){

          var id = this.get_id(e);

          var title_task = $('#title-task-'+ id );

          if(title_task !== undefined)
          {
            if( $(e).is(':checked') )
            {
                task.check(id);

                title_task.addClass('cross-out');
            }else{
                task.undo_check(id);

                title_task.removeClass('cross-out');
            }
          }

      },


      edit: function(e){

          var id = this.get_id(e);

          modal_form.show();

          modal_form.title.html('Edit Task');

          task.get_data(id,function(data){

              $('#modal_id_form').val(data.id);

              $('#modal_name').val(data.name);
              
              $('#modal_description').val(data.description);
              
              $('#action_form').val('tasklist');

              modal_form.realy();
          
          });

          /*setTimeout(function () {

          },1000); */

      }, 
     
      create: function(e){

          var idparent = this.get_id(e);

          modal_form.show();

          modal_form.title.html('Create Task');


          $('#modal_idparent_form').val(idparent);

          console.log('create tasklist');

          modal_form.action_form.val('task');


          modal_form.realy();
          

      },

      save_data: function(){

          modal_form.show_alert();

          data = {
              'name'        : $('#modal_name').val(),
              'description' : $('#modal_description').val()
          };

          task.save_data(data,function(data){

              console.log('Task save.');

              data.id = 10;

              var list = {
                  'tasks': [data]
              };

              info = template.action(list,template.get('.accordion'));

              $('#item-tasklist-0 .accordion').prepend(info);

              setTimeout(function() {

                 modal_form.hide_alert();

              },2000);
              
          });

      },

      delete: function(e){

          var id = this.get_id(e);

          if(confirm('You really want to delete?')){

              task.delete(id);
             
              $('#item-task-' + id).remove();
             
          }

      }

      
 };


!function ($) {

  $(function(){

    var $window = $(window)


    $('.close-modal').on('click',function(){

        $('.modal').addClass('hide');
        $('.modal-backdrop').addClass('hide');
    });

    $('.save-changes-modal').on('click',function(){

        var action_form = $('#form_modal #action_form').val();

        switch(action_form)
        { 
            case 'tasklist':

                tasklist_page.save_data();

            break;

            case 'task':

                task_page.save_data();

            break;

        }

    });
            

    tasklist_page.load();

//  $("abbr.timeago").timeago();


  //  $('.modal-backdrop').addClass('');

    /*// Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210 }
        , bottom: 270
        }
      })
    }, 100)

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    $('#fat-btn').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    
    $('#plugins.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
    })

    $('#variables.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })*/
  
})

}(window.jQuery)
