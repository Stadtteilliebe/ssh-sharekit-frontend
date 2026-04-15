"use client";

import { useEffect, useRef, useState } from "react";
import { classNames } from "@/lib/classNames";

export type ShareImage = {
  id: string;
  previewSrc: string;
  downloadSrc: string;
  title?: string;
  alt: string;
  format: "landscape" | "portrait";
  width: number;
  height: number;
  dimension: string;
};

type ShareModalProps = {
  image: ShareImage | null;
  onClose: () => void;
};

export function ShareModal({ image, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);

  useEffect(() => {
    if (!image) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [image, onClose]);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  useEffect(() => {
    if (!image) {
      setCopied(false);
      setDragY(0);
      setIsDragging(false);
    }
  }, [image]);

  if (!image) return null;

  const shareImage = image;

  function getOgShareUrl(imageId: string) {
    if (typeof window === "undefined") return `/share/general/${imageId}`;
    return `${window.location.origin}/share/general/${imageId}`;
  }

  async function handleCopyLink() {
    const url = getOgShareUrl(shareImage.id);
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  function handleLinkedInShare() {
    const url = getOgShareUrl(shareImage.id);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;

    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  }

  function handleTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.current;

    if (delta > 0) {
      setDragY(delta);
    }
  }

  function handleTouchEnd() {
    setIsDragging(false);

    if (dragY > 120) {
      onClose();
    } else {
      setDragY(0);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50"
      aria-labelledby="share-dialog-title"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{
          opacity: 1 - dragY / 300,
        }}
        aria-label="Dialog schließen"
      />

      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        <div
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging ? "none" : "transform 0.25s ease",
          }}
          className={classNames(
            "relative z-10 w-full border border-neutral-200 bg-white shadow-2xl",
            "rounded-t-[24px] p-5",
            "md:max-w-md md:rounded-[24px] md:p-6"
          )}
        >
          <div
            className="mx-auto mb-4 h-1.5 w-12 cursor-grab rounded-full bg-neutral-300 active:cursor-grabbing md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                id="share-dialog-title"
                className="text-lg font-semibold text-neutral-900"
              >
                Bild teilen
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Schließen"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 overflow-hidden bg-neutral-50">
            <img src="assets/top.jpg" />
            <div
              className={classNames(
                "flex items-center justify-center bg-neutral-100",
                shareImage.format === "landscape"
                  ? "aspect-[16/9]"
                  : "aspect-[4/5]"
              )}
            >
              <img
                src={shareImage.previewSrc}
                alt={shareImage.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <img src="assets/bottom.jpg" />

          </div>

          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={handleLinkedInShare}
              className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Auf LinkedIn teilen
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-500"
            >
              Link kopieren
            </button>
          </div>

          <div className="mt-3 min-h-5 text-sm text-neutral-500">
            {copied
              ? "Link kopiert."
              : "Der Link öffnet eine eigene Share-Seite mit OG-Vorschau."}
          </div>
        </div>
      </div>
    </div>
  );
}