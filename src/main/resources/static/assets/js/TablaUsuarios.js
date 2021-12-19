const url_cl= "http://localhost:8080/api/user"
const contenedor_cl = document.getElementById('tbodyCliente')
let resultados_cl = ''
let opcion_cl = ''

const modalCliente = new bootstrap.Modal(document.getElementById('modalUsuario'))
const formCliente = document.getElementById('formularioUsuario')
const idUser = document.getElementById('id')
const identificacion = document.getElementById('identification')
const nombre = document.getElementById('names')
const direccion = document.getElementById('address')
const telefono = document.getElementById('cellPhone')
const correo = document.getElementById('email')
const contraseña = document.getElementById('password')
const zona = document.getElementById('zone')
const tipo = document.getElementById('type')


const ajax_cl = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            if( xhr.responseText ){
                let json = JSON.parse(xhr.responseText);
                success(json);
            }
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
};

const getAll_cl = () => {
    ajax_cl({
        url: url_cl+("/all"),
        method: "GET",
        success: (res) => {
            console.log(res);

            res.forEach((user) => {
                resultados_cl += `<tr>
                        <td width="10%" style="display:none">${user.id}</td>
                        <td width="15%">${user.identification}</td>
                        <td width="15%">${user.name}</td>
                        <td width="15%">${user.address}</td>
                        <td width="15%">${user.cellPhone}</td>
                        <td width="15%">${user.email}</td>
                        <td width="15%">${user.password}</td>
                        <td width="15%">${user.zone}</td>
                        <td width="15%">${user.type}</td>
                        <td class="text-center" width="20%">
                            <a class="btnEditarCl btn btn-outline-success">Editar</a>
                            <a class="btnBorrarCl btn btn-outline-danger">Borrar</a>
                        </td>
                    </tr>`
            });
            contenedor_cl.innerHTML = resultados_cl
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};

document.addEventListener("DOMContentLoaded", getAll_cl);

document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrarCl")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log('Este es el id del usuario a eliminar: ' , id)
        alertify.confirm(`¿Estás seguro de eliminar el codigo ${id}?`,
            function () {
                ajax_cl({
                    url: url_cl+("/")+id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => location.reload(),
                    error: (err) => alert(err),
                    data: {
                        "id": id
                    },
                });
                alertify.success('Usuario eliminada')
                location.reload()
            },
            function () {
                alertify.error('Eliminacion de Usuario cancelada')
            });
        
    }
    if (e.target.matches(".btnEditarCl")) {
        const fila = e.target.parentNode.parentNode
        idUser.value = fila.children[0].innerHTML
        identificacion.value=fila.children[1].innerHTML
        nombre.value = fila.children[2].innerHTML
        direccion.value = fila.children[3].innerHTML
        telefono.value = fila.children[4].innerHTML
        correo.value = fila.children[5].innerHTML
        contraseña.value = fila.children[6].innerHTML
        zona.value = fila.children[7].innerHTML
        tipo.value = fila.children[8].innerHTML
        opcion_cl = 'editar'
        modalCliente.show()
    }
})

formCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    let url2 = url_cl +("/save")
    if (opcion_cl == 'editar') {
        metodo = "PUT"
        url2 = url_cl +("/update")
    }
    ajax_cl({
        url: url2,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => (alertify.success('Usuario actualizado'),
                        window.setTimeout(function(){location.reload()},1200)),
        error: (err) =>
            $formCliente.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "id": idUser.value,
            "name": nombre.value,
            "address": direccion.value,
            "cellPhone": telefono.value,
            "email": correo.value,
            "password": contraseña.value,
            "zone": zona.value,
            "type": tipo.value
        },
    });
    modalCliente.hide()
})
