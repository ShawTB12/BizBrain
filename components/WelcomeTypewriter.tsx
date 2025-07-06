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
        // Phase 1: 初期カーソル点滅（0.5秒）
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
          }, 200)
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
    }, phase === 1 ? 500 : phase === 2 ? 150 : phase === 3 ? 120 : 0)

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="typewriter-container">
          <span className={`typewriter-text ${isComplete ? 'complete' : ''}`}>
            {displayText}
          </span>
          {!isComplete && (
            <span className={`typewriter-cursor ${showCursor ? 'visible' : 'hidden'}`}>
              |
            </span>
          )}
        </div>
        {isComplete && (
          <div className="mt-8 text-gray-400 text-sm animate-fade-in">
            まもなくダッシュボードに移動します...
          </div>
        )}
      </div>
    </div>
  )
} 