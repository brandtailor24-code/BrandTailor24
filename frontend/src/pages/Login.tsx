import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface FormData {
    name: string;
    phone: string;
    password: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    password?: string;
    general?: string;
}

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        // Name validation (only for signup)
        if (!isLogin) {
            if (!formData.name.trim()) {
                newErrors.name = 'Full name is required';
            } else if (formData.name.trim().length < 3) {
                newErrors.name = 'Name must be at least 3 characters';
            }
        }

        // Password validation
        if (!isLogin) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            }
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.phone,
                    password: formData.password,
                    ...((!isLogin) && { name: formData.name })
                })
            });

            const data = await res.json();

            if (res.ok) {
                // Store JWT token and user info in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert(isLogin ? 'Login successful!' : 'Registration successful!');

                // Redirect based on role
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/track');
                }
            } else {
                setErrors({ general: data.message || 'Authentication failed' });
            }
        } catch (err) {
            console.error('Auth error:', err);
            setErrors({ general: 'Unable to connect to server. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', phone: '', password: '' });
        setErrors({});
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#f8f9fa] px-4">
            <div className="glass-card p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#0f392b] mb-2 text-center">
                    {isLogin ? 'Welcome Back' : 'Join Brand Tailore'}
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    {isLogin ? 'Login to track your orders' : 'Create an account to get started'}
                </p>

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-red-700 text-sm">{errors.general}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (10 digits)"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder={isLogin ? "Password" : "Password (min 6 characters)"}
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleMode}
                        className="text-[#0f392b] hover:underline font-medium"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
