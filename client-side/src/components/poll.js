import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTelegramPlane,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
function Poll() {
  return (
    <div className="ui-container py-5">
      <div className="mb-5 mb-md-5 pb-md-0 my-4">
        <h2 className=" mb-5 heading">
          How much would you pay for an ebook on productivity?
        </h2>
        <div className="d-flex flex-column flex-md-row">
          <div className="d-flex w-100 col-12 col-md-8 flex-column">
            <div style={{ position: 'relative' }}>
              <div>
                <div className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h2 className=" font-weight-bold text-primary-dark">
                        $2
                      </h2>
                    </div>
                    <div className=" ">
                      <h2 className=" font-weight-bold text-primary-dark">
                        32%
                      </h2>
                    </div>
                  </div>
                  <div className="w-100 rounded-lg ">
                    <div
                      className="rounded-lg d-block bg-success mt-3"
                      style={{ width: '32%', height: '0.5rem' }}
                    >
                      &nbsp;
                    </div>
                  </div>
                  <p className="mt-3 text-green">67 Votes</p>
                </div>
              </div>
              <div>
                <div className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h2 className=" font-weight-bold text-primary-dark">
                        $5
                      </h2>
                    </div>
                    <div className="">
                      <h2 className=" font-weight-bold text-primary-dark">
                        29%
                      </h2>
                    </div>
                  </div>
                  <div className="h-2 w-100 bg-gray-300 rounded-lg ">
                    <div
                      className="rounded-lg d-block bg-success mt-3"
                      style={{ width: '29%', height: '0.5rem' }}
                    >
                      &nbsp;
                    </div>
                  </div>
                  <p className="mt-3 text-green-600 text-xs lg:text-base">
                    60 Votes
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <h2 className=" font-weight-bold text-primary-dark">$10</h2>
                  </div>
                  <div className="">
                    <h2 className=" font-weight-bold text-primary-dark">22%</h2>
                  </div>
                </div>
                <div className="h-2 w-100 bg-gray-300 rounded-lg ">
                  <div
                    className="rounded-lg d-block bg-success mt-3"
                    style={{ width: '22%', height: '0.5rem' }}
                  >
                    &nbsp;
                  </div>
                </div>
                <p className="mt-3 text-green-600 text-xs lg:text-base">
                  45 Votes
                </p>
              </div>
              <div>
                <div className="py-0 bg-white px-3  rounded-lg shadow-lg position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h2 className=" font-weight-bold text-primary-dark">
                        $20
                      </h2>
                    </div>
                    <div className="">
                      <h2 className=" font-weight-bold text-primary-dark">
                        17%
                      </h2>
                    </div>
                  </div>
                  <div className="h-2 w-100 bg-gray-300 rounded-lg ">
                    <div
                      className="rounded-lg d-block bg-success mt-3"
                      style={{ width: '17%', height: '0.5rem' }}
                    >
                      &nbsp;
                    </div>
                  </div>
                  <p className="mt-3 text-green-600 text-xs lg:text-base">
                    35 Votes
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-100 col-12 col-md-4 mb-0 rounded-lg ">
            <a
              className="bg-success text-decoration-none font-weight-bold mb-5 px-2 py-4 rounded-lg text-center text-white "
              href="/poll/zZc2llSqrBdWltyr3TMv"
            >
              Submit your vote
            </a>
            <div className="w-100 bg-white d-flex flex-column border-t border-gray-300 border-top-0 rounded-lg self-start px-3 py-3 ">
              <a
                className="bg-success py-3 px-2 mt-4 d-none font-weight-bold rounded-lg text-center text-white text-nowrap  "
                href="/poll/zZc2llSqrBdWltyr3TMv"
              >
                Submit your vote
              </a>
              <div className="d-flex flex-column justify-content-between">
                <div className="">
                  <p className="font-weight-normal text-secondary text-left mb-0 text-sm lg:text-base">
                    Total Votes
                  </p>
                  <h3 className="count font-weight-bold text-primary-dark">
                    207
                  </h3>
                </div>
                <div className="d-flex flex-column">
                  <p className="font-semibold mb-2 text-primary-secondary text-left">
                    Share
                  </p>
                  <a
                    className="bg-primary text-decoration-none font-weight-bold mb-4 px-0 py-2 rounded-lg text-center  text-white "
                    href="/"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                    &nbsp;Share on Twitter
                  </a>
                  <a
                    className="bg-success text-decoration-none font-weight-bold mb-4 px-0 py-2 rounded-lg text-center  text-white "
                    href="/"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                    &nbsp;Share on Whatsapp
                  </a>
                  <a
                    className="bg-info text-decoration-none font-weight-bold mb-4 px-0 py-2 rounded-lg text-center  text-white "
                    href="/"
                  >
                    <FontAwesomeIcon icon={faTelegramPlane} />
                    &nbsp;Share on Telegram
                  </a>
                  <a
                    className="bg-primary text-decoration-none font-weight-bold mb-4 px-0 py-2 rounded-lg text-center  text-white "
                    href="/"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                    &nbsp;Share on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Poll;
