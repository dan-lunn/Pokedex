import { useState, useEffect } from 'react';
import { useRange } from 'react-instantsearch';
import * as Slider from '@radix-ui/react-slider';

import '../styles/RangeSlider.css';

type UseRangeSliderProps = {
  attribute: string,
  precision?: number,
}

export function RangeSlider(props: UseRangeSliderProps) {
  // Values taken from faceting data
  const { start, range, canRefine, refine } = useRange(props);
  const { min = 0, max = 0 } = range;
  const [ value, setValue ] = useState([min, max]);

  // Check if range is within bounds
  const from = Math.max(min, Number.isFinite(start[0]) ? start[0]! : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1]! : max);

  useEffect(() => {
    setValue([from, to]);
  }, [from, to]);

  return (
    <Slider.Root
      className="slider-root"
      min={min}
      max={max}
      value={value}
      onValueChange={setValue}
      onValueCommit={refine as (value: number[]) => void}
      disabled={!canRefine}
    >
      <Slider.Track className="slider-track">
        <Slider.Range className="slider-range" />
      </Slider.Track>
      <Slider.Thumb className="slider-thumb" />
      <Slider.Thumb className="slider-thumb" />
    </Slider.Root>
  )
}