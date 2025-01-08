import * as React from 'react'
import type { FieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'

import clsx from 'clsx'
import { Label } from './label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string
  error?: FieldError | undefined
  requiredField?: boolean
  literalError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, literalError, ...props }, ref) => {
    return (
      <div className="relative w-full space-y-1">
        <Label className="flex flex-row gap-2" htmlFor={props?.title}>
          <div>
            <span> {props?.title}</span>
            {props.requiredField && (
              <span
                className="pl-[2px] text-red-400"
                title="Campo obrigatório"
                aria-label={props?.title}
              >
                *
              </span>
            )}
          </div>

          <span className="h-4 text-red-400 text-xs">
            {props?.error &&
              (literalError ? props.error.message : 'obrigatório')}
          </span>
        </Label>
        <input
          id={props?.title}
          type={type}
          className={cn(
            clsx(
              'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              { 'bg-red-200': props?.error, 'bg-background': !props?.error }
            ),
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
