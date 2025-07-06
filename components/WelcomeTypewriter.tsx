"use client"

import { useState, useEffect } from "react"

interface WelcomeTypewriterProps {
  onComplete: () => void
}

export default function WelcomeTypewriter({ onComplete }: WelcomeTypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState(1) // 1: カーソル点滅, 2: Welcome to, 3: BizBrain, 4: 完了
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const fullText = "Welcome to BizBrain"
  const welcomeText = "Welcome to "
  const bizBrainText = "BizBrain"

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 1) {
        // Phase 1: 初期カーソル点滅（0.3秒）
        setPhase(2)
        setCurrentIndex(0)
      } else if (phase === 2) {
        // Phase 2: "Welcome to " をタイピング
        if (currentIndex < welcomeText.length) {
          setDisplayText(welcomeText.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          setPhase(3)
          setCurrentIndex(0)
          // 少し間を置く
          setTimeout(() => {
            setCurrentIndex(0)
          }, 100)
        }
      } else if (phase === 3) {
        // Phase 3: "BizBrain" をタイピング
        if (currentIndex < bizBrainText.length) {
          setDisplayText(welcomeText + bizBrainText.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          setPhase(4)
          setIsComplete(true)
          // 完了後、全体発光して2秒後に遷移
          setTimeout(() => {
            onComplete()
          }, 2000)
        }
      }
    }, phase === 1 ? 300 : phase === 2 ? 80 : phase === 3 ? 60 : 0)

    return () => clearTimeout(timer)
  }, [phase, currentIndex, onComplete])

  // カーソル点滅
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8 relative overflow-hidden">
      {/* 発光粒子背景 */}
      <div className="absolute inset-0 glow-particles"></div>
      <div className="absolute inset-0 glow-particles-2"></div>
      <div className="absolute inset-0 glow-particles-3"></div>
      
      <div className="text-center relative z-10">
        <div className="typewriter-container">
          <span className={`typewriter-text ${isComplete ? 'complete' : ''}`}>
            {displayText.split('').map((char, index) => (
              <span 
                key={index} 
                className={`typewriter-char ${index < displayText.length ? 'revealed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          {!isComplete && (
            <span className={`typewriter-cursor ${showCursor ? 'visible' : 'hidden'}`}>
              |
            </span>
          )}
        </div>
        {isComplete && (
          <div className="mt-8 text-gray-400 text-sm animate-fade-in">
            <span className="glow-text">まもなくダッシュボードに移動します...</span>
          </div>
        )}
      </div>
    </div>
  )
} 