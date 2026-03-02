// "use client";

// import { useState } from "react";
// import ForgotPasswordHero from "../../Components/ForgotPassword/ForgotPasswordHero";
// import EmailStepForm from "../../Components/ForgotPassword/EmailStepForm";
// import VerifyCodeStepForm from "../../Components/ForgotPassword/VerifyCodeStepForm";

// export default function ForgotPasswordScreen() {
//   const [step, setStep] = useState<"email" | "verify" | "reset">("email");
//   const [resetCode, setResetCode] = useState<string>(""); // store code for reset password step

//   const handleNextEmailStep = () => setStep("verify");
//   const handleNextVerifyStep = (code: string) => {
//     setResetCode(code);
//     setStep("reset");
//   };

//   return (
//     <div className="container py-16 mx-auto px-4">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
//         <ForgotPasswordHero />

//         <div>
//           {step === "email" && <EmailStepForm onNext={handleNextEmailStep} />}
//           {step === "verify" && (
//             <VerifyCodeStepForm
//               onNext={() => handleNextVerifyStep(resetCode)}
//               onBack={() => setStep("email")}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import ForgotPasswordHero from "../../Components/ForgotPassword/ForgotPasswordHero";
import EmailStepForm from "../../Components/ForgotPassword/EmailStepForm";
import VerifyCodeStepForm from "../../Components/ForgotPassword/VerifyCodeStepForm";
import ResetPasswordStepForm from "../../Components/ForgotPassword/ResetPasswordStepForm";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [email, setEmail] = useState<string>(""); // store email for reset password step
  const [resetCode, setResetCode] = useState<string>(""); // optional if needed

  // Called after EmailStepForm success
  const handleNextEmailStep = (submittedEmail: string) => {
    setEmail(submittedEmail); // store email for later
    setStep("verify");
  };

  // Called after VerifyCodeStepForm success
  const handleNextVerifyStep = (code: string) => {
    setResetCode(code); // store reset code if API requires
    setStep("reset");
  };

  // Called after ResetPasswordStepForm success
  const handleResetDone = () => {
    setStep("email"); // reset flow or redirect to login page
  };

  return (
    <div className="container py-16 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <ForgotPasswordHero />

        <div>
          {step === "email" && (
            <EmailStepForm onNext={() => handleNextEmailStep(email)} />
          )}

          {step === "verify" && (
            <VerifyCodeStepForm
              onNext={() => handleNextVerifyStep(resetCode)}
              onBack={() => setStep("email")}
            />
          )}

          {step === "reset" && (
            <ResetPasswordStepForm
              resetCode={resetCode} // optional for API
              onDone={handleResetDone}
              onBack={() => setStep("verify")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
