import { Button, Card, Container, Form} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Swal from'sweetalert2';

function App() {
  const [formulario, setformulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true); //Se le pone true porque inicia "apagado"

  const onChange = (e)=>{
    e.preventDefault();
    const obj = formulario; //Lo volvemos un "valor" para el objeto y tener todas las propiedades
    obj[e.target.name] = e.target.value;
    console.log(formulario);
    setformulario(obj)

    //El if es para validar que el formulario este completado
    if((formulario.name && formulario.name !== "") &&
      (formulario.last_name && formulario.last_name !== "") &&
      (formulario.email && formulario.email !== "")
    ){
      setIsEnabled(false) //Si lo del if se cumple, el valor se vuelve false para encenderlo (por la pregunta de disabled que sería ¿Estoy deshabilitado?)
    }
  };

  const onSubmit = async ()=>{
    try {
      Swal.fire('Enviando los datos...');
      Swal.showLoading();
      await axios.post('http://localhost:4000/create', formulario);
      Swal.fire('¡Datos registrados exitosamente!','','success')
    } catch (error) {
      console.log(error);
      Swal.fire('¡Error al registrar los datos!','', 'error')
    }
  }

  return (
    <Container>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title>Formulario para evaluacion de tutores</Card.Title>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Nombre del alumno</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el nombre del alumno' name='name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Apellidos del alumno</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa los apellidos del alumno' name='last_name'/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control onChange={onChange} placeholder='Ingresa el correo institucional del alumno' type='email' name='email'/> 
            </Form.Group>
            <Button onClick={() => {onSubmit()}} disabled= {isEnabled} variant="outline-success">Enviar</Button>
            <Button variant="outline-danger" type='reset'>Cancelar</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
