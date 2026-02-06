const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface CaptchaResponse {
    captcha_id: string;
    image_url: string;
    question: string;
}

export async function generateMathCaptcha(): Promise<CaptchaResponse | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate-math-captcha`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to generate captcha');
            return null;
        }

        const data = await response.json();
        return {
            captcha_id: data.captcha_id,
            image_url: data.image_url,
            question: data.question,
        };
    } catch (error) {
        console.error('Error fetching captcha:', error);
        return null;
    }
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    user?: {
        name: string;
        role: string;
    };
    message?: string;
}

export interface LoginCredentials {
    name: string;
    password: string;
    captcha_id: string;
    captcha_answer: number;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Login failed',
            };
        }

        return {
            success: true,
            token: data.token,
            user: data.user,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to connect to server',
        };
    }
}


export async function logout(token: string): Promise<{ success: boolean }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return { success: response.ok };
    } catch (error) {
        return { success: false };
    }
}

export async function register(data: {
    name: string;
    password: string;
}): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Registration failed',
            };
        }

        return {
            success: true,
            token: result.token,
            user: result.user,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to connect to server',
        };
    }
}
