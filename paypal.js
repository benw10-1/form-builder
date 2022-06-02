import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51L3X4uHuCnVio8ZGZ75M5oDshBH4IsmvkUilbi2rq1VtBJw91PCOzrVmzAtHKUEPaecZXcryqD30Q62DrIqzF3Tb00Cd4E1vCJ"
    >
      // Your app code here
    </StripeProvider>
  );
}

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      // see below
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <Screen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
    );
  }

  export default function CheckoutScreen() {
    // continued from above
  
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    };
  
    return (
      <Screen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
    );
  }