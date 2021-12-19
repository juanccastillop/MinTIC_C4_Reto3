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
                    'name' : response.name,
                    'zone' : response.zone
                };
                //Guardo los datos en un almacenamiento local con el nombre de object_name y le envio los datos como js
                localStorage.setItem("object_name", JSON.stringify(data));

                swal("OK","Bienvenido " + data.name, "success");

                setTimeout(
                    function(){ 
                        $(document).ready(function(){
                            if(response.type == 'ADM'){
                                window.location.href = "PanelAdmin.html"           
                            }else if (response.type == 'ASE'){
                                window.location.href = "PanelAsesor.html"           
                            }else if(response.type == 'COORD'){
                                window.location.href = "PanelCoordinador.html" 
                            }
                        });
                    }, 1300
                );

                }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            swal("Validación", "Error en la aplicacion, comuniquese con el administrador del sistema", "error");
        }
    });
}