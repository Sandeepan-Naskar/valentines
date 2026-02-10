"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    $: any;
  }
}

export default function CardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Refresh the page once when the /card route is mounted
    const hasRefreshed = sessionStorage.getItem("cardPageRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("cardPageRefreshed", "true");
      window.location.reload();
      return; // Exit early to prevent further execution
    }
  }, []);

  useEffect(() => {
    // Only run on client side and after refresh
    if (typeof window === "undefined") return;

    // Load turn.js and initialize flipbook
    const initializeFlipbook = () => {
      if (!window.$) {
        console.error("jQuery not loaded");
        return;
      }

      const $ = window.$;

      // Wait for DOM to be ready
      setTimeout(() => {
        const flipbook = $(".flipbook");

        if (flipbook.length === 0) {
          console.error("Flipbook element not found");
          return;
        }

        if (flipbook.width() === 0 || flipbook.height() === 0) {
          setTimeout(initializeFlipbook, 50);
          return;
        }

        try {
          // Apply scissor plugin to double pages first
          $(".flipbook .double").scissor();

          // Count actual pages (single pages + pages in doubles)
          const pageCount = $(".flipbook .page").length;

          // Initialize turn plugin
          flipbook.turn({
            width: 800,
            height: 400,
            elevation: 50,
            gradients: true,
            autoCenter: true,
            pages: pageCount,
            display: "double",
            acceleration: true,
            when: {
              turned: function(event: any, page: number, view: any) {
                console.log("Page turned to:", page);
              }
            }
          });

          console.log("Flipbook initialized with", pageCount, "pages");
        } catch (error) {
          console.error("Error initializing flipbook:", error);
        }
      }, 200);
    };

    // Check if jQuery already exists (after reload)
    if (window.$) {
      initializeFlipbook();
      return;
    }

    // Load jQuery
    const script = document.createElement("script");
    script.src = "/card/valentines/extras/jquery.min.1.7.js";
    script.async = true;
    script.onload = () => {
      // Load turn.js
      const turnScript = document.createElement("script");
      turnScript.src = "/card/valentines/lib/turn.min.js";
      turnScript.async = true;
      turnScript.onload = () => {
        // Load scissor.js
        const scissorScript = document.createElement("script");
        scissorScript.src = "/card/valentines/lib/scissor.min.js";
        scissorScript.async = true;
        scissorScript.onload = () => {
          initializeFlipbook();
        };
        scissorScript.onerror = () => {
          console.error("Failed to load scissor.js");
        };
        document.body.appendChild(scissorScript);
      };
      turnScript.onerror = () => {
        console.error("Failed to load turn.js");
      };
      document.body.appendChild(turnScript);
    };
    script.onerror = () => {
      console.error("Failed to load jQuery");
    };
    document.body.appendChild(script);

    return () => {
      if (window.$ && containerRef.current) {
        const flipbook = window.$(".flipbook");
        if (flipbook.data("turn")) {
          flipbook.turn("destroy");
        }
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          ← Back
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-red-600 mb-8">Our Valentine's Card</h1>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="flipbook"
          style={{
            width: "800px",
            height: "400px",
          }}
        >
          {/* Cover Page */}
          <div className="page">
            <img src="/card/valentines/images2/image2.png" alt="Cover" />
          </div>

          {/* Pages 2-3 (spread 1) - one wide image */}
          <div className="double">
            <img src="/card/valentines/images2/image1.png" alt="Spread 1" style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Pages 4-5 (spread 2) - one wide image */}
          <div className="double">
            <img src="/card/valentines/images2/screenshot.png" alt="Spread 2" style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Pages 6-7 (spread 3) - one wide image */}
          <div className="double">
            <img src="/card/valentines/images2/collage.png" alt="Spread 3" style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Pages 8-9 (spread 4) - one wide image */}
          <div className="double">
            <img src="/card/valentines/images2/image6.png" alt="Spread 4" style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Back Cover */}
          <div className="page">
            <img src="/card/valentines/images2/image2.png" alt="Back Cover" />
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-center max-w-md">
        Drag the pages to flip through the Valentine's card! 💕
      </p>
    </div>
  );
}
