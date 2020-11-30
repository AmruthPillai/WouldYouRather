import { useRouter } from "next/router";
import { useRef, useState } from "react";

const Share = () => {
  const router = useRouter();
  const gameURL = useRef(null);
  const [copied, setCopied] = useState(false);

  const { id } = router.query;
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wouldyourather.app';

  const handleCopy = () => {
    gameURL.current.select();
    document.execCommand("copy");

    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between py-2 pb-6">
      <img className="w-32 h-32" src="/logo/light.png" alt="Would You Rather" />

      <div className="text-center text-sm leading-relaxed w-3/4">
        <p className="mb-4">
          Share the link below with your friends and they would get the same set
          of questions.
        </p>

        <p className="mb-4">
          Once they finish, the results would be visible to only them, which
          they can screenshot and send over to you.
        </p>

        <input
          readOnly
          type="text"
          ref={gameURL}
          className="w-full text-center font-bold border rounded-sm px-3 py-2"
          value={`${siteURL}/g/${id}`}
        />

        <button
          type="button"
          className="btn btn-block btn-red"
          onClick={handleCopy}
        >
          {copied ? "copied!" : "copy url"}
        </button>
      </div>

      <div />
    </div>
  );
};

export default Share;
