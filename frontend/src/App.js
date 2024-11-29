import { Button, Card, Container, Form } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [formulario, setFormulario] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);


  const questionnarie = {
    preguntas: [
      "¿El tutor demuestra un buen conocimiento de la materia?",
      "¿El tutor está bien preparado para las sesiones?",
      "¿El tutor explica los conceptos claramente?",
      "¿El tutor utiliza ejemplos prácticos para facilitar el aprendizaje?",
      "¿El tutor adapta sus métodos de enseñanza según las necesidades del estudiante?",
      "¿El tutor fomenta una buena comunicación?",
      "¿El tutor es puntual y respetuoso con el tiempo?",
      "¿El tutor demuestra interés genuino en el progreso del estudiante?"
    ],
    opciones: ["Siempre", "Casi siempre", "A veces", "Nunca"]
  };
  

  const onChange = (e) => {
    e.preventDefault();
    const obj = { ...formulario };
    obj[e.target.name] = e.target.value;
    setFormulario(obj);

    if (
      formulario.TutorName && formulario.TutorName !== "" &&
      formulario.StudentName && formulario.StudentName !== "" &&
      formulario.Subject && formulario.Subject !== ""
    ) {
      setIsEnabled(false);
    }
  };

  const onSumbit = async () => {
    //validar que las preguntas fueron contestadas
    const questionsUnanswered = [];
    questionnarie.preguntas.map((_, i) => {
      if (!answers[`pregunta_${i}`]) {
        questionsUnanswered.push(i + 1)
      }
  })
  if (questionsUnanswered.length > 0) {
    Swal.fire(
      "ops, parece que faltan preguntas por contestar", questionsUnanswered.join(`, `), "error");
      return;
  
  }
  Swal.fire("enviando respuestas")
  Swal.showLoading()
  try {
    await axios.post("http:localhost:4000/save-answers", answers);
    Swal.fire("respuestas almacenadas con exito","","success")
  } catch (error) {
    Swal.fire("ocurrio un error al guardar las respuestas", error)
  }
}

return (
  <Container className="mt-3">
    <Card>
      <Card.Body>
        <Card.Title>Formulario de evaluación docentes</Card.Title>
        <Form onSubmit={onSubmit}>
          {questionnarie.preguntas.map((pregunta, i) => (
            <Form.Group key={`q-${i}`} className="mb-3">
              <Form.Label>{`${i + 1}. ${pregunta}`}</Form.Label>
              {questionnarie.opciones.map((opcion, io) => (
                <Form.Check
                  key={`${i}-${io}`}
                  type="radio"
                  id={`q${i}-option${io}`}
                  name={`pregunta_${i}`}
                  value={opcion}
                  label={opcion}
                  onChange={onChange}
                />
              ))}
            </Form.Group>
          ))}
          <Button type="submit" variant="primary">
            Enviar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
);
}

export default App;