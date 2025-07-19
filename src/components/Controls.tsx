import React from "react";

type ControlsProps = {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  isAtEnd: boolean;
  sliderValue: number;
  sliderMax: number;
  onSliderChange: (val: number) => void;
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
}) => (
  <div className="flex flex-col items-center gap-2">
    <input
      type="range"
      min={0}
      max={sliderMax}
      value={sliderValue}
      onChange={(e) => onSliderChange(Number(e.target.value))}
      className="w-full accent-blue-600"
    />
    <div className="flex gap-2 justify-center">
      {!playing && !isAtEnd && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={onPlay}
        >
          ▶️ Play
        </button>
      )}
      {playing && (
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          onClick={onPause}
        >
          ⏸️ Pause
        </button>
      )}
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        onClick={onReset}
      >
        🔄 Reset
      </button>
    </div>
  </div>
);

export default Controls; 