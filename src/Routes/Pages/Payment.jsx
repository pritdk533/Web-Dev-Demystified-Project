import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { getUser } from "../../Utils/getUser";
import {
  BASE_URL,
  STRIPE_PUBLISHABLE_KEY,
  SUPABASE_API_KEY,
} from "../../../constants";

import {
  redirect,
  replace,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { requireAuth } from "../../Utils/requireAuth";
import { isTokenExpired } from "../../Utils/isTokenExpired";
import refresh_token from "../../Utils/refreshToken";
import axios from "axios";
import styles from "./Payment.module.css";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useEffect, useState } from "react";

export async function paymentLoader({ request, params }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth(pathname);
  let { access_token, expires_at } = await getUser();
  if (isTokenExpired(expires_at)) {
    console.log("Token Expired :(");
    access_token = await refresh_token();
  }
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/functions/v1/create-stripe-payment`,
        { course_id: params.course_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            apiKey: SUPABASE_API_KEY,
          },
        }
      );

      return { clientSecret: data.clientSecret, error: null };
    } catch (error) {
      return {
        error: error?.response?.data?.error || error.message,
        clientSecret: null,
      };
    }
  };
  return await createPaymentIntent();
}
function Payment() {
  const { error, clientSecret } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name");

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  if (error) {
    return <h1>{error}</h1>;
  }
  useEffect(() => {
    window.scroll(0, 0);
    if (!isModalOpen) {
      navigate(`/course-detail/${params.course_id}?name=${courseName}`);
    }
  }, [!isModalOpen]);
  return (
    <>
      <div>
        {isModalOpen && (
          <PurchaseModal closeModal={closeModal}>
            <div className={styles.paymentHeading}>
              <p className={styles.paymentHeading_p1}>Payment Checkout </p>
              <p className={styles.paymentHeading_p2}>{courseName} Course</p>
            </div>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </PurchaseModal>
        )}
      </div>
    </>
  );
}

export default Payment;
