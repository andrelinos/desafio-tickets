import * as React from 'react'
import type { FieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'

import clsx from 'clsx'
import { Label } from './label'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string
  error?: FieldError | undefined
  requiredField?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
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
          {props?.error && (
            <span className="text-red-400 text-xs">obrigatório</span>
          )}
        </Label>
        <textarea
          className={cn(
            clsx(
              'flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              {
                'bg-red-200': props?.error,
                'bg-background': !props?.error,
              }
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
Textarea.displayName = 'Textarea'

export { Textarea }
