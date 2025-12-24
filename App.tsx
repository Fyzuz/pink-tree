
import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Selection, SelectiveBloom } from '@react-three/postprocessing';
import { AppState, HandData } from './types';
import Scene from './components/Scene';
import HandTracker from './components/HandTracker';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.TREE);
  const [handData, setHandData] = useState<HandData>({
    isPinching: false,
    isOpen: true,
    palmX: 0.5,
    palmY: 0.5
  });

  const toggleState = useCallback(() => {
    setState(prev => prev === AppState.TREE ? AppState.EXPLODE : AppState.TREE);
  }, []);

  // Update state based on hand data
  useEffect(() => {
    if (handData.isPinching) {
      setState(AppState.TREE);
    } else if (handData.isOpen) {
      setState(AppState.EXPLODE);
    }
  }, [handData.isPinching, handData.isOpen]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050103]">
      <Canvas
        shadows
        camera={{ position: [0, 5, 25], fov: 45 }}
        onClick={toggleState}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050103']} />
        
        <Scene state={state} handData={handData} />

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={1.2} 
            radius={0.4} 
          />
        </EffectComposer>
      </Canvas>

      <HandTracker onHandUpdate={setHandData} />
      
      <Overlay state={state} />
      
      {/* Hand Cursor */}
      <div 
        className="fixed w-6 h-6 border-2 border-pink-400 rounded-full pointer-events-none transition-transform duration-75 z-50 mix-blend-screen"
        style={{
          left: `${handData.palmX * 100}%`,
          top: `${handData.palmY * 100}%`,
          transform: `translate(-50%, -50%) scale(${handData.isPinching ? 0.5 : 1})`,
          boxShadow: '0 0 15px #FF69B4'
        }}
      />
    </div>
  );
};

export default App;
