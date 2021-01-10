import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
function Poll({ location }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ id: '', options: '', count: 0 }]);
  const [pollid, setPollid] = useState('');
  const [response, setResponse] = useState({
    id: '',
    options: '',
    count: 0,
  });
  //console.log(response);

  useEffect(() => {
    var x = queryString.parse(location.search);
    const id = x.id;
    setPollid(id);
    //console.log(id);
    axios
      .get(`http://localhost:5000/getpoll/${id}`)
      .then(function (response) {
        let medium = [];
        const data = response.data;
        console.log(data);
        setQuestion(data.question);
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });
        setOptions(medium);
        //console.log('options', options);
        //console.log('medium', medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('newresponse', response);
    axios
      .post('http://localhost:5000/submitresponse', response)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="ui-container py-5 px-5">
      <div>
        <h2 className=" mb-5 heading">{question}</h2>
        <div className="flex flex-column w-75 mr-auto ml-auto">
          <form onSubmit={handleSubmit}>
            {options.map((option) => (
              <div
                className="py-3 w-100 mb-4 shadow-lg hover-zoom px-2  rounded bg-white"
                key={option.id}
              >
                <div className="flex align-items-center">
                  <input
                    type="radio"
                    id={option.id}
                    name="option"
                    value={option.options}
                    checked={response.options === option.options}
                    onChange={() =>
                      setResponse({
                        id: option.id,
                        options: option.options,
                        count: option.count + 1,
                        pollid: pollid,
                      })
                    }
                    className="d-inline-block ml-3 mr-3"
                  />
                  <h4 className=" font-weight-bold text-primary-dark d-inline-block">
                    {option.options}
                  </h4>
                </div>
              </div>
            ))}

            <div className="mt-5 d-flex flex-column flex-md-row">
              <div className="col-0 col-md-8">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="focus-outline-none py-3 font-weight-bold focus-shadow w-50 bg-success text-white px-2 shadow-lg hover-shadow-lg rounded-lg"
                >
                  Submit your vote
                </button>
              </div>
              <div className="col-0 col-md-4 ">
                <a className="" href="/">
                  <h5 className=" display-8 float-right text-secondary font-weight-normal">
                    View Results <FontAwesomeIcon icon={faChevronRight} />
                  </h5>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Poll;
