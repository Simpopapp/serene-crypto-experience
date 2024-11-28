import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (isVideoEnded) {
      onComplete();
    }
  }, [isVideoEnded, onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <video
        autoPlay
        muted
        onEnded={() => setIsVideoEnded(true)}
        className="w-full h-full object-cover"
      >
        <source src="/splash-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};