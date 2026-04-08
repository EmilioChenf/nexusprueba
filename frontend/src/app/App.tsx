import { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log('Login attempt:', { email, password });
      // Handle login logic here
    }
  };

  return (
    <div className="size-full flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759670524695-8d78b05b385b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3NTYwNTQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Residential Community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <Building2 size={120} strokeWidth={1.5} className="mb-8 opacity-90" />
          <h2 className="text-4xl mb-4 text-center">Bienvenido a NexusResidencial</h2>
          <p className="text-xl text-center opacity-90 max-w-md">
            La plataforma completa para la gestión moderna de comunidades residenciales
          </p>

          <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-3">
                <p className="text-3xl mb-1">24/7</p>
              </div>
              <p className="text-sm opacity-80">Acceso continuo</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-3">
                <p className="text-3xl mb-1">100%</p>
              </div>
              <p className="text-sm opacity-80">Seguro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#F9FAFB]">
        <div className="w-full max-w-md">
          {/* Logo and Title - Mobile */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Building2 size={48} className="text-[#1E3A8A] mr-3" />
            <div>
              <h1 className="text-[#1E3A8A]">NexusResidencial</h1>
              <p className="text-sm text-[#6B7280]">Gestión inteligente de residenciales</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <div className="hidden lg:flex items-center mb-6">
                <Building2 size={40} className="text-[#1E3A8A] mr-3" />
                <div>
                  <h1 className="text-[#1E3A8A]">NexusResidencial</h1>
                  <p className="text-sm text-[#6B7280]">Gestión inteligente de residenciales</p>
                </div>
              </div>

              <h2 className="text-[#1E3A8A] mb-2">Iniciar Sesión</h2>
              <p className="text-[#6B7280]">Ingrese sus credenciales para acceder</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[#374151] mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-[#9CA3AF]" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-[#D1D5DB]'
                    } rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all`}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-[#374151] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-[#9CA3AF]" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 border ${
                      errors.password ? 'border-red-500' : 'border-[#D1D5DB]'
                    } rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-[#9CA3AF] hover:text-[#6B7280]" />
                    ) : (
                      <Eye size={20} className="text-[#9CA3AF] hover:text-[#6B7280]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm text-[#3B82F6] hover:text-[#1E3A8A] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Forgot password clicked');
                  }}
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] text-white py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Iniciar Sesión
              </button>

              {/* Role Indicator */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs text-center text-[#9CA3AF] mb-3">
                  Acceso disponible para:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-[#EFF6FF] text-[#1E3A8A] rounded-full text-xs">
                    Administrador
                  </span>
                  <span className="px-3 py-1 bg-[#EFF6FF] text-[#1E3A8A] rounded-full text-xs">
                    Residente
                  </span>
                  <span className="px-3 py-1 bg-[#EFF6FF] text-[#1E3A8A] rounded-full text-xs">
                    Inquilino
                  </span>
                  <span className="px-3 py-1 bg-[#EFF6FF] text-[#1E3A8A] rounded-full text-xs">
                    Guardia
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-[#9CA3AF]">
            © 2026 NexusResidencial. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}