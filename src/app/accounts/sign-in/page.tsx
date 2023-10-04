import Logo from "@/components/Logo";
import { Form } from "@/components/Form";

const SignIn = async () => {
  // try {
  //   const req = await fetch("https://pokeapi.co/api/v2/pokemon");
  //   const data = await req.json();

  // } catch(e) {
  //   console.log(e);
  // }
  return (
    <main className="w-screen h-screen flex justify-center flex-col items-center gap-2">
      <div>
        <Logo isNavbar={false} />
      </div>
      <Form />
    </main>
  );
};

export default SignIn;
