import Image from "next/image";
import React, { useEffect, useState } from "react";
import Sound from "react-sound";
import useSound from "use-sound";

import soundOn from "../../../public/sound_on.png"
import soundOff from "../../../public/sound_off.png"


export const Audio = () => {
  const [soundSwitch, setSoundSwitch] = useState(true);

  const [play, { pause }] = useSound("/jlo-booty.mp3", { volume: 0.03})

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    if (!soundSwitch) {
      pause();
    } else {
      play();
    }
  }, [soundSwitch, pause, play])


  
  return (
    <div className="audio-box" onClick={() => setSoundSwitch(!soundSwitch)}>
            <Image
              src={soundSwitch ? soundOn : soundOff}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
  );
};
