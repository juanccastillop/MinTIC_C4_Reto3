/**
 * 
 * 
 */
 $("#formularioReg").validate({
    rules: {
        reference: {
            required: true
        }                                                                                                       }
})

/**
 * 
 */
$("#registrarProducto").click(function() {
    
        guardarProducto
    })


/**
 * 
 */
function guardarProducto() {
    var reference = $("#reference").val();

    $.ajax({
        url: "http://localhost:8080/api/cookware/" + reference,
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            console.log(response)
            if (response !== null) {
                swal("El producto ya existe, si desea vaya a Actualizar Producto", "Validación Incorrecta", "error");
            } else {
                let myData={
                    reference:$("#reference").val(),
                    brand:$("#brand").val(),
                    category:$("#category").val(),
                    materiales:$("#materiales").val(),
                    dimensiones:$("#dimensiones").val(),
                    description:$("#description").val(),
                    availability:$("#availability").val(),
                    price:$("#price").val(),
                    quantity:$("#quantity").val(),
                    photography:$("#photography").val()
                };
                let dataToSend=JSON.stringify(myData);
                console.log(dataToSend);
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data: dataToSend,
                    url: "http://localhost:8080/api/cookware/new",
                    success: function(response) {
                        swal("Producto creado de forma correcta", "Validación Correcta", "success");
                        $(".form-control").val("");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        swal("No se guardo correctamente, valide los campos", "Validación Incorrecta", "error");
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            swal("Validación", "Error en la aplicacion, comuniquese con el administrador del sistema", "error");
        }
    });
}