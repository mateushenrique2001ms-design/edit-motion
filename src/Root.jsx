import React from 'react';
import { Composition } from 'remotion';
import { Reel } from './Reel';

export const Root = () => {
  return (
    <>
      <Composition
        id="ReelAnimado"
        component={Reel}
        durationInFrames={1182}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
