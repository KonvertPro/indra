import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import skyImg from './assets/Sky.jpg';
import LakeImg from './assets/Lake.jpg';
import MountainImg from './assets/Mountain.jpg';
import SupplementImg from './assets/Supplements.jpg';
import FunctionalImg from './assets/Functional_Mushrooms.jpg';

const EligibilityForm = () => {
  const totalSteps = 6;
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [error, setError] = useState('');

  const initialFormData = {
    ageConfirmed: null,
    offeredTwoTreatments: null,
    psychosis: null,
    pregnant: null,
    emailcapture: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  // Animation variants for step panels
  const panelVariants = {
    initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2, ease: 'easeIn' } }),
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
        <button onClick={handleBack} className="mt-6 text-sm text-indra-lime hover:underline">
          ← Go Back
        </button>
      </div>
    ) : null;

  // ✅ Submitted Screen
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
            <p className="mb-6">We’ve received your information and will follow up shortly.</p>

            <div className="flex flex-col gap-4">
              <a
                href="https://questionnaire.semble.io/ea1e3bdc75995ead08de93bc3b6adb61396a24c6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Continue to Medical Questionnaire
              </a>

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

  // ❌ Disqualified (Red Route)
  if (disqualified) {
    const wellness = [
      { title: 'Hypnotherapy', href: 'https://indra.clinic/', img: skyImg },
      { title: 'Counselling', href: 'https://indra.clinic/', img: MountainImg },
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

            {/* Red route email capture */}
            <div className="mt-10 mb-12 max-w-lg mx-auto w-full">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError('');
                  const email = formData.emailcapture;

                  try {
                    await fetch('https://script.google.com/macros/s/AKfycbzq_FZ5akGKf7y__sr52TOPbH7MzwwFq7HXEn9wjL3nZs24h7gVIbXhDQnBj3e4G2b8ug/exec', {
                      method: 'POST',
                      mode: 'no-cors',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, route: 'ineligible' }),
                    });
                    alert('Thanks! You’ve been added to our wellness list.');
                  } catch (err) {
                    console.error(err);
                    setError('There was a problem submitting your email.');
                  }
                }}
                className="bg-indra-dark/40 rounded-xl p-4 flex flex-col gap-3"
              >
                <label htmlFor="email" className="text-indra-light text-sm">
                  Get wellness updates & offers:
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.emailcapture || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emailcapture: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-indra-dark text-indra-light border border-indra-lime focus:outline-none focus:ring-2 focus:ring-indra-lime"
                  placeholder="you@example.com"
                />
                <button
                  type="submit"
                  className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Submit
                </button>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </form>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {wellness.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl bg-indra-dark/40 p-2 sm:p-3 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div
                    className="rounded-xl aspect-square shadow-md bg-cover"
                    style={{
                      backgroundImage: `url(${item.img})`,
                      backgroundPosition: item.title === 'Functional Mushrooms' ? 'center 0' : 'center center',
                    }}
                  ></div>
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
                  setFormData(initialFormData);
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

  // 🧠 Main Questionnaire Flow
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-sans">
      <div className="flex flex-col p-6 md:p-12 bg-indra-purple min-h-screen">
        <div className="mb-10 md:text-left">
          <h1 className="text-4xl font-bold text-indra-lime mb-2">Eligibility Questionnaire</h1>
          <p className="text-lg text-indra-light">Let's find out if you're eligible.</p>
        </div>

        <div className="flex-1 max-w-2xl w-full flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} variants={panelVariants} custom={direction} initial="initial" animate="animate" exit="exit">
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">Are you over 18 years old?</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('ageConfirmed', true, 2)}>
                      Yes
                    </button>
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('ageConfirmed', false, 0, true)}>
                      No
                    </button>
                  </div>
                  <p className="text-indra-grey text-sm mt-4">You must be over 18 to qualify for treatment.</p>
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Have you been offered at least 2 different consultations/treatments for your condition?
                  </h2>
                  <p className="text-indra-grey text-sm mb-4">
                    If you’ve only had 1 consultation, select 'Yes'. We still recommend booking a consultation with us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('offeredTwoTreatments', true, 3)}>
                      Yes
                    </button>
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('offeredTwoTreatments', false, 0, true)}>
                      No
                    </button>
                  </div>
                  <BackButton />
                </>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">
                    Have you ever been diagnosed with psychosis or schizophrenia?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('psychosis', true, 0, true)}>
                      Yes
                    </button>
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('psychosis', false, 4)}>
                      No
                    </button>
                  </div>
                  <BackButton />
                </>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-indra-light">Are you pregnant or breastfeeding?</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('pregnant', true, 0, true)}>
                      Yes
                    </button>
                    <button className="bg-indra-lilac text-white px-6 py-3 rounded-lg" onClick={() => handleAnswer('pregnant', false, 5)}>
                      No
                    </button>
                  </div>
                  <BackButton />
                </>
              )}

              {/* ✅ Step 5: Eligible Email Capture */}
              {step === 5 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-indra-light">Good news! You’re eligible for treatment.</h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setError('');
                      const email = formData.emailcapture;

                      try {
                        await fetch('https://script.google.com/macros/s/AKfycbzq_FZ5akGKf7y__sr52TOPbH7MzwwFq7HXEn9wjL3nZs24h7gVIbXhDQnBj3e4G2b8ug/exec', {
                          method: 'POST',
                          mode: 'no-cors',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email, route: 'eligible' }),
                        });
                        setSubmitted(true);
                      } catch (err) {
                        console.error(err);
                        setError('There was a problem submitting your email.');
                      }
                    }}
                    className="bg-indra-dark/40 rounded-xl p-4 flex flex-col gap-3"
                  >
                    <label htmlFor="email" className="text-indra-light text-sm">
                      Enter your email to continue:
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.emailcapture || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, emailcapture: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-indra-dark text-indra-light border border-indra-lime focus:outline-none focus:ring-2 focus:ring-indra-lime"
                      placeholder="you@example.com"
                    />
                    <button
                      type="submit"
                      className="bg-indra-lilac text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Submit
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  </form>
                  <BackButton />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <ProgressBar />
        </div>
      </div>

      <div
        className="relative hidden md:block min-h-screen w-full bg-cover bg-top"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Team.jpg)` }}
      ></div>
    </div>
  );
};

export default EligibilityForm;
