import React from "react";

type ControlsProps = {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  isAtEnd: boolean;
  sliderValue: number;
  sliderMax: number;
  onSliderChange: (value: number) => void;
  darkMode?: boolean;
};

const Controls: React.FC<ControlsProps> = ({
  playing,
  onPlay,
  onPause,
  onReset,
  isAtEnd,
  sliderValue,
  sliderMax,
  onSliderChange,
  darkMode = false,
}) => {
  return (
    <div className={`rounded-xl p-4 shadow-lg transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-800' : 'bg-gradient-to-r from-slate-100 to-blue-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>Progress</span>
        <span className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
          {sliderValue + 1} / {sliderMax + 1}
        </span>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={sliderMax}
          value={sliderValue}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-300 ${darkMode ? 'bg-gray-600' : 'bg-slate-300'} accent-slate-600`}
        />
      </div>
      <div className="flex gap-2 justify-center">
        {!playing && !isAtEnd && (
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2"
            onClick={onPlay}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
        )}
        {playing && (
          <button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2"
            onClick={onPause}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Pause
          </button>
        )}
        <button
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center gap-2"
          onClick={onReset}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls; 