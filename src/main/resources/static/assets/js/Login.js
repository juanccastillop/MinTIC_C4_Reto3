/**
 * 
 * login
 */
 $("#formulario").validate({
    rules: {
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 16,
        }
    }
})
/**
 * 
 */

$("#login").click(function() {
    if ($("#formulario").valid() == false) {
        return;
    }else{
        //console.log("Entro aqui");
        traerUsuarios();
    }
})

/**
 * 
 */
function traerUsuarios() {
    var email = $("#email").val();
    var password = $("#password").val();


    $.ajax({
        url: "http://localhost:8080/api/user/" + email+"/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            //console.log(response)

            //Guardar datos de usuario
            console.log(response.id);
            if(response.id==null){
                swal({
                    title:"Error", 
                    text:"Cuenta de usuario y/o contraseña incorrecto", 
                    icon:"error"
                    }).then(function(){
                        location.reload();
                    });
            }else{
                let data = {
                    'id': response.id,
                    'name' : response.name
                };
                //Guardo los datos en un almacenamiento loca con el nombre de object_name y le envio los datos como js
                localStorage.setItem("object_name", JSON.stringify(data));

                swal("OK","Bienvenido " + data.name, "success");

                setTimeout(
                    function(){ 
                        $(document).ready(function(){
                            $(location).attr('href',"PanelAdmin.html");
                        });
                    }, 1000
                );

                }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            swal("Validación", "Error en la aplicacion, comuniquese con el administrador del sistema", "error");
        }
    });
}