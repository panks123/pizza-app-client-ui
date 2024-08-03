'use client';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tenant } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

const TenantSelect: React.FC<{tenants: {data: Tenant[]}}> = ({tenants}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');
    const handleTenantSelect = (value: string) => {
        console.log(value)
        router.push(`/?tenantId=${value}`)
    }
  return (
    <Select onValueChange={handleTenantSelect} defaultValue={tenantId || ''}>
        <SelectTrigger className="w-[180px] focus:ring-0">
            <SelectValue placeholder="Select Restaurant" />
        </SelectTrigger>
        <SelectContent>
            {
                tenants.data.map((tenant: Tenant) => {
                    return <SelectItem key={tenant.id} value={String(tenant.id)}>{tenant.name}</SelectItem>
                })
            }
        </SelectContent>
    </Select>
  )
}

export default TenantSelect;
