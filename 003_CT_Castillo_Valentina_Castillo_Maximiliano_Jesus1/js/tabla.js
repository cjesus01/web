document.addEventListener('DOMContentLoaded',function(){
    "use scrict";
    const URL="https://62ae2e58645d00a28a05ab0e.mockapi.io/api/3/viajes";
    let click=0;
    let tamañoJSON=0;
    let ValorIdIngresada=0;
    let tbody_tabla=document.querySelector("#tbody_tabla");
    let form_incompleto=document.querySelector("#form_incompleto");
    let oferta=document.querySelector("#oferta");
    let GuardarCambiosTabla=document.querySelector("#GuardarCambios");
    let idIngresada=document.querySelector("#idParaModificar");
    let idVaciaOMayorNroQueLasFilas=document.querySelector("#IdVacia");
    let form=document.querySelector("#formulario");
    let error = document.querySelector('#error');
    let desplegar=document.querySelector(".Desplegar");
    let btnAgregar=document.querySelector("#botonAgregar");
    btnAgregar.addEventListener("click",function(e){
        e.preventDefault();
        comprobarTabla(1);
    });
    let btnAgregarX3=document.querySelector("#botonX3");
    btnAgregarX3.addEventListener("click",function(e){
        e.preventDefault();
        comprobarTabla(3);
    });
    let btnDesplegarModificar=document.querySelector("#DesplegarId");
    btnDesplegarModificar.addEventListener("click",function(e){
        e.preventDefault();
        form_incompleto.innerHTML="";
        if(click==0){
            desplegar.classList.toggle("DesplegarDiv");
        }
        else{
            GuardarCambiosTabla.innerHTML="Guarde los cambios antes de modificar otra fila.";
        }
    });
    let btnModificar=document.querySelector("#BotonModificar");
    btnModificar.addEventListener("click",function(e){
        e.preventDefault();
        ValorIdIngresada=idIngresada.value;
        if(ValorIdIngresada==""){
            idVaciaOMayorNroQueLasFilas.innerHTML="Ingrese una fila para realizar los cambios correspondientes.";
        }
        else if(ValorIdIngresada>0 &&ValorIdIngresada<=tamañoJSON){
            idVaciaOMayorNroQueLasFilas.innerHTML="";
            click++;
            desplegar.classList.remove("DesplegarDiv");
            AsignarInput(ValorIdIngresada);
            idIngresada.value="";
        }
        else{
            idVaciaOMayorNroQueLasFilas.innerHTML="Ingrese un número de fila válido.";
        }
    });
    mostrar();
    async function mostrar(){
        error.innerHTML="";
        tbody_tabla.innerHTML="";
        form_incompleto.innerHTML="";
        oferta.innerHTML="";
        GuardarCambiosTabla.innerHTML="";
        let id=1;
        try{
            let res= await fetch(URL);
            let json= await res.json();
            tamañoJSON=json.length;
            for(let elem of json){
                if(elem.Destinos=="Oslo"){
                    oferta.innerHTML=`El viaje a Oslo se encuentra en un <span class="resaltar_rojo">15% de descuento.</span>¡No puedes perderte esta oferta!`;
                    tbody_tabla.innerHTML += 
                    `<tr class="resaltar tr${id}">
                        <td>${elem.Destinos}</td>
                        <td>${elem.Descripcion}</td>
                        <td>${elem.Fechaida}</td>
                        <td>${elem.Fechavuelta}</td>
                        <td>${elem.personas}</td>
                        <td>${elem.costo}</td>
                        <td>${id}</td>
                        <td class="boton${id} celda_boton_tabla"></td>
                    </tr>`;
                    crearBoton(id, elem.id,"Guardar");
                    crearBoton(id, elem.id,"Eliminar");              
                    id++;
                }
                else{
                    tbody_tabla.innerHTML += 
                    `<tr class="tr${id}">
                        <td>${elem.Destinos}</td>
                        <td>${elem.Descripcion}</td>
                        <td>${elem.Fechaida}</td>
                        <td>${elem.Fechavuelta}</td>
                        <td>${elem.personas}</td>
                        <td>${elem.costo}</td>
                        <td>${id}</td>
                        <td class="boton${id} celda_boton_tabla"></td>
                    </tr>`;
                    crearBoton(id, elem.id,"Guardar");
                    crearBoton(id, elem.id,"Eliminar");    
                    id++;
                };        
            };
        }
        catch(error){
            error.innerHTML= "Se ha generado un error.";
        }
    };
    function comprobarTabla(cantidad){
        GuardarCambiosTabla.innerHTML="";/*para que no se pise los textos de guardar cambios y agregar*/
        let formulario= new FormData (form);
        let destino= formulario.get('destino');
        let descripcion=formulario.get('descripcion');
        let fechaIda=formulario.get('fechaIda');
        let fechaVuelta=formulario.get('fechaVuelta');
        let Cant_personas=formulario.get('personas');
        let precio=formulario.get('precio');
        let fila={
            Destinos:destino,
            Descripcion: descripcion,
            Fechaida: fechaIda,
            Fechavuelta: fechaVuelta,
            personas: Cant_personas,
            costo: precio
        };
        if(((fila.Destinos!="vacio" && fila.Descripcion!="")&&
        (fila.Fechaida!="" && fila.Fechavuelta!=""))&&
        (fila.personas!="" && fila.costo!="")){ 
            if(click==0){
                agregar(cantidad,fila);
            }
            else{
                GuardarCambiosTabla.innerHTML="Guarde los cambios antes de agregar otra fila.";
            }
        }
        else{
            form_incompleto.innerHTML="Complete todo el formulario para poder agregar información a la tabla."
        }
    };
    function AsignarInput(id){
        let tr=document.querySelector(`.tr${id}`);
        let tds=tr.children;
        let destino=tds[0].textContent;
        let valorfechaIda=tds[2].textContent;/*este por que no queremos que sea un input de texto*/
        let valorfechaVuelta=tds[3].textContent;
        let j=[1,4,5];/*por que se */
        let pos=0;
        while(pos<j.length){
            let aux=j[pos];
            let valor=tds[aux].textContent;
            tds[aux].innerHTML="";
            let input=document.createElement("input");
            input.value=valor;
            tds[aux].appendChild(input);
            pos++;
        }
        tds[0].innerHTML=
        `<select name="destino" id="destino">
            <option value="Fiordos noruegos, Islas Lofoten y sol de medianoche">Fiordos noruegos, Islas Lofoten y sol de medianoche</option>
            <option value="Oslo">Oslo</option>
            <option value="Tromso">Tromso</option>
            <option value="Trondheim">Trondheim</option>
            <option value="Fiordos, Lagos, Montañas y Cabo Norte">Fiordos, Lagos, Montañas y Cabo Norte</option>
        </select>`;
        document.querySelector("#destino").value=destino;
        tds[2].innerHTML=`<input type="date" name="fechaIda"id="fechaIda">`;
        document.querySelector("#fechaIda").value=valorfechaIda;
        tds[3].innerHTML=`<input type="date" name="fechaVuelta" id="fechaVuelta">`;
        document.querySelector("#fechaVuelta").value=valorfechaVuelta;

        let td_btn=document.querySelector(`.boton${id}`);
        let boton=td_btn.firstChild;
        boton.classList.add("Ver_boton_Modificar");
        boton.addEventListener("click",function(e){
            modificar(boton,e.target.dataset.id);
        });
    };
    function RemoveInput(){
        click=0;
        let tr=document.querySelector(`.tr${ValorIdIngresada}`);
        let tds=tr.children;
        let fila={
            Destinos:tds[0].firstChild.value,
            Descripcion: tds[1].firstChild.value,
            Fechaida: tds[2].firstChild.value,
            Fechavuelta: tds[3].firstChild.value,
            personas: tds[4].firstChild.value,
            costo: tds[5].firstChild.value
        };
        return fila;
    };
    function crearBoton(id, elem,funcion){
        let contenedor=document.querySelector(`.boton${id}`);
        let button = document.createElement("button");
        contenedor.appendChild(button);
        button.dataset.id=elem; /*es un elemento del arreglo fila*/
        if(funcion=="Eliminar"){
            button.classList.add("Ver_boton_Eliminar");
            button.innerHTML = "Eliminar";
            AsignarEventoEliminar();    
        }
        else{
            button.classList.add("boton_Modificar");
            button.innerHTML = "Guardar Cambios";
        }
    };

    function AsignarEventoEliminar(){
        let botones=document.querySelectorAll(".Ver_boton_Eliminar");
        for(let boton of botones){
            boton.addEventListener("click",function(e){
                eliminar(e.target.dataset.id);/*dataset es el data id y el e.target referencia al objeto que en el que se envio el elemento*/
            });
        };  
    };
    async function agregar(cantidad,fila){
        for(let i=0;i<cantidad;i++){
            try{
                let res = await fetch(URL, {
                    "method": "POST",
                    "headers": { "Content-type": "application/json" },
                    "body": JSON.stringify(fila)
                });
                if(res.status==201){
                    console.log("creado");
                }
            }
            catch(error){
                error.innerHTML= "Se ha generado un error.";
                console.log("error");
            };
        };
        
    };
    async function eliminar(id){
        try{
            let res= await fetch(`${URL}/${id}`,{
            "method": "DELETE"
            });
            if(res.status==200){
                console.log("eliminado");
                mostrar();
            };
        }
        catch(error){
            error.innerHTML= "Se ha generado un error.";
            console.log("error");
        }
    };
    async function modificar(boton, id){
        try{
            let res= await fetch(`${URL}/${id}`,{
                "method": "PUT",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(RemoveInput())
            });
            if(res.status==200){
                boton.classList.remove("Ver_boton_Modificar");
                console.log("Cambiado");
                mostrar();
            };
        }
        catch(error){
            error.innerHTML= "Se ha generado un error.";
            console.log("error");
        }
    };
});
