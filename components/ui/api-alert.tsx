"use client";

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { toast } from '@/hooks/use-toast';

interface ApiAlertsProps { 
    title: string;
    description: string;
    variant:"public"|"admin"
}

const textMap: Record<ApiAlertsProps['variant'], string> = {
    public: 'Public',
    admin: 'Admin',
}
const variantMap: Record<ApiAlertsProps['variant'], BadgeProps["variant"]> = {
    public: 'secondary',
    admin: 'destructive',
}

const ApiAlerts = ({ title, description, variant = "public" }: ApiAlertsProps) => {
    

    const onCopy = () => { 
        navigator.clipboard.writeText(description)
        toast({
            description: 'Api route copied to clipboard'
        })
    }

  return (
      <Alert>
          <Server className='h-4 w-4' />
          <AlertTitle className='flex items-center gap-x-2'>
              {title}
              <Badge variant={variantMap[variant]}>{ textMap[variant]}</Badge>
          </AlertTitle>
          <AlertDescription className='mt-4 flex items-center justify-between'>
              <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                  {description}
              </code>
              <Button variant="outline" size="icon" onClick={onCopy}>
                  <Copy className='h-4 w-4' />
              </Button>
          </AlertDescription>
    </Alert>
  )
}

export default ApiAlerts