"use client";

import { Section } from "@/components/Section";
import { useCart } from "@/contexts/CartContext";
import { GiftIcon } from "@heroicons/react/24/outline";

interface CartProps {}

const Cart = ({}) => {
  const { cart, removeFromCart } = useCart();
  const products = cart.map((item) => item.product);
  const quantity = cart.map((item) => item.quantity);
  // const quantityTotal = cart.reduce((acumulate, item) => item.quantity + acumulate , 0);
  // console.log(products);
  // console.log(quantityTotal);
  console.log(cart.map((item) => item.quantity));

  const handlePayment = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("/api/products/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          products,
          quantity
        })
      }).then(async (response) => {
        const res = await response.json();
        console.log(response);

        if (res.status !== 201) {
          // setMessageError(result.message);
          return;
        }

        const session = res.data;

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
  return (
    <main>
      <Section>
        <div className="flex gap-2 w-full">
          {cart.map((item, index) => (
            <div className="p-5 rounded-md border border-brandPink flex-col gap-1" key={item.product.id}>
              <GiftIcon className="h-8 w-8 text-brandPink" />
              <h3 className="text-white text-2xl">{item.product.product}</h3>
              <h3 className="text-zinc-300 text-xl">{item.product.price}</h3>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <form onSubmit={handlePayment}>
          <button type="submit" className="py-2 px-4 bg-emerald-500 text-white uppercase font-medium">
            {" "}
            Buy{" "}
          </button>
        </form>
      </Section>
    </main>
  );
};

export default Cart;
