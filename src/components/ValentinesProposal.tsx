import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";
import html2canvas from "html2canvas";

type ValentinesProposalProps = {
  collageDataUrl?: string | null;
};

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 36 images
const images = [
    "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM.jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (1).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (2).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (3).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (4).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (5).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (6).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (7).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (8).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (9).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (10).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (11).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (12).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (13).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (14).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (15).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (16).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (17).jpeg",
    "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM.jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (1).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (2).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (3).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (4).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (5).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (6).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (7).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (8).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (9).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (10).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (11).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (12).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (13).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (14).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (15).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (16).jpeg",
  "/game-photos/WhatsApp Image 2026-02-10 at 4.06.42 AM (17).jpeg"
];

export default function ValentinesProposal({ collageDataUrl }: ValentinesProposalProps) {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const screenshotRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  const router = useRouter();

  const handleScreenshot = async () => {
    try {
      if (collageDataUrl) {
        // Use the pre-captured collage data from when the game ended
        const link = document.createElement("a");
        link.href = collageDataUrl;
        link.download = `valentine-collage-${new Date().getTime()}.png`;
        link.click();
        return;
      }

      // Fallback: try to capture from DOM if data wasn't passed
      let element = document.querySelector(".valentine-collage");
      
      if (!element) {
        alert("Collage not found. Please complete the full game sequence first.");
        return;
      }

      const canvas = await html2canvas(element as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `valentine-collage-${new Date().getTime()}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
      alert("Failed to capture screenshot. Please try again.");
    }
  };

  const handleOpenCard = () => {
    sessionStorage.removeItem("cardPageRefreshed");
    router.push("/card");
  };

  useEffect(() => {
    if (step < 2) {
      // Change step after 5 seconds
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            className={`text-4xl font-semibold flex flex-col items-center justify-center ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="mb-8">Congratulations! You have completed the game.</h2>
            <button
              onClick={handleScreenshot}
              className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📸 Download Collage
            </button>
          </motion.div>
        )}
        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
            transition={{ duration: 20 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
          >
            I adore you more than words can say. You are the smartest, most beautiful, and kindest person I’ve ever known, and you make my life better and happier in every possible way. Thank you for loving me and standing by me even when I wasn’t perfect. I love you so much—happy Valentine’s Day 💕
            So here's a small little something I made for you, I hope you like it! 💌
            And now of course the question of the hour....
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center valentine-collage"
            ref={screenshotRef}
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
            >
              Will you be my Valentine?
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
            <div className="flex space-x-4 mt-10">
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {/* Hidden collage container for screenshot when at step 0 */}
        {step === 0 && (
          <div className="hidden valentine-collage-hidden absolute inset-0 flex flex-col items-center justify-center">
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
            >
              Will you be my Valentine?
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
          </div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Yayyyyy!! Thank you for accepting, I love you! 💕
            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={200}
              height={200}
              unoptimized
            />
            <button
              onClick={() => handleOpenCard()}
              className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              💌 Open Your Card
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {showFireworks && (
        <div className="absolute w-full h-full pointer-events-none">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
