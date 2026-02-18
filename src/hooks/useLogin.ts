'use client';

import { useState, FormEvent, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login, generateMathCaptcha, CaptchaResponse } from '@/lib/api/auth';

export function useLogin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState<CaptchaResponse | null>(null);
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchCaptcha = useCallback(async () => {
        const captchaData = await generateMathCaptcha();
        if (captchaData) {
            setCaptcha(captchaData);
            setCaptchaAnswer('');
        }
    }, []);

    useEffect(() => {
        fetchCaptcha();
    }, [fetchCaptcha]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!captcha) {
            setError('CAPTCHA not loaded. Please refresh.');
            setIsLoading(false);
            return;
        }

        try {
            const result = await login({
                name,
                password,
                captcha_id: captcha.captcha_id,
                captcha_answer: parseInt(captchaAnswer, 10),
            });

            if (result.success && result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                router.push('/dashboard');
            } else {
                setError('Login failed');
                fetchCaptcha();
                setIsLoading(false);
            }
        } catch {
            setError('An unexpected error occurred');
            fetchCaptcha();
            setIsLoading(false);
        }
    };

    return {
        name, setName,
        password, setPassword,
        captcha,
        captchaAnswer, setCaptchaAnswer,
        isLoading,
        error,
        fetchCaptcha,
        handleSubmit,
    };
}
