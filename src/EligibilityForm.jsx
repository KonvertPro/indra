import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import skyImg from './assets/Sky.jpg';
import LakeImg from './assets/Lake.jpg';
import MountainImg from './assets/Mountain.jpg';
import SupplementImg from './assets/Supplements.jpg';
import FunctionalImg from './assets/Functional_Mushrooms.jpg';

const KIT_FORM_UID_DISQUALIFIED='d6cbd0d552'
const KIT_FORM_UID_ELIGIBLE='d9901bc89c'

const KIT_SCRIPT_SRC_ELIGIBLE = `https://indra-5.kit.com/${KIT_FORM_UID_ELIGIBLE}/index.js`;
const KIT_SCRIPT_SRC_DISQUALIFIED=`https://indra-5.kit.com/${KIT_FORM_UID_DISQUALIFIED}/index.js`;



const EligibilityForm = () => {
  const kitEligibleRef = useRef(null);
  const totalSteps = 6;
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [submitted, setSubmitted] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [error, setError] = useState('');

const handleKitEligibleRef = (node) => {
  kitEligibleRef.current = node;
  if (!node || step !== 5) return;

  node.innerHTML = '';

  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-uid', KIT_FORM_UID_ELIGIBLE);
  script.src = KIT_SCRIPT_SRC_ELIGIBLE;
  node.appendChild(script);
};


 useEffect(() => {
    if (step !== 5) return;
    const raf = requestAnimationFrame(() => injectKit('kit-form-mount-eligible'));
    return () => cancelAnimationFrame(raf);
  }, [step]);


useEffect(() => {
  if (!disqualified) return;
  const mount = document.getElementById('kit-form-mount');
  if (!mount) return;
  mount.innerHTML = '';
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-uid', KIT_FORM_UID_DISQUALIFIED);
  script.src = KIT_SCRIPT_SRC_DISQUALIFIED;
  mount.appendChild(script);
  return () => {
    mount.innerHTML = '';
  };
}, [disqualified]);








const initialFormData = {
  ageConfirmed: null,
  offeredTwoTreatments: null,
  psychosis: null,
  pregnant: null,
  emailcapture: null,
};
const [formData, setFormData] = useState(initialFormData);


  // Animation variants for step panels
  const panelVariants = {
    initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2, ease: 'easeIn' } }),
  };



  const handleAnswer = (key, value, nextStep, disqualify = false) => {
    setDirection(1);
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (disqualify) {
      setDisqualified(true);
    } else {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
  
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit form');
      await new Promise((res) => setTimeout(res, 500));
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-700 h-2 rounded">
      <div
        className="h-2 bg-indra-lime rounded transition-all duration-300"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );

  const BackButton = () =>
    step > 1 ? (
      <div className="flex justify-start">
        <button
          onClick={handleBack}
          className="mt-6 text-sm text-indra-lime hover:underline"
        >
          ← Go Back
        </button>
      </div>
    ) : null;

  // Submitted screen (animated)
  // Submitted screen (animated)
if (submitted) {
  return (
    <div className="min-h-screen bg-indra-purple flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key="submitted"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
          className="bg-indra-dark shadow-md rounded-xl p-8 max-w-xl w-full text-center text-indra-light"
        >
          <h2 className="text-2xl font-bold mb-4 text-indra-lime">Thank you!</h2>
          <p className="mb-6">
            We’ve received your information and will follow up shortly.
          </p>

          <div className="flex flex-col gap-4">
            {/* Continue button */}
            <a
              href="https://questionnaire.semble.io/ea1e3bdc75995ead08de93bc3b6adb61396a24c6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Continue to Medical Questionnaire
            </a>

            {/* Back to website button */}
            <a
              href="https://indra.clinic/"
              className="bg-transparent border border-indra-lime text-indra-lime px-6 py-3 rounded-lg font-semibold hover:bg-indra-lime hover:text-indra-dark transition"
            >
              Back to Indra Clinic
            </a>
            
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



  // Disqualified screen — with animated entry + wellness cards
  if (disqualified) {
    const wellness = [
      { title: 'Meditation', href: 'https://indra.clinic/', img: skyImg },
      { title: 'Breathwork', href: 'https://indra.clinic/', img: MountainImg },
      { title: 'Sound Healing', href: 'https://indra.clinic/', img: LakeImg },
      { title: 'Functional Mushrooms', href: 'https://indra.clinic/', img: FunctionalImg },
      { title: 'Supplements', href: 'https://indra.clinic/', img: SupplementImg },
    ];

return (
  <div className="min-h-screen bg-indra-purple flex items-center justify-center p-4">
    <AnimatePresence mode="wait">
      <motion.div
        key="disq"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
        className="bg-indra-mushroom shadow-md rounded-2xl p-8 md:p-10 w-full max-w-5xl text-indra-light"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indra-lime mb-3">You're not eligible</h2>
          <p className="mb-2">Don’t worry! You’re eligible for Indra’s full range of wellness services.</p>
          <p className="text-indra-grey">
            Explore options below. These can support sleep, stress, focus and overall wellbeing.
          </p>
        </div>

        {/* KIT email capture (only on red route) */}
        <div className="mt-10 mb-12 max-w-lg mx-auto w-full">
          <h3 className="text-center text-indra-light font-semibold mb-3">
            Get wellness updates & offers
          </h3>
          {/* Kit injects the form here via the script we add in useEffect */}
          <div id="kit-form-mount" 
              className="bg-indra-dark/40 rounded-xl p-4" />
        
          <p className="text-center text-xs text-indra-grey mt-2">
            We’ll only email about non-medical wellness services/products.
          </p>
        
        </div>

        {/* Smaller cards: reduced padding, height, and label size */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {wellness.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-xl bg-indra-dark/40 p-2 sm:p-3 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indra-lime"
            >
             <div
  className="rounded-xl aspect-square shadow-md flex items-center justify-center bg-cover"
  style={{
    backgroundImage: `url(${item.img})`,
    backgroundPosition: item.title === 'Functional Mushrooms' ? 'center 0' : 'center center', // Example: move up for Functional Mushrooms
  }}
>
  {/* optional overlay for contrast:
  <div className="absolute inset-0 bg-black/10 rounded-xl" /> */}
</div>
              <div className="bg-white text-gray-900 rounded-lg mt-2 px-3 py-2 text-sm font-medium shadow-sm">
                {item.title}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://indra.clinic/"
            className="text-center bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Back to Indra Clinic
          </a>
          <button
            className="text-center bg-transparent border border-indra-lime text-indra-lime px-6 py-3 rounded-lg font-semibold hover:bg-indra-lime hover:text-indra-dark transition"
            onClick={() => {
              setDisqualified(false);
              setFormData(initialFormData); // resets everything properly
              setDirection(-1);
              setStep(1);
            }}
          >
            Start questionnaire again
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);
  }

  // Main form (animated step transitions)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-sans">
      {/* Left: Form Content */}
      <div className="flex flex-col p-6 md:p-12 bg-indra-purple min-h-screen">
        {/* Header */}
        <div className="mb-10 md:text-left">
          <h1 className="text-4xl font-bold text-indra-lime mb-2">Eligibility Questionnaire</h1>
          <p className="text-lg text-indra-light">Let's find out if you're eligible.</p>
        </div>

        {/* Steps */}
        <div className="flex-1 max-w-2xl w-full flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              variants={panelVariants}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
            >
            

              {/* Step 1: Age */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Are you over 18 years old?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                      onClick={() => handleAnswer('ageConfirmed', true, 2)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                      onClick={() => handleAnswer('ageConfirmed', false, 0, true)}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">You must be over 18 to qualify for treatment.</p>
                </>
              )}

              {/* Step 2: Two treatments offered */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Have you been offered at least 2 different consultations/treatments for your condition?   
                  </h2>
                 <h3 className="text2xl font semibold mb-6 text-indra-light opacity 75">
                  If you have only had 1 consultation/treatment, please continue with 'Yes'. However you may not be eligible for treatment but a consultation with us is still recommended.
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('offeredTwoTreatments', true, 3)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('offeredTwoTreatments', false, 0, true)}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">
                    This can include medication, talking therapy, physiotherapy, surgery and anything else
                    prescribed by your GP.
                  </p>
                  <BackButton />
                </>
              )}

              {/* Step 3: Psychosis/Schizophrenia */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Have you ever been diagnosed with psychosis or schizophrenia?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('psychosis', true, 0, true)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('psychosis', false, 4)}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">If yes, we won't be able to prescribe some of our products.</p>
                  <BackButton />
                </>
              )}

              {/* Step 4: Pregnant */}
              {step === 4 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">Are you pregnant or breastfeeding?</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('pregnant', true, 0, true)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('pregnant', false, 5)}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">
                    Pregnancy is a contraindication for cannabis-based treatments.
                  </p>
                  <BackButton />
                </>
              )}

           {/* Step 5: Eligible Email capture */}
{step === 5 && (
  <>
    <h2 className="text-2xl font-semibold mb-4 text-indra-light">
      Good news! You’re eligible for treatment.
    </h2>

    <div className="flex flex-col gap-3 mb-6 text-left">
      {/* Kit embed mount for eligible route */}
      <div
        id="kit-form-mount-eligible"
        ref={handleKitEligibleRef}
        className="bg-indra-dark/40 rounded-xl p-4"
        aria-live="polite"
      />

      <p className="text-indra-grey text-sm">
      Submit your email above, then click Continue.
    </p>
      
  

    </div>

    <BackButton />
  </>
)}





{/* {step === 6 && (
  <>
    <h2 className="text-2xl font-semibold mb-4 text-indra-light">
      Begin your Indra journey
    </h2>

    <div className="flex flex-col gap-3 mb-6 text-left">
      
    </div>

    <button
      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      onClick={handleSubmit}
    >
      Continue to medical questionnaire
    </button>

    <p className="text-indra-grey text-sm mt-4">
      Subtitle about semble medical questionnaire.
    </p>
    <BackButton />
  </>
)} */}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-10 w-full max-w-2xl">
          <ProgressBar />
        </div>
      </div>

      {/* Right: Background Image */}
      <div
          className="relative hidden md:block min-h-screen w-full bg-cover bg-top"
  style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Team.jpg)` }}
>
  </div>
       </div>
  );
};

export default EligibilityForm;
