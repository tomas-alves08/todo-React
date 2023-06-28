import React from "react";
import { createTodo, updateTodo } from "../utils/todoService";
import {
  Button,
  FloatingLabel,
  Form,
  FormGroup,
  InputGroup,
} from "react-bootstrap";

function ToDoForm({ form, setForm, createStatus, setCreateStatus }) {
  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    await createTodo(data);
    setForm({ item: "", description: "", dueDate: "" });
  };

  const handleSubmitUpdate = async () => {
    await updateTodo(form.id, form);
    setForm({ id: null, item: "", description: "", dueDate: "" });
    setCreateStatus(true);
  };

  const handleCancel = () => {
    setCreateStatus(true);
    setForm({ id: null, item: "", description: "", dueDate: "" });
  };

  return (
    <div className="mt-3 mb-3">
      <h1>
        {createStatus ? "Create New ToDo" : `Update ToDo Item ${form.item}`}
      </h1>
      <Form>
        <div className="mt-2 mx-2 d-flex justify-content-around align-items-start">
          <FormGroup className="mb-1 w-50" controlId="item">
            <FloatingLabel controlId="floatingItem" label="Type your ToDo...">
              <Form.Control
                type="item"
                style={{ borderWidth: "1px", borderColor: "black" }}
                required
                name="item"
                value={form.item}
                onChange={handleChange}
                placeholder="Type your ToDo..."
              />
            </FloatingLabel>
          </FormGroup>

          <FormGroup className="mb-1 w-50" controlId="description">
            <FloatingLabel
              controlId="floatingItem"
              label="Type the description..."
            >
              <Form.Control
                size="sm"
                type="description"
                required
                style={{ borderWidth: "1px", borderColor: "black" }}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Type your description..."
              />
            </FloatingLabel>
          </FormGroup>

          <Form.Group className="mb-1 w-50 fs-sm" controlId="formGroupCalendar">
            <InputGroup className="mb-2 fs-sm">
              <FloatingLabel
                controlId="floatingNeed"
                className="fs-sm"
                label="dd-mm-yyyy"
              >
                <Form.Control
                  type="date"
                  style={{ borderWidth: "1px", borderColor: "black" }}
                  required
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  placeholder="Assign to a Support Crew Member"
                  alt="Date"
                />
              </FloatingLabel>
            </InputGroup>
          </Form.Group>
        </div>
        <div className="mt-2 mx-2 d-flex justify-content-around align-items-start">
          <Button
            className={`w-${createStatus ? "100" : "50"} ms-3 me-5`}
            onClick={() => {
              createStatus ? handleSubmit(form) : handleSubmitUpdate();
            }}
          >
            Submit
          </Button>
          {!createStatus && (
            <Button
              variant="danger"
              className="w-50 ms-3 me-5"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default ToDoForm;
