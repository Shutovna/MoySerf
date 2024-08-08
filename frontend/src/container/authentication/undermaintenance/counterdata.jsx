import { Col, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';
// import TimeFormat from 'hh-mm-ss'

const AfterComplete = () => <span>You are good to go!</span>;

// Renderer callback with condition
const rendering = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <AfterComplete />;
  } else {
    // Render a countdown
    return (
      // <Row className="mt-4 gy-xxl-0 gy-3 mb-5 gy-xxl-0 gy-3">
      <Row className="row mt-4 mb-5 gy-xxl-0 gy-3 justify-content-center">
        <Col xxl={3} xl={6} lg={6} md={3} sm={3} className='col-6'>
          <div className='p-3 under-maintenance-time rounded'>
            <p className='mb-1 fs-12 op-5'>DAYS</p>
            <h4 className="fw-semibold mb-0">{days}</h4>
          </div>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={3} sm={3} className='col-6'>
          <div className='p-3 under-maintenance-time rounded'>
            <p className='mb-1 fs-12 op-5'>HOURS</p>
            <h4 className="fw-semibold mb-0">{hours}</h4>
          </div>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={3} sm={3} className='col-6'>
          <div className='p-3 under-maintenance-time rounded'>
            <p className='mb-1 fs-12 op-5'>MINUTES</p>
            <h4 className="fw-semibold mb-0">{minutes}</h4>
          </div>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={3} sm={3} className='col-6'>
          <div className='p-3 under-maintenance-time rounded'>
            <p className='mb-1 fs-12 op-5'>SECONDS</p>
            <h4 className="fw-semibold mb-0">{seconds}</h4>
          </div>
        </Col>
      </Row>
    );
  }
};

export function DayCounter() {
  return (<Countdown date={Date.now() + 8500590000} renderer={rendering} />);
}
