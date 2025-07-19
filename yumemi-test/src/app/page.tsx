'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrefectureCheckbox from '@/components/prefecture/PrefectureCheckbox';
import { useState } from 'react';
const queryClient = new QueryClient();

export default function Home() {
    const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

    return (
        <QueryClientProvider client={queryClient}>
            <PrefectureCheckbox onChange={setSelectedPrefCodes} />
        </QueryClientProvider>
    );
}
