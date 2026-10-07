import React from 'react'

const Thinking = () => {
  return (
     <div className="flex items-center gap-1 text-white/60">
      <span>Thinking</span>

      <span className="flex gap-1">
        <span className="animate-bounce [animation-delay:0ms]">.</span>
        <span className="animate-bounce [animation-delay:150ms]">.</span>
        <span className="animate-bounce [animation-delay:300ms]">.</span>
      </span>
    </div>
  )
}

export default Thinking