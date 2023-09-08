import Logo from "@/components/Logo";
import { RegisterComponent } from "@/components/RegisterComponent";

const Register = async () => {
  return (
    <main className="w-screen h-screen flex justify-center flex-col items-center gap-2">
      <div>
        <Logo isNavbar={false} />
      </div>
      <RegisterComponent />
    </main>
  );
};

export default Register;
