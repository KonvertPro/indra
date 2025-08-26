import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


const EligibilityForm = () => {
  const totalSteps = 6;
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [submitted, setSubmitted] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [error, setError] = useState('');

const initialFormData = {
  email: '',
  newsletterOptIn: false,
  ageConfirmed: null,
  offeredTwoTreatments: null,
  psychosis: null,
  pregnant: null,
  interestReason: [],
};
const [formData, setFormData] = useState(initialFormData);


  // Animation variants for step panels
  const panelVariants = {
    initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2, ease: 'easeIn' } }),
  };

  const isValidEmail = (val) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());


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
              href="https://indraclinic.com"
              className="bg-transparent border border-indra-lime text-indra-lime px-6 py-3 rounded-lg font-semibold hover:bg-indra-lime hover:text-indra-dark transition"
            >
              Back to Indra Website
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
      { title: 'Meditation', href: '/wellness/meditation', tile: 'bg-indra-lilac' },
      { title: 'Breathwork', href: '/wellness/breathwork', tile: 'bg-indigo-300' },
      { title: 'Sound Healing', href: '/wellness/sound-healing', tile: 'bg-purple-400' },
      { title: 'Functional Mushrooms', href: '/wellness/functional-mushrooms', tile: 'bg-gray-400' },
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
              <p className="mb-2">Don’t worry — you’re eligible for Indra’s full range of wellness services.</p>
              <p className="text-indra-grey">
                Explore options below. These can support sleep, stress, focus and overall wellbeing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellness.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl bg-indra-dark/40 p-3 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indra-lime"
                >
                  <div className={`rounded-2xl h-44 ${item.tile} shadow-md flex items-center justify-center`}>
                    {/* Replace colored tile with an <img> when assets are ready */}
                  </div>
                  <div className="bg-white text-gray-900 rounded-xl mt-3 px-4 py-3 font-medium shadow-sm">
                    {item.title}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://indraclinic.com/wellness"
                className="text-center bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                View all wellness services
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
              {/* Step 1: Email signup (required) */}
{step === 1 && (
  <>
    <h2 className="text-2xl font-semibold mb-2 text-indra-lime">
      Let’s get started.
    </h2>
    <p className="text-indra-grey text-sm mb-4">
      We’ll use your email to send results and next steps.
    </p>

    <div className="mb-4">
      <label htmlFor="email" className="block text-indra-light mb-2">Email address</label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indra-lilac placeholder-indra-grey"
        placeholder="you@example.com"
      />
      {!formData.email ? null : (
        !isValidEmail(formData.email) && (
          <p className="text-indra-grey text-sm mt-2">Please enter a valid email.</p>
        )
      )}
    </div>

    <label className="flex items-center gap-2 text-indra-light mb-6">
      <input
        type="checkbox"
        checked={formData.newsletterOptIn}
        onChange={(e) => setFormData((p) => ({ ...p, newsletterOptIn: e.target.checked }))}
        className="w-5 h-5 text-indra-lilac focus:ring-indra-lilac rounded"
      />
      Keep me updated with Indra news & offers (optional)
    </label>

    <button
      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
      disabled={!isValidEmail(formData.email)}
      onClick={() => {
        if (!isValidEmail(formData.email)) return;
        setError('');
        setDirection(1);
        setStep(2);
      }}
    >
      Continue
    </button>
  </>
)}

              {/* Step 1: Age */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Are you over 18 years old?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                      onClick={() => handleAnswer('ageConfirmed', true, 3)}
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
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Have you been offered at least 2 different treatments for your condition?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('offeredTwoTreatments', true, 4)}
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
              {step === 4 && (
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
                      onClick={() => handleAnswer('psychosis', false, 5)}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">If yes, we won't be able to prescribe some of our products.</p>
                  <BackButton />
                </>
              )}

              {/* Step 5: Pregnant */}
              {step === 5 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">Are you pregnant?</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('pregnant', true, 0, true)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg"
                      onClick={() => handleAnswer('pregnant', false, 6)}
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

           {/* Step 6: Interests (multi-select checkboxes, optional) */}
{step === 6 && (
  <>
    <h2 className="text-2xl font-semibold mb-4 text-indra-light">
      Are you interested in any of the following:
    </h2>

    <div className="flex flex-col gap-3 mb-6 text-left">
      {[
        'Functional Mushrooms',
        'Breathwork',
        'Meditation',
        'Sound Healing',
      ].map((option) => (
        <label key={option} className="flex items-center gap-3 text-indra-light">
          <input
            type="checkbox"
            checked={formData.interestReason.includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                setFormData((prev) => ({
                  ...prev,
                  interestReason: [...prev.interestReason, option],
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  interestReason: prev.interestReason.filter((o) => o !== option),
                }));
              }
            }}
            className="w-5 h-5 text-indra-lilac focus:ring-indra-lilac rounded"
          />
          {option}
        </label>
      ))}
    </div>

    <button
      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      onClick={handleSubmit}
    >
      Submit
    </button>

    <p className="text-indra-grey text-sm mt-4">
      Select all that apply (optional).
    </p>
    <BackButton />
  </>
)}

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
        className="hidden md:block bg-cover bg-top min-h-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Team.jpg)` }}
      /></div>
  );
};

export default EligibilityForm;
