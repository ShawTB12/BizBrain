"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // デモ用のログイン処理（実際のプロジェクトでは認証APIを呼び出す）
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // ログイン成功時はメインページへリダイレクト
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col lg:flex-row">
      {/* 左側: ロゴとタイトル（調整後 50%） */}
      <div className="flex items-center justify-center p-8 lg:p-12 lg:w-[50%]">
        <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mb-8 lg:mb-12">
            <Image
              src="/BizBrain_logo.png"
              alt="BizBrain"
              width={150}
              height={150}
              className="mx-auto opacity-95 lg:w-[200px] lg:h-[200px]"
              priority
            />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight bizbrain-title">
            BizBrain
          </h1>
        </div>
      </div>

      {/* 右側: ログインフォーム（調整後 50%） */}
      <div className="flex items-center justify-start p-8 lg:pl-0 lg:pr-24 lg:w-[50%]">
        <div className={`w-full max-w-2xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 lg:p-16 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-8">
            {/* メールアドレス */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg h-12"
                required
              />
            </div>

            {/* パスワード */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                パスワード
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg pr-12 h-12"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* ログインボタン */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-12"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ログイン中...
                </div>
              ) : (
                "ログイン"
              )}
            </Button>
          </form>

          {/* その他のリンク */}
          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
              パスワードをお忘れですか？
            </a>
          </div>
          </div>
        </div>
      </div>

    </div>
  )
} 