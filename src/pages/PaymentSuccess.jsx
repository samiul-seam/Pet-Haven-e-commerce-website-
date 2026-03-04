import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div>
            <p>Pyament success</p>
            <div className='flex gap-3'>
            <p>Return to</p>
            <Link to={"/dashboard"} className='underline text-blue-600' >Dashboard</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;