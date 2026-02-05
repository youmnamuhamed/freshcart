import SignUpForm from "../../Components/SignUp/SignUpForm";
import SignUpHero from "../../Components/SignUp/SignUpHero";

export default function SignUpScreen() {
  return (
    <>
      <div className="py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 ">
          <SignUpHero />
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
