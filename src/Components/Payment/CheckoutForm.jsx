/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hookes/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ classDetails, isPending }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const totalPrice = classDetails?.price;
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { image, shortDescription, title, price, _id: id } = classDetails;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log('Received client secret:', res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error('Error creating payment intent:', error);
                setError('Failed to create payment intent. Please try again.');
            });
    }, [axiosSecure, totalPrice]);

    if (isPending) {
        return <div className="w-10 h-10 my-5 mx-auto animate-spin rounded-full border-8 border-dotted border-sky-600"></div>;
    }

    const handleSaveData = async () => {
        const data = {
            title: title,
            image: image,
            description: shortDescription,
            price: price,
            email: user?.email,
            id
        };
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myEnrollClass')
        }

    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            setError('Stripe has not loaded yet. Please try again later.');
            setIsLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            setError('Card details not entered. Please enter your card details.');
            setIsLoading(false);
            return;
        }

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodError) {
            setError(methodError.message);
            setIsLoading(false);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        if (!clientSecret) {
            setError('Client secret not set. Please try again.');
            setIsLoading(false);
            return;
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
        } else {
            setError('Payment failed. Please try again.');
        }
        handleSaveData();

        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary btn-sm my-4" type="submit" disabled={!stripe || !clientSecret || isLoading}>
                {isLoading ? 'Processing...' : 'Pay'}
            </button>
            <p className="text-xl text-red-500">{error}</p>
            {transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
