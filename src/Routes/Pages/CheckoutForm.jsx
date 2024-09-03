import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thankyou`,
      },
    });
    console.log(error);
    if (error.type === "card_error" || error.type === "validation_error") {
      // setMessage(error.message);
      toast.error(error.message, {
        className: "toastNotification",
      });
    } else {
      toast.error("Payment Failed !", {
        className: "toastNotification",
      });
      // setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className={styles.checkout}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
            className={styles.checkoutbtn}
            disabled={isProcessing || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay Now"}
            </span>
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
