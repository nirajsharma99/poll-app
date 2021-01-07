import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBolt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function MainContent() {
  const history = useHistory();
  const [questions, setQuestion] = useState({ id: uuidv4(), question: '' });
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), options: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Inputfields', inputFields);
    console.log('question', questions);
    const data = { question: questions, options: inputFields };
    axios
      .post('http://localhost:5000/api', data)
      .then(function (response) {
        console.log(response.data._id);
        history.push(`/new/?id=${questions.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };
  const handleQuestion = (id, event) => {
    //console.log(event.target.value + 'value');
    setQuestion({ id: id, question: event.target.value });
  };

  const handleAddfields = () => {
    setInputFields([...inputFields, { id: uuidv4(), options: '' }]);
  };
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div className="ui-container py-5 px-5">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto">
          <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
            <div>
              <h3>Create Poll</h3>
              <p className="mt-4 mb-0 text-large text-secondary font-medium">
                Complete below fields to create a poll
              </p>
            </div>
            <Link to="/demo-poll">
              <span className="text-lg text-blue align-self-end font-weight-bolder">
                View a Demo Poll
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex flex-column question">
              <label className="mb-3 w-100 font-weight-bold content-text">
                Poll Question
              </label>
              <textarea
                name="question"
                className="textareastyle w-100 py-4 rounded-lg px-3 focus:shadow-outline outline-none  border border-gray focus:shadow-outline"
                placeholder="What's you favorite TV Show?"
                style={{ resize: 'none' }}
                value={questions.question}
                onChange={(event) => handleQuestion(questions.id, event)}
              ></textarea>
            </div>

            {inputFields.map((inputField, index) => (
              <div className="options mt-2 flex-column">
                <div className="flex align-items-center mb-3">
                  <div className="flex flex-column" key={inputField.id}>
                    <label
                      for={inputField.id}
                      className="mb-3 w-100 content-text font-weight-bold"
                    >
                      Option {index + 1}
                    </label>
                    <div className="flex align-items-center justify-content-between">
                      <input
                        name="options"
                        id={inputField.id}
                        className=" py-3 rounded-lg px-3 textareastyle inputfield focus-shadow transition-all duration-200 text-gray-700 focus-outline-none  border border-gray-300 focus:shadow-outline"
                        placeholder={'Option' + (index + 1)}
                        value={inputField.options}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }
                      />
                      <button
                        hidden={inputFields.length === 1}
                        onClick={() => handleRemoveFields(inputField.id)}
                        className=" delete ml-2"
                      >
                        <FontAwesomeIcon
                          className=" text-danger"
                          icon={faTrashAlt}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddfields}
              className="px-5 py-3 focus:shadow-outline  bg-dark rounded-lg text-lg font-weight-bold flex align-items-center justify-content-between text-white focus:outline-none hover:text-gray-200"
            >
              <span className="mr-3">
                Add another option
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </span>
            </button>
          </div>
          <div className="flex justify-content-center mt-5 pt-3 ">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-5 py-3 bg-success text-white font-weight-bold rounded-lg"
            >
              <FontAwesomeIcon className="mr-2" icon={faBolt} />
              Create your poll
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainContent;
