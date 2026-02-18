'use client';

import { useLogin } from '@/hooks/useLogin';
import Image from 'next/image';

export default function Login() {
  const {
    name, setName,
    password, setPassword,
    captcha,
    captchaAnswer, setCaptchaAnswer,
    isLoading,
    error,
    fetchCaptcha,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14497F]">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-auto h-20 bg-[#14497F] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Image src="/uniairbrandlogo1.png" alt="Logo" width={200} height={100} />
            </div>
            <h1 className="text-2xl font-bold text-[#14497F] mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your helpdesk account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#E62B2B]/10 border border-[#E62B2B]/20">
              <p className="text-sm text-[#E62B2B] text-center font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#14497F] mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#14497F] focus:ring-2 focus:ring-[#14497F]/20 transition"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#14497F] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#14497F] focus:ring-2 focus:ring-[#14497F]/20 transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="captcha" className="block text-sm font-semibold text-[#14497F] mb-2">
                Security Question
              </label>
              <div className="flex gap-3 items-center mb-3">
                <div className="flex-1 bg-gray-50 rounded-xl border-2 border-gray-200 p-3 min-h-[70px] flex items-center justify-center">
                  {captcha ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${captcha.image_url}`}
                      alt="Math Captcha"
                      className="w-full h-16 object-contain scale-125"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="font-mono text-xl font-bold text-[#14497F]">${captcha.question} = ?</span>`;
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">Loading...</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="px-4 py-3 rounded-xl bg-[#FFCB05] text-[#14497F] font-semibold hover:bg-[#FFCB05]/80 transition shadow-md"
                >
                  Refresh
                </button>
              </div>
              <input
                id="captcha"
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                placeholder="Enter your answer"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#14497F] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-[#103B66] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/80 mt-6">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-[#FFCB05] font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
