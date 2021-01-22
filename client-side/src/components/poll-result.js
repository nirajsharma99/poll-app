import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Notification from './notification';
import randomColor from 'randomcolor';
import SocialShare from './social-share';
function PollResult({ location }) {
  const [pollid, setPollid] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ id: '', options: '', count: 0 }]);
  const [showQR, setShowQR] = useState(false);
  const [localkey, setLocalkey] = useState('');
  let totalvotes = 0;
  options.map((x) => {
    return (totalvotes += x.count);
  });
  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: '',
    not: '',
  });
  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };
  var cache = JSON.parse(localStorage.getItem(localkey));
  useEffect(() => {
    setLocalkey(question.toLowerCase().trim().slice(0, 2) + pollid.slice(0, 4));
    if (cache != null && cache.id === pollid && cache.show === 0) {
      setToast({
        snackbaropen: true,
        msg: 'Thankyou for voting!',
        not: 'success',
      });
      localStorage.setItem(
        localkey,
        JSON.stringify({ id: cache.id, selected: cache.selected, show: 1 })
      );
    }
  });

  useEffect(() => {
    var x = queryString.parse(location.search);
    const id = x.id;
    setPollid(id);
    axios
      .get(`http://localhost:5000/getpoll/${id}`)
      .then(function (response) {
        let medium = [];
        const data = response.data;
        setQuestion(data.question);
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });
        setOptions(medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const QR = () => (
    <div
      className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
      onClick={() => {
        setShowQR(false);
      }}
      style={{
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(135,206,235 ,0.7)',
      }}
    >
      <div className="d-flex flex-column align-items-center bg-white">
        <span className="font-weight-bold ">Scan QR Code</span>
        <QRCode
          value={`http://localhost:3000/poll/?id=${pollid}`}
          size={290}
          level={'H'}
          includeMargin={true}
        />
      </div>
    </div>
  );
  const ShowButton = () => (
    <a
      className="bg-success text-decoration-none font-weight-bold mb-5 px-2 py-4 rounded-lg text-center text-white "
      href={'/poll/?id=' + pollid}
    >
      Submit your vote
    </a>
  );
  const ShowSelection = () => (
    <span
      className="bg-info w-100 text-decoration-none font-weight-bold mb-5 px-2 py-3 rounded-lg text-center text-white "
      style={{
        wordWrap: 'break-word',
      }}
    >
      You voted for {cache.selected}
    </span>
  );
  return (
    <div className="ui-outer">
      <div className="ui-container py-5 position-relative">
        <div className="mb-5 mb-md-5 pb-md-0 my-4 ">
          <h2
            className=" mb-5 heading w-100"
            style={{
              wordWrap: 'break-word',
            }}
          >
            {question}
          </h2>
          <div className="d-flex flex-column flex-md-row">
            <div className="d-flex w-100 col-12 col-md-8 flex-column">
              <div style={{ position: 'relative' }}>
                <div>
                  {options.map((x) => (
                    <div
                      className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative"
                      key={x.id}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <div
                          className="d-flex align-items-center"
                          style={{ width: '88%' }}
                        >
                          <h2
                            className=" font-weight-bold text-primary-dark"
                            style={{
                              wordWrap: 'break-word',
                              width: '80%',
                            }}
                          >
                            {x.options}
                          </h2>
                        </div>
                        <div className=" ">
                          <h2 className=" font-weight-bold text-primary-dark">
                            {totalvotes === 0
                              ? 0
                              : ((x.count / totalvotes) * 100).toFixed(0)}
                            %
                          </h2>
                        </div>
                      </div>
                      <div className="w-100 rounded-lg ">
                        <div
                          className="rounded-lg d-block mt-3"
                          style={{
                            width: `${
                              totalvotes === 0
                                ? 0
                                : (x.count / totalvotes) * 100
                            }%`,
                            height: '0.5rem',
                            backgroundColor: `${randomColor()}`,
                          }}
                        >
                          &nbsp;
                        </div>
                      </div>
                      <p className="mt-3 text-green">{x.count} Votes</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column w-100 col-12 col-md-4 mb-0 rounded-lg ">
              <Notification
                switcher={toast.snackbaropen}
                close={snackbarclose}
                message={toast.msg}
                nottype={toast.not}
              />
              {cache != null ? (
                cache.id === pollid ? (
                  <ShowSelection />
                ) : (
                  <ShowButton />
                )
              ) : (
                <ShowButton />
              )}
              <div className="w-100 bg-white d-flex flex-column border-t border-gray-300 border-top-0 rounded-lg self-start px-3 py-3 ">
                <div className="d-flex flex-column justify-content-between">
                  <div className="">
                    <p className="font-weight-normal text-secondary text-left mb-0 text-sm lg:text-base">
                      Total Votes
                    </p>
                    <h3 className="count font-weight-bold text-primary-dark">
                      {totalvotes}
                    </h3>
                  </div>
                  <div className="d-flex flex-row flex-md-column">
                    <p className="font-weight-bold d-none d-md-inline-block mt-2 mb-4 text-primary-secondary text-left">
                      Share
                    </p>
                    <button
                      className="bg-warning font-weight-bold mb-4 px-0 py-2 rounded-lg text-center border-0 text-white mr-3 "
                      onClick={() => {
                        setShowQR(true);
                      }}
                    >
                      <FontAwesomeIcon className="ml-3 mr-3" icon={faQrcode} />
                      <snap className="d-none d-md-inline-block ">
                        Share via QRcode
                      </snap>
                    </button>
                    <SocialShare
                      url={'http://localhost:3000/poll/?id=' + pollid}
                      question={question}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showQR ? <QR /> : null}
    </div>
  );
}
export default PollResult;
