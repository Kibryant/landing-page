import getStripe from "@/core/get-stripejs";

const Checkout = async () => {
  const stripe = await getStripe();
  const handlePayment = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("api/products/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // priceId: price.id
        })
      }).then(async (res) => {
        const result = await res.json();
        console.log(result);

        if (result.status !== 201) {
          // setMessageError(result.message);
          return;
        }

        // setFormSubmitting(false);
        // localStorage.setItem("arthur-adm-system", formAdm.email);
        // router.push("/adm");
      });
    } catch (error) {
      //   setFormSubmitting(false);
      //   setMessageError(`Error: ${error}`);
      console.log(error);
    }
  };
  return <main></main>;
};

export default Checkout;
