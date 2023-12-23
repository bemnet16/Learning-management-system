"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";

interface VideoPlayerPorps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  nextChapterId,
  playbackId,
  title,
}: VideoPlayerPorps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: true,
        }
      );

      if (!nextChapterId) {
        toast.success("GREAT! You have finshied the course successfully.");
        confetti.onOpen();
      }

      router.refresh()

      if(nextChapterId){
        toast.success("Progress updated")
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 ">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-y-2 text-secondary bg-neutral-800">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is Locked!</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          playbackId={playbackId}
          autoPlay
          onEnded={onEnd}
          title={title}
        />
      )}
    </div>
  );
};
