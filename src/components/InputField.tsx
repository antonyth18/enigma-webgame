import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function InputField({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--ash-gray)] mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ash-dim)]">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 ${icon ? 'pl-10' : ''}
            bg-[var(--void-dark)]
            border-b-2 transition-all duration-300
            ${
              isFocused
                ? 'border-[var(--blood-red)] shadow-[0_4px_12px_var(--red-glow)]'
                : error
                ? 'border-[var(--ember-orange)]'
                : 'border-[var(--ash-darker)]'
            }
            text-[var(--ash-gray)]
            placeholder:text-[var(--ash-darker)]
            focus:outline-none
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {/* Red underline glow effect on focus */}
        {isFocused && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--blood-red)] animate-flicker-red"
            style={{ boxShadow: '0 0 8px var(--red-glow)' }}
          />
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-[var(--ember-orange)]">{error}</p>
      )}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextAreaField({
  label,
  error,
  className = '',
  ...props
}: TextAreaFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--ash-gray)] mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          className={`
            w-full px-4 py-3
            bg-[var(--void-dark)]
            border-2 rounded-md transition-all duration-300
            ${
              isFocused
                ? 'border-[var(--blood-red)] shadow-[0_0_20px_var(--red-glow)]'
                : error
                ? 'border-[var(--ember-orange)]'
                : 'border-[var(--ash-darker)]'
            }
            text-[var(--ash-gray)]
            placeholder:text-[var(--ash-darker)]
            focus:outline-none
            resize-none
            font-mono text-sm
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-xs text-[var(--ember-orange)]">{error}</p>
      )}
    </div>
  );
}
