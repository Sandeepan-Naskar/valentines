"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import OrientationGuard from "@/components/OrientationGuard";

const ANIM_DURATION = 2;

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gameCollageData, setGameCollageData] = useState<string | null>(null);

  const handleShowProposal = (collageDataUrl?: string) => {
    if (collageDataUrl) {
      setGameCollageData(collageDataUrl);
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      <main className="flex items-center bg-gradient-to-b from-gray-900 to-gray-800 justify-center min-h-screen bg-black overflow-hidden relative">
        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center"
          >
            <PhotoPairGame handleShowProposal={handleShowProposal} />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal collageDataUrl={gameCollageData} />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}
